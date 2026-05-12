/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { UserRole, Appointment, AppointmentStatus, ServiceType } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, ClipboardList, Dog, Users, Stethoscope } from 'lucide-react';
import { ClinicalRecordForm } from './components/clinical/ClinicalRecordForm';
import { CalendarView } from './components/appointments/CalendarView';
import { AppointmentModal } from './components/appointments/AppointmentModal';
import { POSView } from './components/pos/POSView';
import { DashboardView } from './components/dashboard/DashboardView';
import { ReportsView } from './components/reports/ReportsView';
import { LobbyView } from './components/home/LobbyView';
import { LandingPage } from './components/landing/LandingPage';
import { ClientPortalView } from './components/client/ClientPortalView';
import { PetsView } from './components/pets/PetsView';
import { OwnersView } from './components/owners/OwnersView';
import { ClinicalRecordsListView } from './components/clinical/ClinicalRecordsListView';
import { SettingsView } from './components/clinical/SettingsView';
import { useRole } from './hooks/useRole';
import { Menu, X } from 'lucide-react';

// Mock Appointments
const mockAppointments: Appointment[] = [
  { 
    id: '1', 
    pet_id: 'p1', 
    pet_name: 'Bruno', 
    vet_id: 'v1', 
    vet_name: 'Dr. Alejandro', 
    date: '2026-05-12', 
    time: '09:00', 
    status: AppointmentStatus.COMPLETED, 
    service_type: ServiceType.CONSULTA, 
    reason: 'Vómito' 
  },
  { 
    id: '2', 
    pet_id: 'p2', 
    pet_name: 'Luna', 
    vet_id: 'v2', 
    vet_name: 'Dra. Elena', 
    date: '2026-05-12', 
    time: '11:30', 
    status: AppointmentStatus.IN_PROGRESS, 
    service_type: ServiceType.CIRUGIA, 
    reason: 'Esterilización' 
  },
  { 
    id: '3', 
    pet_id: 'p3', 
    pet_name: 'Milo', 
    vet_id: 'v1', 
    vet_name: 'Dr. Alejandro', 
    date: '2026-05-14', 
    time: '10:00', 
    status: AppointmentStatus.PENDING, 
    service_type: ServiceType.CONSULTA, 
    reason: 'Vacunas' 
  },
];

type AppView = 'landing' | 'lobby' | 'dashboard' | 'calendar' | 'clinical-record' | 'pets' | 'owners' | 'pos' | 'reports' | 'settings' | 'client-dashboard';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>(UserRole.ADMIN);
  const [view, setView] = useState<AppView>('landing');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const userName = "Dr. Alejandro Pérez";

  const { canAccessClinical, canAccessPOS } = useRole(currentRole);

  const handleStartConsultation = () => {
    if (canAccessClinical) setView('clinical-record');
    else alert('Acceso restringido: Solo Veterinarios y Admins.');
  };
  
  const handleAddAppointment = () => setIsModalOpen(true);
  const handleSearch = (q: string) => console.log('Buscando:', q);

  if (view === 'landing') {
    return <LandingPage onEnterPortal={() => setView('lobby')} />;
  }

  if (view === 'lobby') {
    return <LobbyView onSelectRole={(role) => {
      setCurrentRole(role);
      if (role === UserRole.CLIENT) {
        setView('client-dashboard');
      } else {
        setView('dashboard');
      }
    }} />;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden font-sans bg-slate-50 relative">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[90] lg:hidden"
          />
        )}
      </AnimatePresence>

      <div className={`
        fixed inset-y-0 left-0 z-[100] w-72 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar 
          userRole={currentRole} 
          userName={userName} 
          onNavigate={(newView) => {
            setView(newView as AppView);
            setIsSidebarOpen(false);
          }}
          activeView={view}
        />
      </div>
      
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar 
          currentRole={currentRole} 
          onSearch={handleSearch} 
          onOpenMenu={() => setIsSidebarOpen(true)}
          title="Medinery"
        />
        
        <main className="flex-1 overflow-y-auto no-scrollbar">
          <AnimatePresence mode="wait">
            {view === 'dashboard' && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-8 space-y-10"
              >
                {/* Dashboard logic */}
                <DashboardView />
              </motion.div>
            )}

            {view === 'calendar' && (
              <motion.div 
                key="calendar"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8 h-full"
              >
                <CalendarView 
                  appointments={mockAppointments} 
                  onAddAppointment={handleAddAppointment}
                  onSelectAppointment={(a) => console.log('Seleccionada:', a)}
                />
              </motion.div>
            )}

            {view === 'clinical-records' && (
              <motion.div 
                key="clinical-records"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8 h-full"
              >
                {!canAccessClinical ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <h2 className="text-2xl font-black text-slate-900">Acceso Restringido</h2>
                    <p className="text-slate-500 mt-2">Solo médicos autorizados pueden ver expedientes clínicos.</p>
                  </div>
                ) : (
                  <ClinicalRecordsListView onSelect={() => setView('clinical-record')} />
                )}
              </motion.div>
            )}

            {view === 'clinical-record' && (
              <motion.div 
                key="clinical-record"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-8"
              >
                <div className="mb-6">
                  <button onClick={() => setView('clinical-records')} className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline flex items-center gap-2">
                    ← Volver al listado
                  </button>
                </div>
                <ClinicalRecordForm 
                  petName="Bruno (Golden Retriever)"
                  petId="p1"
                  appointmentId="demo-app"
                  onBack={() => setView('clinical-records')}
                  onSuccess={() => setView('clinical-records')}
                />
              </motion.div>
            )}

            {view === 'pets' && (
              <motion.div 
                key="pets"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-8"
              >
                <PetsView />
              </motion.div>
            )}

            {view === 'owners' && (
              <motion.div 
                key="owners"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-8"
              >
                <OwnersView />
              </motion.div>
            )}

            {view === 'settings' && (
              <motion.div 
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-8"
              >
                <SettingsView />
              </motion.div>
            )}

            {view === 'pos' && (
              <motion.div 
                key="pos"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-8 h-full"
              >
                {!canAccessPOS ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <h2 className="text-2xl font-bold text-[#4A5D4E]">Solo el Rol Admin o Recepción puede acceder a Caja.</h2>
                  </div>
                ) : (
                  <POSView />
                )}
              </motion.div>
            )}

            {view === 'reports' && (
              <motion.div 
                key="reports"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-8 h-full"
              >
                {currentRole !== UserRole.ADMIN ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <h2 className="text-2xl font-bold text-[#4A5D4E]">Solo el Rol Administrador puede acceder a Reportes Financieros.</h2>
                  </div>
                ) : (
                  <ReportsView />
                )}
              </motion.div>
            )}

            {view === 'client-dashboard' && (
              <motion.div
                key="client-dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="h-full flex flex-col"
              >
                <ClientPortalView />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Global Role Switcher Floating (Demo Purpose) */}
      <div className="fixed bottom-8 right-8 z-[100] bg-white/80 backdrop-blur-md p-2 rounded-2xl border border-slate-200 shadow-2xl flex flex-col gap-2 scale-90 origin-bottom-right hover:scale-100 transition-transform">
        <div className="px-3 py-1 flex items-center justify-between border-b border-slate-100 mb-1">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Demo Sim</span>
          <div className="w-2 h-2 rounded-full bg-medinery-blue animate-pulse" />
        </div>
        <div className="bg-slate-100 p-1 rounded-xl flex gap-1">
          {(Object.keys(UserRole) as Array<keyof typeof UserRole>).map((role) => (
            <button
              key={role}
              onClick={() => {
                const newRole = UserRole[role];
                setCurrentRole(newRole);
                if (newRole === UserRole.CLIENT) setView('client-dashboard');
                else if (view === 'client-dashboard') setView('dashboard');
              }}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all ${
                currentRole === UserRole[role] 
                  ? 'bg-medinery-blue text-white shadow-md' 
                  : 'text-slate-500 hover:bg-white hover:text-medinery-blue'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      <AppointmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => {
          setIsModalOpen(false);
          alert('Cita agendada correctamente');
        }}
      />
    </div>
  );
}


