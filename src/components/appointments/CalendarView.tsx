/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  MapPin, 
  Circle 
} from 'lucide-react';
import { motion } from 'motion/react';
import { Appointment, AppointmentStatus, ServiceType } from '../../types';

interface CalendarViewProps {
  appointments: Appointment[];
  onAddAppointment: () => void;
  onSelectAppointment: (appointment: Appointment) => void;
}

const statusColors: Record<AppointmentStatus, string> = {
  [AppointmentStatus.PENDING]: 'bg-blue-50 border-blue-200 text-blue-700',
  [AppointmentStatus.IN_PROGRESS]: 'bg-amber-50 border-amber-200 text-amber-700',
  [AppointmentStatus.COMPLETED]: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  [AppointmentStatus.CANCELLED]: 'bg-rose-50 border-rose-200 text-rose-700',
};

const serviceIcons: Record<ServiceType, string> = {
  [ServiceType.CONSULTA]: '🩺',
  [ServiceType.CIRUGIA]: '✂️',
  [ServiceType.ESTETICA]: '🛁',
  [ServiceType.VACUNACION]: '💉',
};

export const CalendarView: React.FC<CalendarViewProps> = ({ 
  appointments, 
  onAddAppointment, 
  onSelectAppointment 
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Simulación de días del mes
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl shadow-sm border border-[#F0EFEA] overflow-hidden">
      {/* Calendar Header */}
      <div className="p-6 border-b border-[#F0EFEA] flex justify-between items-center bg-[#F9F9F7]">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-[#4A5D4E]">Mayo 2026</h2>
          <div className="flex bg-white border border-[#F0EFEA] rounded-lg overflow-hidden shadow-sm">
            <button className="p-2 hover:bg-[#F0EFEA] text-[#7F8C8D] transition-colors"><ChevronLeft size={18} /></button>
            <button className="p-2 hover:bg-[#F0EFEA] text-[#7F8C8D] border-l border-[#F0EFEA] transition-colors"><ChevronRight size={18} /></button>
          </div>
          <button className="text-xs font-bold text-[#4A5D4E] uppercase tracking-widest hover:underline">Hoy</button>
        </div>

        <button 
          onClick={onAddAppointment}
          className="bg-[#4A5D4E] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-[#5D6F61] transition-all shadow-md active:scale-95"
        >
          <Plus size={18} />
          Nueva Cita
        </button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 bg-[#F9F9F7] border-b border-[#F0EFEA]">
        {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(day => (
          <div key={day} className="py-3 text-center text-[10px] font-bold text-[#A8B5A2] uppercase tracking-widest leading-none">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Content */}
      <div className="flex-1 grid grid-cols-7 overflow-y-auto no-scrollbar">
        {/* Espacios vacíos para el inicio del mes (simulado) */}
        <div className="border-r border-b border-[#F0EFEA] p-2 bg-[#FCFCFA]/50 h-32 md:h-40" />
        <div className="border-r border-b border-[#F0EFEA] p-2 bg-[#FCFCFA]/50 h-32 md:h-40" />
        <div className="border-r border-b border-[#F0EFEA] p-2 bg-[#FCFCFA]/50 h-32 md:h-40" />
        <div className="border-r border-b border-[#F0EFEA] p-2 bg-[#FCFCFA]/50 h-32 md:h-40" />

        {days.map(day => {
          const isToday = day === 12;
          const dayAppointments = appointments.filter(a => new Date(a.date).getDate() === day);

          return (
            <div 
              key={day} 
              className={`border-r border-b border-[#F0EFEA] p-2 h-32 md:h-40 transition-colors hover:bg-[#F9F9F7] cursor-pointer group ${isToday ? 'bg-[#FBF5ED]/30' : ''}`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold ${isToday ? 'bg-[#4A5D4E] text-white' : 'text-[#7F8C8D]'}`}>
                  {day}
                </span>
                {dayAppointments.length > 0 && (
                  <span className="text-[10px] font-bold text-[#A8B5A2] uppercase">{dayAppointments.length} Citas</span>
                )}
              </div>

              <div className="space-y-1 overflow-y-hidden">
                {dayAppointments.map(appt => (
                  <motion.div
                    key={appt.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectAppointment(appt);
                    }}
                    className={`px-2 py-1.5 rounded-lg border text-[9px] font-medium leading-tight truncate shadow-sm transition-all ${statusColors[appt.status]}`}
                  >
                    <div className="flex items-center gap-1">
                      <span>{serviceIcons[appt.service_type]}</span>
                      <span className="font-bold uppercase tracking-tighter">{appt.time}</span>
                    </div>
                    <div className="truncate opacity-90">{appt.pet_name}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="p-4 bg-white border-t border-[#F0EFEA] flex gap-6 overflow-x-auto no-scrollbar">
        {Object.entries(AppointmentStatus).map(([key, status]) => (
          <div key={status} className="flex items-center gap-2 shrink-0">
            <Circle size={10} className={`${statusColors[status].split(' ')[0]} fill-current`} />
            <span className="text-[10px] font-bold text-[#7F8C8D] uppercase tracking-widest">{status.replace('_', ' ')}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
