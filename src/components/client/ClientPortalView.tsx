/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  Dog, 
  Calendar, 
  Clock, 
  CreditCard, 
  FileText, 
  Settings, 
  Bell,
  Search,
  Plus,
  Moon,
  Sun
} from 'lucide-react';

export const ClientPortalView: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-4 md:p-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic">Hola, <span className="text-medinery-blue">James</span></h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Portal de Propietario • 3 Mascotas Activas</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-medinery-blue text-white rounded-2xl text-sm font-black shadow-lg shadow-medinery-blue/20 hover:bg-medinery-dark transition-all">
            <Plus size={18} /> Agendar Nueva Cita
          </button>
        </div>
      </div>

      {/* Stats/Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={Calendar} 
          label="Próxima Cita" 
          value="Mañana, 10:00 AM" 
          subValue="Consulta General"
          color="blue"
        />
        <StatCard 
          icon={Heart} 
          label="Salud General" 
          value="95%" 
          subValue="Estado Óptimo"
          color="teal"
        />
        <StatCard 
          icon={CreditCard} 
          label="Saldo Pendiente" 
          value="$0.00" 
          subValue="Al corriente"
          color="dark"
        />
        <StatCard 
          icon={Bell} 
          label="Recordatorios" 
          value="2 Activos" 
          subValue="Vacunación pendiente"
          color="blue"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Pets Column */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900">Mis Mascotas</h2>
            <button className="text-[10px] font-black text-medinery-blue uppercase tracking-widest hover:underline">Gestionar todas</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PetCard 
              name="Luna"
              species="Perro"
              breed="Golden Retriever"
              age="3 años"
              status="Saludable"
              image="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=200"
            />
            <PetCard 
              name="Simba"
              species="Gato"
              breed="Persa"
              age="5 años"
              status="Medicamento"
              image="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=200"
            />
          </div>

          <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-black text-slate-900">Historial Reciente</h3>
              <div className="flex gap-2">
                <button className="p-2 bg-slate-50 text-slate-400 rounded-lg"><Search size={16} /></button>
                <button className="p-2 bg-slate-50 text-slate-400 rounded-lg"><FileText size={16} /></button>
              </div>
            </div>
            
            <div className="space-y-4">
              <HistoryItem 
                title="Vacunación Triple Felina"
                date="12 May 2024"
                pet="Simba"
                type="VACUNACIÓN"
              />
              <HistoryItem 
                title="Consulta General de Rutina"
                date="05 May 2024"
                pet="Luna"
                type="CONSULTA"
              />
              <HistoryItem 
                title="Desparasitación Interna"
                date="28 Abr 2024"
                pet="Luna"
                type="PREVENTIVO"
              />
            </div>
          </div>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-8">
          <div className="bg-medinery-dark rounded-[40px] p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-medinery-teal/20 rounded-full -mr-16 -mt-16" />
            <h3 className="text-xl font-black mb-4 italic">Medinery Tips</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 font-medium">
              "El ejercicio diario es fundamental para mantener el peso ideal de tu Golden Retriever. Agenda una sesión de hidromasaje hoy."
            </p>
            <button className="w-full py-4 bg-medinery-teal text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white hover:text-medinery-dark transition-all">
              Ver Catálogo
            </button>
          </div>

          <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-6">Mis Direcciones</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                  <Sun size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 leading-none mb-1">Hogar Principal</h4>
                  <p className="text-xs text-slate-500">Calle Amapolas #123, Col. Roma, CDMX</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                  <Moon size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 leading-none mb-1">Oficina / Trabajo</h4>
                  <p className="text-xs text-slate-500">Av. Paseo de la Reforma #800</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: any, label: string, value: string, subValue: string, color: 'blue' | 'teal' | 'dark' }> = ({ icon: Icon, label, value, subValue, color }) => {
  const themes = {
    blue: 'bg-medinery-blue/10 text-medinery-blue',
    teal: 'bg-medinery-teal/10 text-medinery-teal',
    dark: 'bg-medinery-dark/10 text-medinery-dark'
  };

  return (
    <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-xl ${themes[color]}`}><Icon size={18} /></div>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span>
      </div>
      <p className="text-xl font-black text-slate-900 leading-none mb-1 tracking-tight">{value}</p>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{subValue}</p>
    </div>
  );
};

const PetCard: React.FC<{ name: string, species: string, breed: string, age: string, status: string, image: string }> = ({ name, species, breed, age, status, image }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-5 group cursor-pointer"
    >
      <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-inner shrink-0">
        <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-lg font-black text-slate-900 truncate tracking-tight">{name}</h4>
          <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-full ${status === 'Saludable' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
            {status}
          </span>
        </div>
        <p className="text-xs font-bold text-slate-400 truncate uppercase tracking-widest">{breed} • {age}</p>
      </div>
    </motion.div>
  );
};

const HistoryItem: React.FC<{ title: string, date: string, pet: string, type: string }> = ({ title, date, pet, type }) => (
  <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-transparent hover:border-slate-100 transition-all cursor-pointer group">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-medinery-blue transition-colors">
        <FileText size={20} />
      </div>
      <div>
        <h4 className="text-sm font-bold text-slate-900">{title}</h4>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{pet} • {date}</p>
      </div>
    </div>
    <span className="text-[9px] font-black text-medinery-teal bg-medinery-teal/10 px-2 py-1 rounded-md uppercase tracking-widest">{type}</span>
  </div>
);
