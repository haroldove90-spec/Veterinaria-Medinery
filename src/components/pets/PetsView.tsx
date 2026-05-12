/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, PawPrint, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { Pet } from '../../types';

const mockPets: Pet[] = [
  { id: '1', name: 'Max', breed: 'Golden Retriever', species: 'Perro', age: 5, weight: 32, owner_id: '1', photo_url: '' },
  { id: '2', name: 'Luna', breed: 'Siamés', species: 'Gato', age: 2, weight: 4.5, owner_id: '2', photo_url: '' },
  { id: '3', name: 'Bruno', breed: 'Bulldog Francés', species: 'Perro', age: 3, weight: 12, owner_id: '3', photo_url: '' },
  { id: '4', name: 'Milo', breed: 'Pug', species: 'Perro', age: 1, weight: 7.2, owner_id: '4', photo_url: '' },
  { id: '5', name: 'Kira', breed: 'Pastor Alemán', species: 'Perro', age: 4, weight: 28, owner_id: '5', photo_url: '' },
  { id: '6', name: 'Simba', breed: 'Persa', species: 'Gato', age: 6, weight: 5.1, owner_id: '1', photo_url: '' },
];

export const PetsView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [pets, setPets] = useState<Pet[]>(mockPets);
  
  const filtered = pets.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.breed.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddPet = () => {
    setIsAdding(true);
    setTimeout(() => {
      const newPet: Pet = {
        id: Math.random().toString(36).substr(2, 9),
        name: 'Mascota Demo',
        breed: 'Raza Mixta',
        species: Math.random() > 0.5 ? 'Perro' : 'Gato',
        age: 1,
        weight: 10,
        owner_id: '1',
        photo_url: ''
      };
      setPets([newPet, ...pets]);
      setIsAdding(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Gestión de Mascotas</h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Directorio Centralizado</p>
        </div>
        <button 
          onClick={handleAddPet}
          disabled={isAdding}
          className="flex items-center gap-2 px-6 py-3 bg-medinery-blue text-white rounded-2xl text-sm font-bold shadow-lg shadow-medinery-blue/10 hover:bg-medinery-dark transition-all disabled:opacity-50"
        >
          {isAdding ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Plus size={18} />
          )}
          {isAdding ? 'Registrando...' : 'Registrar Mascota'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-medinery-blue transition-colors" size={20} />
          <input 
            type="text"
            placeholder="Buscar por nombre, raza o especie..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 shadow-sm transition-all"
          />
        </div>
        <button className="px-6 py-4 bg-white border border-slate-100 rounded-2xl text-slate-400 flex items-center gap-2 text-sm font-bold hover:bg-slate-50 transition-all shadow-sm">
          <Filter size={18} /> Filtros
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((pet) => (
          <motion.div 
            key={pet.id}
            whileHover={{ y: -8 }}
            className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 ${pet.species === 'Gato' ? 'bg-amber-50' : 'bg-medinery-blue/5'} rounded-full -mr-12 -mt-12 opacity-50 transition-transform group-hover:scale-150`} />
            
            <div className="flex justify-between items-start mb-6">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black ${
                pet.species === 'Gato' ? 'bg-amber-100 text-amber-600' : 'bg-medinery-blue/10 text-medinery-blue'
              }`}>
                {pet.name[0]}
              </div>
              <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors"><MoreVertical size={20} /></button>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-slate-900">{pet.name}</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{pet.breed} • {pet.age} años</p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-50 pt-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Peso</span>
                <span className="text-sm font-black text-slate-700">{pet.weight} kg</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase">
                <Heart size={10} /> Salud Estable
              </div>
            </div>
            
            <button className="w-full mt-6 py-3 bg-slate-50 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest group-hover:bg-medinery-blue group-hover:text-white transition-all">
              Ver Expediente
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
