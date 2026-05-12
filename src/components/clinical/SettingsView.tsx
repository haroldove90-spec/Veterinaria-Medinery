/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Settings, Users, Building, Bell, Shield, Palette, Database } from 'lucide-react';
import { motion } from 'motion/react';

export const SettingsView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Configuración del Sistema</h1>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">Personaliza Veterinaria Medinery</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Settings */}
        <section className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><Building size={24} /></div>
            <h2 className="text-xl font-black text-slate-900 italic">Clínica</h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Nombre Comercial</label>
              <input type="text" defaultValue="Veterinaria Medinery" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-sm focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all font-bold" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Dirección Matriz</label>
              <input type="text" defaultValue="Col. Roma Norte, CDMX" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-sm focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all font-bold" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Moneda del Sistema</label>
              <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-sm focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all font-bold">
                <option>MXN - Peso Mexicano</option>
                <option>USD - Dólar Estadounidense</option>
              </select>
            </div>
          </div>
        </section>

        {/* Team Management Preview */}
        <section className="bg-slate-900 rounded-[40px] p-8 text-white shadow-2xl space-y-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-white/10 text-white rounded-2xl"><Users size={24} /></div>
            <h2 className="text-xl font-black">Equipo</h2>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Dr. Alejandro Pérez', role: 'Admin', color: 'bg-emerald-500' },
              { name: 'Dra. Sofía Luna', role: 'Veterinario', color: 'bg-indigo-500' },
              { name: 'Miguel Torres', role: 'Recepción', color: 'bg-amber-500' },
            ].map((member, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${member.color} flex items-center justify-center font-black text-[10px]`}>{member.name[0]}</div>
                  <div>
                    <p className="text-sm font-bold">{member.name}</p>
                    <p className="text-[10px] text-white/50 uppercase tracking-widest">{member.role}</p>
                  </div>
                </div>
                <Settings size={14} className="text-white/30" />
              </div>
            ))}
            <button className="w-full py-3 rounded-2xl bg-white text-slate-900 text-xs font-black uppercase tracking-widest hover:bg-indigo-50 transition-all mt-4">
              Invitar Miembro
            </button>
          </div>
        </section>

        {/* UI & Aesthetics */}
        <section className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-900 mb-2">
              <Palette size={20} className="text-indigo-600" />
              <h3 className="font-black text-lg">Apariencia</h3>
            </div>
            <div className="flex gap-2">
              <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-white ring-2 ring-slate-900 cursor-pointer" />
              <div className="w-10 h-10 rounded-full bg-indigo-600 border-2 border-white cursor-pointer opacity-40" />
              <div className="w-10 h-10 rounded-full bg-emerald-600 border-2 border-white cursor-pointer opacity-40" />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Tema del sistema (Dark/Light)</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-900 mb-2">
              <Bell size={20} className="text-indigo-600" />
              <h3 className="font-black text-lg">Notificaciones</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">Whatsapp Recordatorios</span>
                <div className="w-8 h-4 bg-emerald-500 rounded-full relative"><div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full" /></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">Stock Bajo Alertas</span>
                <div className="w-8 h-4 bg-emerald-500 rounded-full relative"><div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full" /></div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-900 mb-2">
              <Database size={20} className="text-indigo-600" />
              <h3 className="font-black text-lg">Seguridad</h3>
            </div>
            <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
              <Shield size={16} className="text-emerald-600" />
              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Base de Datos Protegida</span>
            </div>
            <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Ver Audit Log</button>
          </div>
        </section>
      </div>

      <div className="flex justify-center pb-12">
        <button className="px-12 py-4 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-black transition-all">
          Guardar Cambios Globales
        </button>
      </div>
    </div>
  );
};
