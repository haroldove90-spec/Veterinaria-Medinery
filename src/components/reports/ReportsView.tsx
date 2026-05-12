/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { 
  Download, 
  FileText, 
  TrendingUp, 
  Calendar as CalendarIcon, 
  Filter,
  CreditCard,
  Banknote,
  Smartphone,
  ChevronRight
} from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { motion } from 'motion/react';
import { DailyReportPDF } from './DailyReportPDF';

// Mock Data for the Demo
const reportData = {
  date: '12 de Mayo, 2026',
  stats: {
    sales: 15400,
    consultations: 12,
    surgeries: 3,
    pharmacy: 5,
    tax: 2124,
    total: 15400,
    items: [
      { service: 'Consulta General Médica', quantity: 12, price: 550, total: 6600 },
      { service: 'Cirugía: Esterilización', quantity: 2, price: 2800, total: 5600 },
      { service: 'Cirugía: Dental', quantity: 1, price: 1200, total: 1200 },
      { service: 'Farmacia / Medicamentos', quantity: 5, price: 400, total: 2000 },
    ]
  },
  paymentMethods: [
    { name: 'Efectivo', value: 4500, color: '#4A5D4E' },
    { name: 'Tarjeta', value: 8900, color: '#E5BA73' },
    { name: 'Transferencia', value: 2000, color: '#A8B5A2' },
  ]
};

const history = [
  { date: '11 Mayo 2026', id: 'REP-110', total: '$12,300', status: 'Completado' },
  { date: '10 Mayo 2026', id: 'REP-109', total: '$14,800', status: 'Completado' },
  { date: '09 Mayo 2026', id: 'REP-108', total: '$9,200', status: 'Cerrado' },
];

export const ReportsView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Reportes de Gerencia</h1>
          <p className="text-slate-500 mt-1 font-medium italic">Análisis financiero y cierres de caja operativos.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50">
            <Filter size={14} /> Filtros
          </button>
          
          <PDFDownloadLink 
            document={<DailyReportPDF date={reportData.date} data={reportData.stats} />} 
            fileName={`Cierre_Caja_${reportData.date.replace(/ /g, '_')}.pdf`}
            className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-all shadow-lg"
          >
            {({ loading }) => (
              <>
                <Download size={18} />
                {loading ? 'Generando...' : 'Descargar Cierre'}
              </>
            )}
          </PDFDownloadLink>
        </div>
      </div>

      {/* Main Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><TrendingUp size={20} /></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Ingresos</span>
          </div>
          <p className="text-3xl font-black text-slate-900">$15,400.00</p>
          <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-emerald-600">
            <TrendingUp size={12} /> +14.5% hoy
          </div>
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl"><CreditCard size={20} /></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Impuestos</span>
          </div>
          <p className="text-3xl font-black text-slate-900">$2,124.00</p>
          <p className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">IVA 16% Aplicado</p>
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><FileText size={20} /></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Servicios</span>
          </div>
          <p className="text-3xl font-black text-slate-900">20</p>
          <p className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Atenciones de hoy</p>
        </div>

        <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-xl flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Estado de Caja</span>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-xl font-bold">ACTIVA</span>
          </div>
          <button className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors text-left mt-4 border-t border-white/10 pt-4">Solicitar Auditoría</button>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Methods Chart */}
        <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-8">Métodos de Pago</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reportData.paymentMethods} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#4A5D4E', fontSize: 12, fontWeight: 700 }}
                  width={100}
                />
                <RechartsTooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={24}>
                  {reportData.paymentMethods.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-3">
            {reportData.paymentMethods.map(pm => (
              <div key={pm.name} className="flex justify-between items-center text-xs font-bold uppercase">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-md" style={{ backgroundColor: pm.color }} />
                  <span className="text-slate-500">{pm.name}</span>
                </div>
                <span className="text-slate-900">${pm.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reports History */}
        <div className="lg:col-span-2 bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900">Historial de Reportes</h3>
            <button className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 hover:underline">Ver Todo</button>
          </div>
          <div className="space-y-4">
            {history.map((rep, idx) => (
              <motion.div 
                key={rep.id} 
                whileHover={{ x: 4 }}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-100 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">{rep.date}</h5>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{rep.id} • {rep.status}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-sm font-black text-slate-900">{rep.total}</span>
                  <div className="p-2 rounded-lg bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <Download size={16} className="text-indigo-600" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 p-6 bg-slate-900 rounded-3xl text-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-2xl"><CalendarIcon size={24} /></div>
              <div>
                <p className="text-sm font-bold">Generador Automático</p>
                <p className="text-[10px] text-white/50 uppercase font-black">Próximo cierre: Hoy 22:00 PM</p>
              </div>
            </div>
            <ChevronRight className="text-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
};
