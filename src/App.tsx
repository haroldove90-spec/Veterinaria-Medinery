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
import { useRole } from './hooks/useRole';

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

type AppView = 'dashboard' | 'calendar' | 'clinical-record' | 'pets' | 'owners';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>(UserRole.ADMIN);
  const [view, setView] = useState<AppView>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userName = "Dr. Alejandro Pérez";

  const { canAccessClinical, canAccessPOS } = useRole(currentRole);

  const handleStartConsultation = () => {
    if (canAccessClinical) setView('clinical-record');
    else alert('Acceso restringido: Solo Veterinarios y Admins.');
  };
  
  const handleAddAppointment = () => setIsModalOpen(true);
  const handleSearch = (q: string) => console.log('Buscando:', q);

  return (
    <div className="flex h-screen w-full overflow-hidden font-sans bg-[#FDFCF8]">
      <Sidebar 
        userRole={currentRole} 
        userName={userName} 
        onNavigate={(newView) => setView(newView as AppView)}
        activeView={view}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar currentRole={currentRole} onSearch={handleSearch} />
        
        <main className="flex-1 overflow-y-auto no-scrollbar">
          <AnimatePresence mode="wait">
            {view === 'dashboard' && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-8 space-y-8"
              >
                {/* Demo Control Header */}
                <div className="bg-white p-4 rounded-2xl border border-[#F0EFEA] flex justify-between items-center shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-[#4A5D4E] uppercase tracking-widest leading-none">Simulador de Rol</span>
                  </div>
                  <div className="bg-[#F9F9F7] p-1 rounded-lg border border-[#F0EFEA] flex gap-1">
                    {(Object.keys(UserRole) as Array<keyof typeof UserRole>).map((role) => (
                      <button
                        key={role}
                        onClick={() => setCurrentRole(UserRole[role])}
                        className={`px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all ${
                          currentRole === UserRole[role] 
                            ? 'bg-[#4A5D4E] text-white shadow-sm' 
                            : 'text-[#7F8C8D] hover:bg-white hover:text-[#4A5D4E]'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <DashboardCard title="Mascotas Totales" value="1,248" trend="+12% mes" color="bg-[#EAF2ED]" />
                  <DashboardCard title="Citas Hoy" value="24" trend="4 urgentes" color="bg-[#FBF5ED]" />
                  <DashboardCard title="Vets Activos" value="6" trend="Turno A" color="bg-[#F5F0F7]" />
                  <DashboardCard title="Ingresos" value="$4,250" trend="+5% vs ayer" color="bg-[#EAF5F7]" />
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-[#F0EFEA]">
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-xl font-bold text-[#4A5D4E] flex items-center gap-2">
                        <Calendar size={20} className="text-[#A8B5A2]" />
                        Estado de Operaciones
                      </h2>
                      <div className="flex gap-2">
                        <button onClick={() => setView('calendar')} className="px-4 py-2 text-[#4A5D4E] font-bold text-[10px] uppercase border border-[#F0EFEA] rounded-xl hover:bg-[#F9F9F7]">Ver Calendario</button>
                        <button onClick={handleAddAppointment} className="px-4 py-2 bg-[#4A5D4E] text-white font-bold text-[10px] uppercase rounded-xl hover:bg-[#5D6F61] shadow-md">Nueva Cita</button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {mockAppointments.filter(a => a.date === '2026-05-12').map(appt => (
                        <div key={appt.id} className="flex items-center justify-between p-4 bg-[#F9F9F7] rounded-2xl hover:shadow-md transition-all border border-transparent hover:border-[#F0EFEA]">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-[#F0EFEA]">
                              <Dog size={20} className="text-[#4A5D4E]" />
                            </div>
                            <div>
                              <h4 className="font-bold text-[#2D3436]">{appt.pet_name}</h4>
                              <p className="text-[10px] font-medium text-[#7F8C8D] uppercase tracking-wider">{appt.service_type} • {appt.time}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                              appt.status === AppointmentStatus.IN_PROGRESS ? 'bg-amber-100 text-amber-700' : 
                              appt.status === AppointmentStatus.PENDING ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                            }`}>
                              {appt.status}
                            </span>
                            {appt.status === AppointmentStatus.IN_PROGRESS && currentRole !== UserRole.RECEPTION && (
                              <button onClick={handleStartConsultation} className="p-2 bg-white text-[#4A5D4E] rounded-lg shadow-sm hover:text-[#E5BA73]"><Stethoscope size={16} /></button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#4A5D4E] rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors" />
                    <h3 className="text-2xl font-bold leading-tight">Métricas en<br/>Tiempo Real</h3>
                    <p className="text-white/60 text-xs mt-3 leading-relaxed">Conexión activa con Supabase. Los cambios son instantáneos para todo el equipo.</p>
                    <div className="mt-8 space-y-6">
                      <div className="flex justify-between items-end">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#A8B5A2]">Ratio de Éxito</span>
                        <span className="text-2xl font-bold">98.4%</span>
                      </div>
                      <div className="w-full bg-white/10 h-1 rounded-full">
                        <div className="bg-[#E5BA73] w-[98%] h-full rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
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

            {view === 'clinical-record' && (
              <motion.div 
                key="clinical"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-8"
              >
                <ClinicalRecordForm 
                  petName="Bruno (Golden Retriever)"
                  petId="p1"
                  appointmentId="demo-app"
                  onBack={() => setView('dashboard')}
                  onSuccess={() => setView('dashboard')}
                />
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
          </AnimatePresence>
        </main>
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

function DashboardCard({ title, value, trend, color }: { title: string, value: string, trend: string, color: string }) {
  return (
    <motion.div 
      whileHover={{ y: -4, shadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }}
      className={`p-6 rounded-3xl border border-[#F0EFEA] ${color} flex flex-col justify-center transition-all`}
    >
      <span className="text-[10px] font-bold uppercase tracking-widest text-[#5D6F61]">{title}</span>
      <span className="text-3xl font-bold mt-1 text-[#4A5D4E]">{value}</span>
      <span className="text-[10px] mt-2 opacity-70 font-semibold uppercase text-[#4A5D4E]">{trend}</span>
    </motion.div>
  );
}


