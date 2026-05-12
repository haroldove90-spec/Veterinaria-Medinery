/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Users, 
  Dog, 
  Calendar, 
  TrendingUp, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal,
  Plus
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { motion } from 'motion/react';
import { AppointmentStatus, ServiceType } from '../../types';

// --- Realistic Mock Data ---
const mockData = {
  stats: [
    { title: 'Pacientes Totales', value: '1,248', trend: '+12%', isUp: true, icon: Dog, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Citas Hoy', value: '24', trend: '4 urgentes', isUp: true, icon: Calendar, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'Ingresos Mes', value: '$12,450', trend: '+8.2%', isUp: true, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Stock Bajo', value: '3', trend: 'Acción requerida', isUp: false, icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-50' },
  ],
  appointmentFlow: [
    { name: 'Lun', appointments: 18 },
    { name: 'Mar', appointments: 25 },
    { name: 'Mié', appointments: 22 },
    { name: 'Jue', appointments: 30 },
    { name: 'Vie', appointments: 28 },
    { name: 'Sáb', appointments: 15 },
    { name: 'Dom', appointments: 8 },
  ],
  todayAppointments: [
    { id: '1', pet: 'Max', breed: 'Golden Retriever', owner: 'Laura Martínez', status: AppointmentStatus.IN_PROGRESS, time: '09:00', type: ServiceType.CONSULTA },
    { id: '2', pet: 'Luna', breed: 'Gato Siamés', owner: 'Carlos Ruíz', status: AppointmentStatus.PENDING, time: '10:30', type: ServiceType.VACUNACION },
    { id: '3', pet: 'Bruno', breed: 'Bulldog Francés', owner: 'Ana Silva', status: AppointmentStatus.COMPLETED, time: '11:45', type: ServiceType.ESTETICA },
    { id: '4', pet: 'Milo', breed: 'Pug', owner: 'Roberto Torres', status: AppointmentStatus.PENDING, time: '14:00', type: ServiceType.CONSULTA },
    { id: '5', pet: 'Kira', breed: 'Pastror Alemán', owner: 'Elena Gómez', status: AppointmentStatus.CANCELLED, time: '16:30', type: ServiceType.CIRUGIA },
  ],
  inventoryAlerts: [
    { name: 'Vacuna Triple Felina', stock: 2, unit: 'viales', status: 'critical' },
    { name: 'Alimento Renal 2kg', stock: 4, unit: 'bolsas', status: 'low' },
    { name: 'Antibiótico Amoxi', stock: 1, unit: 'frascos', status: 'critical' },
  ]
};

const statusConfig: Record<AppointmentStatus, { label: string, color: string }> = {
  [AppointmentStatus.PENDING]: { label: 'Esperando', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  [AppointmentStatus.IN_PROGRESS]: { label: 'En Consulta', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  [AppointmentStatus.COMPLETED]: { label: 'Completado', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  [AppointmentStatus.CANCELLED]: { label: 'Cancelado', color: 'bg-rose-100 text-rose-700 border-rose-200' },
};

export const DashboardView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Panel de Control</h1>
          <p className="text-slate-500 mt-1 font-medium">Bienvenido de nuevo, Dr. Alejandro Pérez.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
            Descargar Reporte
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
            <Plus size={18} />
            Nueva Cita
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockData.stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${stat.isUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trend}
              </div>
            </div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.title}</h3>
            <p className="text-3xl font-black text-slate-900 mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Flujo de Consultas</h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Semanas anteriores vs actual</p>
            </div>
            <select className="bg-slate-50 border-none text-xs font-bold text-slate-500 rounded-lg py-2 px-3 focus:ring-0">
              <option>Últimos 7 días</option>
              <option>Últimos 30 días</option>
            </select>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData.appointmentFlow}>
                <defs>
                  <linearGradient id="colorApp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                  itemStyle={{ fontWeight: 700, color: '#4f46e5' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="appointments" 
                  stroke="#4f46e5" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorApp)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Small Widgets */}
        <div className="space-y-8">
          {/* Inventory Alerts */}
          <div className="bg-slate-900 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700" />
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-rose-500/20 text-rose-400 rounded-xl">
                <AlertTriangle size={20} />
              </div>
              <h3 className="font-bold">Alertas de Inventario</h3>
            </div>
            <div className="space-y-4">
              {mockData.inventoryAlerts.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div>
                    <p className="text-sm font-bold">{item.name}</p>
                    <p className="text-[10px] text-white/50 uppercase tracking-widest">{item.stock} {item.unit} restantes</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${item.status === 'critical' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]' : 'bg-amber-500 opacity-60'}`} />
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 rounded-2xl bg-white text-slate-900 text-xs font-bold uppercase tracking-widest hover:bg-indigo-50 transition-colors">
              Gestionar Stock
            </button>
          </div>

          {/* Quick Info Card */}
          <div className="bg-indigo-600 rounded-[40px] p-8 text-white shadow-xl relative animate-pulse">
            <h3 className="text-xl font-bold leading-tight">Nueva Actualización</h3>
            <p className="text-indigo-100 text-xs mt-2 leading-relaxed opacity-80">El módulo de telemetría médica ya está activo. Revisa reportes avanzados en el menú.</p>
          </div>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Agenda para Hoy</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">12 de Mayo, 2026 • 24 Citas programadas</p>
          </div>
          <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
            <button className="px-4 py-2 text-[10px] font-bold uppercase bg-white text-indigo-600 rounded-lg shadow-sm">Lista</button>
            <button className="px-4 py-2 text-[10px] font-bold uppercase text-slate-400">Timeline</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-4">Hora</th>
                <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Paciente</th>
                <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Propietario</th>
                <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Servicio</th>
                <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right pr-4">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {mockData.todayAppointments.map((appt) => (
                <tr key={appt.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="py-5 pl-4">
                    <span className="text-sm font-black text-slate-900">{appt.time}</span>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-bold">
                        {appt.pet[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{appt.pet}</p>
                        <p className="text-[10px] text-slate-400 font-medium uppercase">{appt.breed}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <p className="text-sm text-slate-600 font-medium">{appt.owner}</p>
                  </td>
                  <td className="py-5">
                    <span className="text-[10px] font-bold text-slate-500 uppercase bg-slate-100 px-2 py-1 rounded-md">{appt.type}</span>
                  </td>
                  <td className="py-5 text-right pr-4">
                    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all ${statusConfig[appt.status].color}`}>
                      {statusConfig[appt.status].label}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-50 flex justify-center">
          <button className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 hover:underline">
            Cargar todas las citas del día
          </button>
        </div>
      </div>
    </div>
  );
};
