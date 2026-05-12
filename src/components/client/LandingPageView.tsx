/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  Calendar, 
  Clock, 
  MessageSquare, 
  ChevronRight, 
  Phone, 
  MapPin, 
  Info,
  Star,
  Dog,
  ExternalLink
} from 'lucide-react';

interface LandingPageViewProps {
  onLogout: () => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({ onLogout }) => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 pb-20">
      {/* Navigation Header */}
      <nav className="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-medinery-blue flex items-center justify-center">
            <Dog className="text-white" size={24} />
          </div>
          <span className="font-extrabold text-xl tracking-tighter text-medinery-dark">
            Medinery<span className="text-medinery-teal font-medium tracking-normal ml-0.5">App</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#pets" className="text-sm font-bold text-slate-500 hover:text-medinery-blue transition-colors">Mis Mascotas</a>
          <a href="#appointments" className="text-sm font-bold text-slate-500 hover:text-medinery-blue transition-colors">Citas</a>
          <a href="#contact" className="text-sm font-bold text-slate-500 hover:text-medinery-blue transition-colors">Contacto</a>
        </div>

        <button 
          onClick={onLogout}
          className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-sm font-bold transition-all"
        >
          Salir
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 pt-12 md:pt-24 pb-20 md:px-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-medinery-blue/5 -skew-x-12 translate-x-20 rounded-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-medinery-teal/10 text-medinery-teal rounded-full mb-6">
              <Star size={14} fill="currentColor" />
              <span className="text-[10px] font-black uppercase tracking-widest">Portal del Propietario</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-medinery-dark tracking-tighter leading-[0.9] mb-8">
              Tu mascota, <br />
              <span className="text-medinery-blue">siempre bien.</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium mb-10 max-w-lg leading-relaxed">
              Bienvenido de nuevo, <strong>Héctor</strong>. Aquí puedes monitorear la salud de tus compañeros y gestionar sus próximas visitas al veterinario.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-medinery-blue text-white rounded-2xl font-bold shadow-xl shadow-medinery-blue/20 hover:scale-105 active:scale-95 transition-all">
                Agendar Consulta
              </button>
              <button className="px-8 py-4 bg-white text-medinery-dark border-2 border-slate-100 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
                <MessageSquare size={18} /> Chatea con nosotros
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10"
          >
            <div className="aspect-square bg-slate-100 rounded-[60px] overflow-hidden shadow-2xl relative border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=1000" 
                alt="Golden Retriever client" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-white/50 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                    <Heart size={20} fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estado Actual</p>
                    <p className="text-sm font-bold text-slate-900">Toby está 100% saludable</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Stats Floating */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-medinery-teal p-6 rounded-full flex flex-col items-center justify-center text-white shadow-2xl rotate-12">
              <span className="text-4xl font-black">01</span>
              <span className="text-[10px] font-bold uppercase text-center leading-tight">Próxima Vacuna en 3 días</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Sections */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Pets Section */}
        <section id="pets" className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black text-medinery-dark tracking-tight">Mis Mascotas</h2>
            <button className="text-medinery-blue font-bold text-sm hover:underline">Ver todas</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PetCard 
              name="Toby" 
              species="Perro" 
              breed="Golden Retriever" 
              image="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=400"
              status="Saludable"
              lastCheck="12 May 2024"
            />
            <PetCard 
              name="Luna" 
              species="Gato" 
              breed="Persa" 
              image="https://images.unsplash.com/photo-1514888286872-c15117f427d5?auto=format&fit=crop&q=80&w=400"
              status="En tratamiento"
              lastCheck="05 May 2024"
            />
          </div>
        </section>

        {/* Action Sidebar */}
        <aside className="space-y-8">
          {/* Appointment Card */}
          <div id="appointments" className="bg-slate-900 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Calendar size={20} className="text-medinery-teal" />
              </div>
              <h3 className="text-xl font-bold">Próxima Cita</h3>
            </div>
            
            <div className="bg-white/5 rounded-3xl p-6 mb-8 border border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <Clock size={16} className="text-slate-400" />
                <span className="text-sm font-medium">Viernes, 15 de Mayo</span>
              </div>
              <p className="text-2xl font-black mb-1">10:30 AM</p>
              <p className="text-slate-400 text-sm">Consulta Preventiva - Toby</p>
            </div>

            <button className="w-full py-4 bg-medinery-teal text-white rounded-2xl font-bold hover:bg-medinery-teal/90 transition-all">
              Gestionar Cita
            </button>
          </div>

          {/* Quick Support */}
          <div className="bg-slate-50 rounded-[40px] p-8 border border-slate-100">
            <h3 className="text-xl font-bold text-medinery-dark mb-6">Ayuda Rápida</h3>
            <div className="space-y-4">
              <SupportLink icon={Phone} title="Llamar Urgencias" subtitle="Disponible 24/7" />
              <SupportLink icon={MapPin} title="Cómo llegar" subtitle="Ver en Google Maps" />
              <SupportLink icon={Info} title="Protocolos COVID-19" subtitle="Últimas actualizaciones" />
            </div>
          </div>
        </aside>
      </main>

      {/* Footer Info */}
      <footer id="contact" className="mt-32 pt-20 border-t border-slate-100 px-6 md:px-12 bg-slate-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-medinery-blue flex items-center justify-center">
                <Dog className="text-white" size={18} />
              </div>
              <span className="font-extrabold text-lg tracking-tighter text-medinery-dark">
                Medinery<span className="text-medinery-teal font-medium tracking-normal ml-0.5">App</span>
              </span>
            </div>
            <p className="text-slate-400 max-w-sm mb-8 leading-relaxed font-medium">
              Comprometidos con el bienestar de tus mascotas mediante tecnología avanzada y corazón humano.
            </p>
            <div className="flex gap-4">
              <SocialIcon />
              <SocialIcon />
              <SocialIcon />
            </div>
          </div>
          
          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-slate-900 mb-8">Horarios</h4>
            <ul className="space-y-4 text-slate-500 font-medium text-sm">
              <li className="flex justify-between"><span>Lun - Vie</span> <span>8:00 - 20:00</span></li>
              <li className="flex justify-between"><span>Sábados</span> <span>9:00 - 15:00</span></li>
              <li className="flex justify-between text-rose-500"><span>Urgencias</span> <span>24 Horas</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-slate-900 mb-8">Contacto</h4>
            <p className="text-slate-500 font-medium text-sm leading-relaxed">
              Calle Principal #123, <br />
              Roma Norte, CDMX. <br />
              <span className="text-medinery-blue mt-2 block font-bold">+52 55 1234 5678</span>
            </p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pb-10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-300">
          <span>© 2024 Veterinaria Medinery S.A. de C.V.</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Términos</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const PetCard: React.FC<{ name: string; species: string; breed: string; image: string; status: string; lastCheck: string }> = ({ 
  name, species, breed, image, status, lastCheck 
}) => (
  <motion.div 
    whileHover={{ y: -8 }}
    className="bg-white rounded-[40px] p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden"
  >
    <div className="flex items-center gap-6">
      <div className="w-24 h-24 rounded-3xl overflow-hidden shrink-0 border-4 border-slate-50 shadow-inner">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-xl font-black text-slate-900">{name}</h4>
          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
            status === 'Saludable' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
          }`}>
            {status}
          </span>
        </div>
        <p className="text-slate-400 text-sm font-medium">{species} • {breed}</p>
        <div className="mt-4 flex items-center gap-2 text-slate-300">
          <Info size={14} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Último chequeo: {lastCheck}</span>
        </div>
      </div>
    </div>
    <button className="w-full mt-6 py-3 bg-slate-50 rounded-2xl flex items-center justify-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest group-hover:bg-medinery-blue group-hover:text-white transition-all">
      Ver Historial <ChevronRight size={14} />
    </button>
  </motion.div>
);

const SupportLink: React.FC<{ icon: React.ElementType; title: string; subtitle: string }> = ({ icon: Icon, title, subtitle }) => (
  <button className="w-full flex items-center gap-4 p-4 rounded-3xl hover:bg-white transition-all group text-left border border-transparent hover:border-slate-100 hover:shadow-lg">
    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-slate-400 group-hover:text-medinery-blue transition-colors">
      <Icon size={20} />
    </div>
    <div>
      <p className="text-sm font-bold text-slate-900 group-hover:text-medinery-blue transition-colors">{title}</p>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{subtitle}</p>
    </div>
    <ExternalLink size={14} className="ml-auto text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
  </button>
);

const SocialIcon = () => (
  <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-medinery-blue hover:border-medinery-blue cursor-pointer transition-all">
    <div className="w-4 h-4 bg-current rounded-sm" />
  </div>
);
