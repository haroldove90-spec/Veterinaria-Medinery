/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Plus, Filter, History, ChevronRight, Stethoscope, FileText } from 'lucide-react';
import { motion } from 'motion/react';

const mockRecords = [
  { id: '1', pet: 'Max', owner: 'Laura Martínez', date: '2026-05-10', diagnosis: 'Dermatitis atópica estacional', status: 'En tratamiento' },
  { id: '2', pet: 'Luna', owner: 'Carlos Ruíz', date: '2026-05-08', diagnosis: 'Control de vacunas anual', status: 'Completado' },
  { id: '3', pet: 'Bruno', breed: 'Bulldog Francés', date: '2026-05-05', diagnosis: 'Profilaxis dental programada', status: 'Agendado' },
  { id: '4', pet: 'Milo', breed: 'Pug', date: '2026-05-01', diagnosis: 'Gastroenteritis bacteriana leve', status: 'Alta médica' },
];

export const ClinicalRecordsListView: React.FC<{ onSelect: () => void }> = ({ onSelect }) => {
  const [search, setSearch] = useState('');
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Expedientes Médicos</h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Historial Clínico Digital</p>
        </div>
        <button 
          onClick={onSelect}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all"
        >
          <Plus size={18} /> Iniciar Consulta
        </button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-medinery-blue transition-colors" size={20} />
          <input 
            type="text"
            placeholder="Buscar por paciente o propietario..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 shadow-sm transition-all"
          />
        </div>
        <button className="hidden md:flex flex-col items-center justify-center px-4 bg-white border border-slate-100 rounded-2xl text-slate-400 font-black text-[10px] uppercase shadow-sm">
          <History size={18} className="mb-1" /> Recientes
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mockRecords.map((record) => (
          <motion.div 
            key={record.id}
            whileHover={{ x: 6 }}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group cursor-pointer hover:bg-slate-50/50 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-medinery-blue/10 text-medinery-blue flex items-center justify-center shadow-inner">
                <FileText size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-black text-slate-900">{record.pet}</h4>
                  <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-slate-100 text-slate-500 rounded-md">ID-{record.id}</span>
                </div>
                <p className="text-xs text-slate-500 font-bold mt-1 lowercase first-letter:uppercase tracking-tight">Diagnóstico: {record.diagnosis}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{record.date}</span>
                  <span className="text-[10px] text-emerald-600 font-black uppercase tracking-widest flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {record.status}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end mr-4">
                <span className="text-[10px] font-black text-slate-300 uppercase">Consultorio</span>
                <span className="text-xs font-black text-slate-600">Nivel 2 - B4</span>
              </div>
              <ChevronRight className="text-slate-200 group-hover:text-medinery-blue transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
