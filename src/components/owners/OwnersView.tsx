/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Plus, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { Owner } from '../../types';

const mockOwners: Owner[] = [
  { id: '1', full_name: 'Laura Martínez', email: 'laura.m@email.com', phone: '555-0123', address: 'Av. Reforma 123, CDMX' },
  { id: '2', full_name: 'Carlos Ruíz', email: 'c.ruiz@hotmail.com', phone: '555-4567', address: 'Calle Juárez 45, Polanco' },
  { id: '3', full_name: 'Ana Silva', email: 'ana_silva90@gmail.com', phone: '555-8901', address: 'Privada Olmos 8, Juriquilla' },
  { id: '4', full_name: 'Roberto Torres', email: 'robt@outlook.com', phone: '555-2345', address: 'Insurgentes Sur 900, Roma' },
  { id: '5', full_name: 'Elena Gómez', email: 'elena.gomez@gmail.com', phone: '555-6789', address: 'Paseo de la Loma 12, Satélite' },
];

export const OwnersView: React.FC = () => {
  const [search, setSearch] = useState('');
  
  const filtered = mockOwners.filter(o => 
    o.full_name.toLowerCase().includes(search.toLowerCase()) || 
    o.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Directorio de Clientes</h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Gestión de Propietarios</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-medinery-teal text-white rounded-2xl text-sm font-bold shadow-lg shadow-medinery-teal/10 hover:bg-medinery-teal/90 transition-all">
          <Plus size={18} /> Nuevo Cliente
        </button>
      </div>

      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-medinery-teal transition-colors" size={20} />
        <input 
          type="text"
          placeholder="Buscar por nombre, correo o teléfono..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 shadow-sm transition-all"
        />
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nombre Completo</th>
                <th className="py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contacto</th>
                <th className="py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Dirección</th>
                <th className="py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((owner) => (
                <tr key={owner.id} className="group hover:bg-slate-50/50 transition-all">
                  <td className="py-6 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-medinery-blue/10 text-medinery-blue flex items-center justify-center font-black">
                        {owner.full_name[0]}
                      </div>
                      <span className="text-sm font-black text-slate-900">{owner.full_name}</span>
                    </div>
                  </td>
                  <td className="py-6 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <Phone size={12} className="text-slate-300" /> {owner.phone}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <Mail size={12} className="text-slate-300" /> {owner.email}
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-6">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium max-w-[200px]">
                      <MapPin size={12} className="text-slate-300 shrink-0" /> 
                      <span className="truncate">{owner.address}</span>
                    </div>
                  </td>
                  <td className="py-6 px-6 text-right">
                    <button className="p-2 text-slate-300 hover:text-medinery-blue hover:bg-medinery-blue/5 rounded-lg transition-all">
                      <ExternalLink size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
