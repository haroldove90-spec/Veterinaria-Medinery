/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { UserRole } from './types';
import { motion } from 'motion/react';
import { Calendar, ClipboardList } from 'lucide-react';
import { ClinicalRecordForm } from './components/clinical/ClinicalRecordForm';

export default function App() {
  // Estado local para simular cambio de roles en el demo
  const [currentRole, setCurrentRole] = useState<UserRole>(UserRole.ADMIN);
  const [view, setView] = useState<'dashboard' | 'clinical-record'>('dashboard');
  const userName = "Dr. Alejandro Pérez";

  const handleStartConsultation = () => {
    setView('clinical-record');
  };

  return (
    <div className="flex h-screen w-full overflow-hidden font-sans bg-[#FDFCF8]">
      <Sidebar userRole={currentRole} userName={userName} />
      
      <main className="flex-1 overflow-y-auto flex flex-col">
        {view === 'dashboard' ? (
          <>
            <header className="h-16 bg-white border-b border-[#F0EFEA] flex items-center justify-between px-8 shrink-0">
              <div>
                <h1 className="text-lg font-bold text-[#4A5D4E]">Dashboard Administrativo</h1>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-4 text-sm text-[#7F8C8D]">
                  <span>Estado: <span className="text-green-600 font-bold">Producción</span></span>
                </div>

                {/* Selector de Rol para Demo */}
                <div className="bg-[#F9F9F7] p-1 rounded-lg border border-[#F0EFEA] flex gap-1">
                  {(Object.keys(UserRole) as Array<keyof typeof UserRole>).map((role) => (
                    <button
                      key={role}
                      onClick={() => setCurrentRole(UserRole[role])}
                      className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${
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
            </header>

            <div className="p-8 space-y-8">
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <DashboardCard 
                  title="Mascotas Totales" 
                  value="1,248" 
                  trend="+12% este mes" 
                  bgColor="bg-[#EAF2ED]" 
                  borderColor="border-[#D5E1DA]"
                  labelColor="text-[#5D6F61]"
                  valueColor="text-[#4A5D4E]"
                />
                <DashboardCard 
                  title="Citas Hoy" 
                  value="24" 
                  trend="4 urgentes" 
                  bgColor="bg-[#FBF5ED]" 
                  borderColor="border-[#F0E6D8]"
                  labelColor="text-[#9C763A]"
                  valueColor="text-[#7D5A21]"
                />
                <DashboardCard 
                  title="Veterinarios" 
                  value="6" 
                  trend="3 en descanso" 
                  bgColor="bg-[#F5F0F7]" 
                  borderColor="border-[#E9DFED]"
                  labelColor="text-[#7E5D8F]"
                  valueColor="text-[#5E3D6F]"
                />
                <DashboardCard 
                  title="Docs Pendientes" 
                  value="3" 
                  trend="Requieren firma" 
                  bgColor="bg-[#EAF5F7]" 
                  borderColor="border-[#D5E9ED]"
                  labelColor="text-[#3A7E8F]"
                  valueColor="text-[#215E6F]"
                />
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-[#F0EFEA]">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-[#4A5D4E] flex items-center gap-2">
                      <Calendar size={20} className="text-[#A8B5A2]" />
                      Próximas Citas
                    </h2>
                    {currentRole !== UserRole.RECEPTION && (
                      <button 
                        onClick={handleStartConsultation}
                        className="px-4 py-2 bg-[#4A5D4E] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#5D6F61] transition-all shadow-md"
                      >
                        Iniciar Consulta
                      </button>
                    )}
                  </div>
                  <div className="bg-[#F9F9F7] rounded-xl p-8 text-center border border-dashed border-[#C5D1C7]">
                    <p className="text-[#7F8C8D] italic text-sm">
                      Módulo de gestión de citas activo. Seleccione "Iniciar Consulta" para probar el nuevo formulario.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#F0EFEA]">
                  <h2 className="text-xl font-bold text-[#4A5D4E] mb-6 flex items-center gap-2">
                    <ClipboardList size={20} className="text-[#A8B5A2]" />
                    Resumen de Hoy
                  </h2>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex gap-4 items-center p-3 hover:bg-[#F9F9F7] rounded-xl transition-colors cursor-pointer border border-transparent hover:border-[#F0EFEA]">
                        <div className="w-10 h-10 rounded-full bg-[#F5F5F0] flex items-center justify-center text-[#4A5D4E] font-bold">
                          {i}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[#2D3436]">Paciente #{i * 123}</h4>
                          <p className="text-xs text-[#7F8C8D]">Consulta General • 10:30 AM</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="p-8">
            <ClinicalRecordForm 
              petName="Bruno (Golden Retriever)"
              petId="pet-123"
              appointmentId="app-456"
              onBack={() => setView('dashboard')}
              onSuccess={() => setView('dashboard')}
            />
          </div>
        )}
      </main>
    </div>
  );
}

function DashboardCard({ 
  title, 
  value, 
  trend, 
  bgColor, 
  borderColor, 
  labelColor, 
  valueColor 
}: { 
  title: string, 
  value: string, 
  trend: string, 
  bgColor: string,
  borderColor: string,
  labelColor: string,
  valueColor: string
}) {
  return (
    <motion.div 
      whileHover={{ y: -4, shadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }}
      className={`p-5 rounded-2xl border ${bgColor} ${borderColor} flex flex-col justify-center transition-all`}
    >
      <span className={`text-[10px] font-bold uppercase tracking-widest ${labelColor}`}>{title}</span>
      <span className={`text-2xl font-bold mt-1 ${valueColor}`}>{value}</span>
      <span className="text-[10px] mt-2 opacity-70 font-medium uppercase">{trend}</span>
    </motion.div>
  );
}

