/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, Stethoscope, Calendar, ArrowRight, Dog } from 'lucide-react';
import { motion } from 'motion/react';
import { UserRole } from '../../types';

interface LobbyViewProps {
  onSelectRole: (role: UserRole) => void;
}

export const LobbyView: React.FC<LobbyViewProps> = ({ onSelectRole }) => {
  return (
    <div className="min-h-screen bg-[#FDFCF8] flex flex-col items-center justify-center p-6 sm:p-12 overflow-hidden relative">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-60" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center z-10 mb-16"
      >
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-white border border-slate-200 rounded-full mb-6 shadow-sm">
          <Dog className="text-indigo-600" size={18} />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Bienvenido al Centro Medinery</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter">
          Veterinaria <span className="text-indigo-600">Medinery</span>
        </h1>
        <p className="text-slate-500 mt-4 text-lg font-medium max-w-lg mx-auto">
          Seleccione su perfil de acceso para comenzar la demostración interactiva del sistema.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl z-10">
        {/* Admin Card */}
        <RoleCard 
          title="ADMINISTRACIÓN"
          description="Control financiero, ingresos, inventarios y reportes estratégicos para gerencia."
          icon={Shield}
          color="indigo"
          onClick={() => onSelectRole(UserRole.ADMIN)}
          delay={0.1}
        />

        {/* Vet Card */}
        <RoleCard 
          title="MÉDICO VETERINARIO"
          description="Expedientes clínicos, consultas, hospitalización y diagnósticos especializados."
          icon={Stethoscope}
          color="emerald"
          onClick={() => onSelectRole(UserRole.VETERINARIAN)}
          delay={0.2}
        />

        {/* Reception Card */}
        <RoleCard 
          title="RECEPCIÓN Y CITAS"
          description="Agenda inteligente, registro de clientes, caja rápida y seguimiento de pacientes."
          icon={Calendar}
          color="sky"
          onClick={() => onSelectRole(UserRole.RECEPTION)}
          delay={0.3}
        />
      </div>

      {/* Clinic Status Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-16 w-full max-w-4xl z-10"
      >
        <div className="bg-white/50 backdrop-blur-md rounded-3xl p-6 border border-slate-200 flex flex-wrap items-center justify-center gap-8 md:gap-16 shadow-xl shadow-slate-200/50">
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Citas Agendadas</span>
            <span className="text-2xl font-black text-slate-900">15</span>
          </div>
          <div className="w-px h-10 bg-slate-200 hidden md:block" />
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Cirugías en Curso</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-emerald-600">02</span>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>
          <div className="w-px h-10 bg-slate-200 hidden md:block" />
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Personal Activo</span>
            <span className="text-2xl font-black text-slate-900">08</span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3"
      >
        <div className="w-8 h-px bg-slate-200" />
        Sistema de Gestión Integral • v2.4
        <div className="w-8 h-px bg-slate-200" />
      </motion.div>
    </div>
  );
};

interface RoleCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  color: 'indigo' | 'emerald' | 'sky';
  onClick: () => void;
  delay: number;
}

const RoleCard: React.FC<RoleCardProps> = ({ title, description, icon: Icon, color, onClick, delay }) => {
  const themes = {
    indigo: {
      bg: 'bg-white',
      border: 'hover:border-indigo-600',
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      accent: 'bg-indigo-600',
      shadow: 'hover:shadow-indigo-100',
    },
    emerald: {
      bg: 'bg-white',
      border: 'hover:border-emerald-600',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      accent: 'bg-emerald-600',
      shadow: 'hover:shadow-emerald-100',
    },
    sky: {
      bg: 'bg-white',
      border: 'hover:border-sky-600',
      iconBg: 'bg-sky-50',
      iconColor: 'text-sky-600',
      accent: 'bg-sky-600',
      shadow: 'hover:shadow-sky-100',
    },
  };

  const theme = themes[color];

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02, y: -8 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${theme.bg} p-8 rounded-[40px] border-2 border-slate-100 ${theme.border} text-left flex flex-col h-full shadow-sm hover:shadow-2xl ${theme.shadow} transition-all duration-300 group relative overflow-hidden`}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 ${theme.iconBg} rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500 opacity-50`} />
      
      <div className={`w-16 h-16 ${theme.iconBg} ${theme.iconColor} rounded-2xl flex items-center justify-center mb-8 relative`}>
        <Icon size={32} />
      </div>

      <h3 className="text-2xl font-black text-slate-900 mb-4 pr-12 line-clamp-1 tracking-tight">{title}</h3>
      <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-1">
        {description}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <span className={`text-xs font-black uppercase tracking-widest ${theme.iconColor}`}>Explorar Módulo</span>
        <div className={`w-10 h-10 ${theme.accent} text-white rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300`}>
          <ArrowRight size={18} />
        </div>
      </div>
    </motion.button>
  );
};
