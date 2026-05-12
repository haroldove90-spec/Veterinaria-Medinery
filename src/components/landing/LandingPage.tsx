/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  Shield, 
  Clock, 
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  Twitter,
  ChevronRight,
  Star,
  Users,
  Calendar,
  ArrowRight,
  Dog,
  Gamepad2,
  Stethoscope
} from 'lucide-react';

interface LandingPageProps {
  onEnterPortal: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterPortal }) => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-medinery-blue selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 h-20 flex items-center justify-between px-8 md:px-16">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-medinery-blue flex items-center justify-center text-white shadow-lg shadow-medinery-blue/20">
            <Dog size={24} />
          </div>
          <span className="font-extrabold text-2xl tracking-tighter italic">Medinery<span className="text-medinery-teal">Vet</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-sm font-bold text-slate-600 hover:text-medinery-blue transition-colors">Servicios</a>
          <a href="#about" className="text-sm font-bold text-slate-600 hover:text-medinery-blue transition-colors">Nosotros</a>
          <a href="#contact" className="text-sm font-bold text-slate-600 hover:text-medinery-blue transition-colors">Contacto</a>
          <button 
            onClick={onEnterPortal}
            className="px-6 py-2.5 bg-medinery-dark text-white rounded-full text-sm font-bold hover:bg-medinery-blue transition-all shadow-lg shadow-medinery-dark/10"
          >
            Portal de Clientes
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-8 lg:px-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-medinery-blue/5 to-transparent -z-10" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-medinery-blue/10 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-medinery-blue animate-pulse" />
              <span className="text-xs font-black text-medinery-blue uppercase tracking-widest">Atención 24/7 disponible</span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-8">
              Tu mascota, <br />
              Nuestra <span className="text-medinery-blue">Pasión.</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-lg mb-10">
              Ofrecemos servicios de alta gama para el cuidado de tus compañeros más leales. Tecnología avanzada y un equipo humano excepcional.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={onEnterPortal}
                className="px-8 py-4 bg-medinery-blue text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-medinery-dark transition-all flex items-center gap-3 shadow-xl shadow-medinery-blue/20"
              >
                Agendar Cita <ArrowRight size={18} />
              </button>
              <button className="px-8 py-4 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:border-medinery-blue hover:text-medinery-blue transition-all">
                Conoce al equipo
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-slate-100 rounded-[60px] overflow-hidden shadow-2xl relative">
              <img 
                src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=1000" 
                alt="Happy Dog"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-medinery-dark/40 to-transparent" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-medinery-teal flex items-center justify-center text-white">
                  <Heart size={24} fill="currentColor" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 leading-none mb-1">+5,000 Pacientes</h4>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Confianza total</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-8 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-12 md:gap-24">
          <div className="text-center">
            <h3 className="text-5xl font-black text-medinery-blue mb-2">15+</h3>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Años Experiencia</span>
          </div>
          <div className="text-center">
            <h3 className="text-5xl font-black text-medinery-teal mb-2">24h</h3>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Emergencias</span>
          </div>
          <div className="text-center">
            <h3 className="text-5xl font-black text-medinery-dark mb-2">10</h3>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Especialidades</span>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs font-black text-medinery-blue uppercase tracking-[0.4em] mb-4 block">Nuestros Servicios</span>
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Cuidado integral de alto nivel</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              icon={Stethoscope}
              title="Consulta Médica"
              description="Evaluación exhaustiva por especialistas en medicina interna y preventiva."
              color="blue"
            />
            <ServiceCard 
              icon={Shield}
              title="Cirugía Progresiva"
              description="Quirófanos equipados con la última tecnología en monitoreo y soporte vital."
              color="teal"
            />
            <ServiceCard 
              icon={Heart}
              title="Bienestar y SPA"
              description="Estética canina avanzada y terapias de relajación para tus mascotas."
              color="dark"
            />
          </div>
        </div>
      </section>

      {/* Portal CTA */}
      <section className="py-32 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-medinery-dark rounded-[60px] p-12 lg:p-24 relative overflow-hidden flex flex-col items-center text-center">
            <div className="absolute top-0 right-0 w-96 h-96 bg-medinery-teal/20 rounded-full blur-3xl -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-medinery-blue/20 rounded-full blur-3xl -ml-48 -mb-48" />
            
            <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tighter mb-8 z-10">
              ¿Eres parte de la <br /> familia Medinery?
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mb-12 z-10 leading-relaxed italic">
              "Accede a tu portal privado para ver el historial clínico de tus mascotas, agendar citas y comprar suministros."
            </p>
            <button 
              onClick={onEnterPortal}
              className="z-10 group px-12 py-5 bg-white text-medinery-dark rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-medinery-teal hover:text-white transition-all flex items-center gap-4"
            >
              Entrar al Portal <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-50 pt-24 pb-12 px-8 lg:px-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-medinery-blue flex items-center justify-center text-white">
                  <Dog size={20} />
                </div>
                <span className="font-extrabold text-xl tracking-tighter italic">Medinery<span className="text-medinery-teal">Vet</span></span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Comprometidos con la excelencia veterinaria y el amor incondicional a los animales.
              </p>
              <div className="flex gap-4">
                <SocialIcon icon={Facebook} />
                <SocialIcon icon={Instagram} />
                <SocialIcon icon={Twitter} />
              </div>
            </div>
            
            <div>
              <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-8">Especialidades</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                <li className="hover:text-medinery-blue cursor-pointer">Cardiología</li>
                <li className="hover:text-medinery-blue cursor-pointer">Oftalmología</li>
                <li className="hover:text-medinery-blue cursor-pointer">Dermatología</li>
                <li className="hover:text-medinery-blue cursor-pointer">Neurología</li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-8">Contacto</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                <li className="flex items-center gap-3"><MapPin size={16} /> Roma Norte, Ciudad de México</li>
                <li className="flex items-center gap-3"><Phone size={16} /> +52 (55) 1234 5678</li>
                <li className="flex items-center gap-3"><Clock size={16} /> Emergencias 24 Horas</li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-8">Boletín</h4>
              <p className="text-xs text-slate-500 mb-4">Recibe consejos de salud para tus mascotas.</p>
              <div className="flex bg-white rounded-xl border border-slate-200 p-1">
                <input type="text" placeholder="Email" className="bg-transparent flex-1 px-3 text-xs outline-none" />
                <button className="bg-medinery-blue text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase">Unirse</button>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">© 2024 Medinery Veterinary System. Todos los derechos reservados.</span>
            <div className="flex gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <a href="#" className="hover:text-slate-900">Privacidad</a>
              <a href="#" className="hover:text-slate-900">Términos</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const ServiceCard: React.FC<{ icon: any, title: string, description: string, color: 'blue' | 'teal' | 'dark' }> = ({ icon: Icon, title, description, color }) => {
  const colors = {
    blue: 'bg-medinery-blue/10 text-medinery-blue',
    teal: 'bg-medinery-teal/10 text-medinery-teal',
    dark: 'bg-medinery-dark/10 text-medinery-dark'
  };

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="p-10 rounded-[40px] border border-slate-100 bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all group"
    >
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${colors[color]}`}>
        <Icon size={32} />
      </div>
      <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{title}</h3>
      <p className="text-slate-500 font-medium leading-relaxed mb-8">{description}</p>
      <button className="text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-medinery-blue transition-colors flex items-center gap-2">
        Leer más <ChevronRight size={14} />
      </button>
    </motion.div>
  );
};

const SocialIcon: React.FC<{ icon: any }> = ({ icon: Icon }) => (
  <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-medinery-blue hover:text-white hover:border-medinery-blue transition-all cursor-pointer">
    <Icon size={18} />
  </div>
);
