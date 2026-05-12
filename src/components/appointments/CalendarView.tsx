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
    <div className="flex flex-col h-full bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
      {/* Calendar Header */}
      <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center bg-slate-50/50 gap-4">
        <div className="flex items-center gap-3 md:gap-4 w-full sm:w-auto justify-between sm:justify-start">
          <h2 className="text-lg md:text-xl font-extrabold text-medinery-dark tracking-tight">Mayo 2026</h2>
          <div className="flex items-center gap-2">
            <div className="flex bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <button className="p-2 hover:bg-slate-50 text-slate-500 transition-colors"><ChevronLeft size={18} /></button>
              <button className="p-2 hover:bg-slate-50 text-slate-500 border-l border-slate-200 transition-colors"><ChevronRight size={18} /></button>
            </div>
            <button className="text-[10px] font-black text-medinery-blue uppercase tracking-widest hover:underline px-2">Hoy</button>
          </div>
        </div>

        <button 
          onClick={onAddAppointment}
          className="w-full sm:w-auto bg-medinery-blue text-white px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-medinery-dark transition-all shadow-lg shadow-medinery-blue/20 active:scale-95"
        >
          <Plus size={18} />
          <span className="sm:inline">Nueva Cita</span>
        </button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 bg-slate-50/30 border-b border-slate-100">
        {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(day => (
          <div key={day} className="py-3 text-center text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Content */}
      <div className="flex-1 grid grid-cols-7 overflow-y-auto no-scrollbar bg-slate-50/10">
        {/* Espacios vacíos para el inicio del mes (simulado) */}
        {[...Array(4)].map((_, i) => (
          <div key={`empty-${i}`} className="border-r border-b border-slate-100 p-1 md:p-2 bg-slate-50/20 h-24 md:h-40" />
        ))}

        {days.map(day => {
          const isToday = day === 12;
          const dayAppointments = appointments.filter(a => new Date(a.date).getDate() === day);

          return (
            <div 
              key={day} 
              className={`border-r border-b border-slate-100 p-1 md:p-2 h-24 md:h-40 transition-colors hover:bg-white cursor-pointer group relative ${isToday ? 'bg-medinery-blue/5' : 'bg-white'}`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-lg text-xs font-black ${isToday ? 'bg-medinery-blue text-white shadow-md shadow-medinery-blue/20' : 'text-slate-400 group-hover:text-medinery-dark'}`}>
                  {day}
                </span>
                {dayAppointments.length > 0 && (
                  <span className="hidden md:block text-[9px] font-black text-slate-300 uppercase">{dayAppointments.length} Citas</span>
                )}
              </div>

              <div className="space-y-1 overflow-hidden">
                {dayAppointments.map(appt => (
                  <motion.div
                    key={appt.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectAppointment(appt);
                    }}
                    className={`px-1.5 py-1 rounded-lg border text-[8px] md:text-[9px] font-bold leading-tight truncate shadow-sm transition-all ${statusColors[appt.status]}`}
                  >
                    <div className="flex items-center gap-1">
                      <span className="hidden sm:inline">{serviceIcons[appt.service_type]}</span>
                      <span className="uppercase tracking-tighter">{appt.time}</span>
                    </div>
                    <div className="hidden md:block truncate opacity-80">{appt.pet_name}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="p-4 bg-white border-t border-slate-100 flex gap-4 md:gap-6 overflow-x-auto no-scrollbar">
        {Object.entries(AppointmentStatus).map(([key, status]) => (
          <div key={status} className="flex items-center gap-2 shrink-0">
            <div className={`w-2 h-2 rounded-full ${statusColors[status].split(' ')[0]} border border-current opacity-60`} />
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{status.replace('_', ' ')}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
