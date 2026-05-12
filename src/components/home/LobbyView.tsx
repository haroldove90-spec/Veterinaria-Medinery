/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, Stethoscope, Calendar, ArrowRight, Dog, User } from 'lucide-react';
import { motion } from 'motion/react';
import { UserRole } from '../../types';

interface LobbyViewProps {
  onSelectRole: (role: UserRole) => void;
}

export const LobbyView: React.FC<LobbyViewProps> = ({ onSelectRole }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 sm:p-12 overflow-hidden relative font-sans">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-medinery-blue/5 to-transparent" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-medinery-blue/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-medinery-teal/10 rounded-full blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center z-10 mb-16"
      >
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-white border border-slate-100 rounded-full mb-6 shadow-sm">
          <Dog className="text-medinery-blue" size={18} />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Bienvenido al Centro Medinery</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-medinery-dark tracking-tighter leading-none mb-6">
          Veterinaria <span className="text-medinery-blue">Medinery</span>
        </h1>
        <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
          The best platform for managing your veterinary clinic and providing the best care for patients.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl z-10">
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

        {/* Client Card */}
        <RoleCard 
          title="ÁREA DE CLIENTES"
          description="Consulte el estado de sus mascotas, reciba recordatorios y agende nuevas visitas online."
          icon={User}
          color="rose"
          onClick={() => onSelectRole(UserRole.CLIENT)}
          delay={0.4}
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
  color: 'indigo' | 'emerald' | 'sky' | 'rose';
  onClick: () => void;
  delay: number;
}

const RoleCard: React.FC<RoleCardProps> = ({ title, description, icon: Icon, color, onClick, delay }) => {
  const themes = {
    indigo: {
      bg: 'bg-white',
      border: 'hover:border-medinery-blue',
      iconBg: 'bg-medinery-blue/10',
      iconColor: 'text-medinery-blue',
      accent: 'bg-medinery-blue',
      shadow: 'hover:shadow-medinery-blue/10',
    },
    emerald: {
      bg: 'bg-white',
      border: 'hover:border-medinery-teal',
      iconBg: 'bg-medinery-teal/10',
      iconColor: 'text-medinery-teal',
      accent: 'bg-medinery-teal',
      shadow: 'hover:shadow-medinery-teal/10',
    },
    sky: {
      bg: 'bg-white',
      border: 'hover:border-medinery-dark',
      iconBg: 'bg-medinery-dark/10',
      iconColor: 'text-medinery-dark',
      accent: 'bg-medinery-dark',
      shadow: 'hover:shadow-medinery-dark/10',
    },
    rose: {
      bg: 'bg-white',
      border: 'hover:border-rose-500',
      iconBg: 'bg-rose-50',
      iconColor: 'text-rose-500',
      accent: 'bg-rose-600',
      shadow: 'hover:shadow-rose-100',
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
