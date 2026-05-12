/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Dog, 
  Stethoscope, 
  Search, 
  PlusCircle, 
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ServiceType, AppointmentStatus } from '../../types';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess 
}) => {
  const [step, setStep] = useState(1);
  const [selectedOwner, setSelectedOwner] = useState<any>(null);
  const [selectedPet, setSelectedPet] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data para el demo
  const owners = [
    { id: '1', name: 'Laura Martínez', phone: '555-0102', pets: [{ id: 'p1', name: 'Bruno', breed: 'Golden' }] },
    { id: '2', name: 'Carlos Ruíz', phone: '555-0304', pets: [{ id: 'p2', name: 'Luna', breed: 'Husky' }, { id: 'p3', name: 'Milo', breed: 'Pug' }] },
  ];

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulación de guardado en Supabase
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    onSuccess();
    setStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#4A5D4E]/40 backdrop-blur-sm"
        />

        {/* Modal content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#FDFCF8] rounded-[32px] shadow-2xl border border-[#F0EFEA] overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-8 border-b border-[#F0EFEA] flex justify-between items-center bg-white shrink-0">
            <div>
              <h2 className="text-2xl font-bold text-[#4A5D4E]">Agendar Nueva Cita</h2>
              <div className="flex gap-2 mt-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`h-1 rounded-full transition-all ${step >= i ? 'bg-[#4A5D4E] w-8' : 'bg-[#F0EFEA] w-4'}`} />
                ))}
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-[#F9F9F7] rounded-full transition-colors">
              <X size={24} className="text-[#7F8C8D]" />
            </button>
          </div>

          <form onSubmit={handleCreate} className="flex-1 overflow-y-auto no-scrollbar p-8">
            {/* Step 1: Client & Pet */}
            {step === 1 && (
              <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-xs font-bold text-[#A8B5A2] uppercase tracking-[0.2em]">Buscar Propietario</label>
                    <button type="button" className="text-xs font-bold text-[#9C763A] uppercase hover:underline flex items-center gap-1">
                      <PlusCircle size={14} /> Registrar Nuevo
                    </button>
                  </div>
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A8B5A2] group-focus-within:text-[#4A5D4E]" size={18} />
                    <input 
                      type="text" 
                      placeholder="Nombre o teléfono..."
                      className="w-full bg-white border border-[#F0EFEA] rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A5D4E]/10 focus:border-[#4A5D4E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {owners.map(owner => (
                    <div 
                      key={owner.id}
                      onClick={() => setSelectedOwner(owner)}
                      className={`p-4 rounded-3xl border-2 transition-all cursor-pointer ${selectedOwner?.id === owner.id ? 'border-[#4A5D4E] bg-white shadow-lg shadow-[#4A5D4E]/5' : 'border-[#F0EFEA] bg-white/50 hover:border-[#A8B5A2]'}`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="w-10 h-10 rounded-full bg-[#EAF2ED] flex items-center justify-center text-[#4A5D4E] font-bold">
                          <User size={18} />
                        </div>
                        {selectedOwner?.id === owner.id && <CheckCircle2 size={18} className="text-green-500" />}
                      </div>
                      <h4 className="font-bold text-[#2D3436] mt-3">{owner.name}</h4>
                      <p className="text-xs text-[#7F8C8D] mt-1">{owner.phone}</p>
                    </div>
                  ))}
                </div>

                {selectedOwner && (
                  <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="space-y-4 pt-4 border-t border-[#F0EFEA]">
                    <label className="text-xs font-bold text-[#A8B5A2] uppercase tracking-[0.1em]">Seleccionar Mascota</label>
                    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                      {selectedOwner.pets.map((pet: any) => (
                        <div 
                          key={pet.id}
                          onClick={() => setSelectedPet(pet)}
                          className={`shrink-0 px-6 py-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3 ${selectedPet?.id === pet.id ? 'border-[#4A5D4E] bg-white shadow-md' : 'border-[#F0EFEA] bg-white/30 hover:border-[#A8B5A2]'}`}
                        >
                          <Dog size={18} className={selectedPet?.id === pet.id ? 'text-[#4A5D4E]' : 'text-[#7F8C8D]'} />
                          <div className="text-left">
                            <div className="text-sm font-bold text-[#2D3436] leading-none">{pet.name}</div>
                            <div className="text-[10px] text-[#7F8C8D] mt-1">{pet.breed}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Step 2: Date & Service */}
            {step === 2 && (
              <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#A8B5A2] uppercase tracking-widest">Fecha</label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-3 text-[#A8B5A2]" size={16} />
                      <input type="date" className="w-full bg-white border border-[#F0EFEA] rounded-xl py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#4A5D4E]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#A8B5A2] uppercase tracking-widest">Hora</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 text-[#A8B5A2]" size={16} />
                      <input type="time" className="w-full bg-white border border-[#F0EFEA] rounded-xl py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#4A5D4E]" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-[#A8B5A2] uppercase tracking-widest">Tipo de Servicio</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {Object.entries(ServiceType).map(([key, value]) => (
                      <button 
                        key={value}
                        type="button"
                        className="px-3 py-4 rounded-2xl border border-[#F0EFEA] bg-white text-center hover:border-[#4A5D4E] hover:text-[#4A5D4E] transition-all group"
                      >
                        <div className="text-xl mb-1 group-hover:scale-110 transition-transform">
                          {value === ServiceType.CONSULTA ? '🩺' : value === ServiceType.CIRUGIA ? '✂️' : value === ServiceType.ESTETICA ? '🛁' : '💉'}
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-tighter">{key}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#A8B5A2] uppercase tracking-widest">Médico Veterinario</label>
                  <select className="w-full bg-white border border-[#F0EFEA] rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#4A5D4E] appearance-none">
                    <option>Dr. Alejandro Pérez</option>
                    <option>Dra. Elena Gómez</option>
                    <option>Dr. Roberto Torres</option>
                  </select>
                </div>
              </motion.div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-8 py-4">
                <div className="bg-[#EAF2ED] p-8 rounded-[40px] text-center border border-[#D5E1DA]">
                  <div className="w-20 h-20 rounded-full bg-white mx-auto flex items-center justify-center mb-6 shadow-sm">
                    <Stethoscope size={40} className="text-[#4A5D4E]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#4A5D4E]">Confirmar Cita</h3>
                  <p className="text-sm text-[#5D6F61] mt-2 italic font-medium">Revisa los detalles antes de agendar</p>
                </div>

                <div className="space-y-4 px-4 font-medium">
                  <div className="flex justify-between items-center py-3 border-b border-[#F0EFEA]">
                    <span className="text-xs text-[#7F8C8D] uppercase tracking-widest">Paciente</span>
                    <span className="text-[#4A5D4E]">{selectedPet?.name || 'No seleccionado'}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-[#F0EFEA]">
                    <span className="text-xs text-[#7F8C8D] uppercase tracking-widest">Propietario</span>
                    <span className="text-[#4A5D4E]">{selectedOwner?.name || 'No seleccionado'}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-[#F0EFEA]">
                    <span className="text-xs text-[#7F8C8D] uppercase tracking-widest">Servicio</span>
                    <span className="text-[#4A5D4E] font-bold uppercase tracking-wider text-xs">Consulta General</span>
                  </div>
                </div>
              </motion.div>
            )}
          </form>

          {/* Footer actions */}
          <div className="p-8 border-t border-[#F0EFEA] bg-white flex justify-between gap-4 shrink-0">
            <button 
              type="button" 
              onClick={() => step === 1 ? onClose() : setStep(s => s - 1)}
              className="px-8 py-3 rounded-2xl text-[#7F8C8D] font-bold uppercase tracking-widest text-xs hover:bg-[#F9F9F7] transition-colors"
            >
              {step === 1 ? 'Cancelar' : 'Atrás'}
            </button>
            <button 
              type="button"
              onClick={() => step === 3 ? handleCreate({ preventDefault: () => {} } as any) : setStep(s => s + 1)}
              disabled={(step === 1 && !selectedPet) || isSubmitting}
              className="px-10 py-4 bg-[#4A5D4E] text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-[#5D6F61] transition-all shadow-xl shadow-[#4A5D4E]/20 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                 <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                step === 3 ? 'Finalizar Reserva' : 'Siguiente Paso'
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
