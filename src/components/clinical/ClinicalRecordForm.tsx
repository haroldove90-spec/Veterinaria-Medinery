/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  ClipboardPlus, 
  Stethoscope, 
  Plus, 
  Trash2, 
  FileText, 
  Save, 
  ArrowLeft 
} from 'lucide-react';
import { motion } from 'motion/react';
import { PrescriptionItem } from '../../types';

const clinicalRecordSchema = z.object({
  reason: z.string().min(5, 'El motivo debe tener al menos 5 caracteres'),
  anamnesis: z.string().min(10, 'La anamnesis es obligatoria'),
  heart_rate: z.coerce.number().min(0, 'Valor inválido'),
  weight: z.coerce.number().min(0.1, 'Peso requerido'),
  temperature: z.coerce.number().min(0, 'Valor inválido'),
  diagnosis: z.string().min(5, 'Diagnóstico presuntivo es obligatorio'),
  treatment_plan: z.string().min(5, 'El plan de tratamiento es obligatorio'),
  prescription: z.array(z.object({
    medication: z.string().min(2, 'Nombre de medicamento requerido'),
    dose: z.string().min(1, 'Dosis requerida'),
    frequency: z.string().min(1, 'Frecuencia requerida'),
    duration: z.string().min(1, 'Duración requerida'),
  }))
});

type ClinicalRecordFormData = z.infer<typeof clinicalRecordSchema>;

interface ClinicalRecordFormProps {
  petName: string;
  petId: string;
  appointmentId: string;
  onBack: () => void;
  onSuccess: () => void;
}

export const ClinicalRecordForm: React.FC<ClinicalRecordFormProps> = ({ 
  petName, 
  onBack,
  onSuccess 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ClinicalRecordFormData>({
    resolver: zodResolver(clinicalRecordSchema),
    defaultValues: {
      prescription: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "prescription"
  });

  const onSubmit = async (data: ClinicalRecordFormData) => {
    setIsSubmitting(true);
    try {
      console.log('Guardando expediente en Supabase...', data);
      
      // Simulación de guardado en Supabase
      // 1. Insertar en clinical_records
      // 2. Actualizar appointments status a "completed"
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert('¡Expediente guardado con éxito!');
      onSuccess();
    } catch (error) {
      console.error('Error al guardar:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGeneratePDF = () => {
    alert('Generando Receta Médica en PDF...');
    // Lógica para exportar a PDF (ej. jspdf or calling a print function)
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-[#7F8C8D] hover:text-[#4A5D4E] transition-colors mb-6 font-medium text-sm"
      >
        <ArrowLeft size={16} />
        Volver al Dashboard
      </button>

      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#4A5D4E] tracking-tight">Registro de Consulta</h2>
          <p className="text-[#A8B5A2] font-medium uppercase text-xs tracking-widest mt-1">
            Paciente: <span className="text-[#4A5D4E]">{petName}</span> • Historia Clínica Digital
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleGeneratePDF}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#F0EFEA] bg-white text-[#4A5D4E] font-bold text-sm hover:bg-[#F9F9F7] transition-all"
          >
            <FileText size={18} />
            Prevista de Receta
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Sección: Información Clínica */}
        <section className="bg-white rounded-3xl p-8 shadow-sm border border-[#F0EFEA]">
          <h3 className="text-lg font-bold text-[#4A5D4E] mb-6 flex items-center gap-2 underline decoration-[#A8B5A2] decoration-2 underline-offset-4">
            <ClipboardPlus size={20} />
            Evaluación Clínica
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-full space-y-2">
              <label className="text-xs font-bold text-[#7F8C8D] uppercase tracking-wider">Motivo de consulta</label>
              <textarea 
                {...register('reason')}
                className="w-full bg-[#F9F9F7] border-[#F0EFEA] rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#4A5D4E] focus:outline-none min-h-[80px]"
                placeholder="Ej. Vómitos recurrentes y letargo..."
              />
              {errors.reason && <p className="text-rose-500 text-xs font-medium">{errors.reason.message}</p>}
            </div>

            <div className="col-span-full space-y-2">
              <label className="text-xs font-bold text-[#7F8C8D] uppercase tracking-wider">Anamnesis</label>
              <textarea 
                {...register('anamnesis')}
                className="w-full bg-[#F9F9F7] border-[#F0EFEA] rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#4A5D4E] focus:outline-none min-h-[120px]"
                placeholder="Antecedentes, cambios de dieta, otros síntomas..."
              />
              {errors.anamnesis && <p className="text-rose-500 text-xs font-medium">{errors.anamnesis.message}</p>}
            </div>
          </div>
        </section>

        {/* Sección: Examen Físico */}
        <section className="bg-white rounded-3xl p-8 shadow-sm border border-[#F0EFEA]">
          <h3 className="text-lg font-bold text-[#4A5D4E] mb-6 flex items-center gap-2 underline decoration-[#A8B5A2] decoration-2 underline-offset-4">
            <Stethoscope size={20} />
            Constantes Fisiológicas
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#7F8C8D] uppercase tracking-wider">Frec. Cardíaca (lpm)</label>
              <input 
                type="number"
                {...register('heart_rate')}
                className="w-full bg-[#FBF5ED] border-[#F0E6D8] rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#9C763A] focus:outline-none"
              />
              {errors.heart_rate && <p className="text-rose-500 text-xs font-medium">{errors.heart_rate.message}</p>}
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#7F8C8D] uppercase tracking-wider">Peso (kg)</label>
              <input 
                type="number"
                step="0.1"
                {...register('weight')}
                className="w-full bg-[#EAF5F7] border-[#D5E9ED] rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#3A7E8F] focus:outline-none"
              />
              {errors.weight && <p className="text-rose-500 text-xs font-medium">{errors.weight.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#7F8C8D] uppercase tracking-wider">Temperatura (°C)</label>
              <input 
                type="number"
                step="0.1"
                {...register('temperature')}
                className="w-full bg-[#F5F0F7] border-[#E9DFED] rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#7E5D8F] focus:outline-none"
              />
              {errors.temperature && <p className="text-rose-500 text-xs font-medium">{errors.temperature.message}</p>}
            </div>
          </div>
        </section>

        {/* Sección: Diagnóstico y Plan */}
        <section className="bg-white rounded-3xl p-8 shadow-sm border border-[#F0EFEA]">
          <h3 className="text-lg font-bold text-[#4A5D4E] mb-6 flex items-center gap-2 underline decoration-[#A8B5A2] decoration-2 underline-offset-4">
            <ClipboardPlus size={20} />
            Diagnóstico & Tratamiento
          </h3>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#7F8C8D] uppercase tracking-wider">Diagnóstico Presuntivo</label>
              <textarea 
                {...register('diagnosis')}
                className="w-full bg-[#F9F9F7] border-[#F0EFEA] rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#4A5D4E] focus:outline-none min-h-[80px]"
              />
              {errors.diagnosis && <p className="text-rose-500 text-xs font-medium">{errors.diagnosis.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#7F8C8D] uppercase tracking-wider">Plan de Tratamiento</label>
              <textarea 
                {...register('treatment_plan')}
                className="w-full bg-[#F9F9F7] border-[#F0EFEA] rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#4A5D4E] focus:outline-none min-h-[100px]"
                placeholder="Pasos a seguir, exámenes complementarios..."
              />
              {errors.treatment_plan && <p className="text-rose-500 text-xs font-medium">{errors.treatment_plan.message}</p>}
            </div>
          </div>
        </section>

        {/* Sección: Receta Médica */}
        <section className="bg-white rounded-3xl p-8 shadow-sm border border-[#F0EFEA]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-[#4A5D4E] flex items-center gap-2 underline decoration-[#A8B5A2] decoration-2 underline-offset-4">
              <FileText size={20} />
              Receta Médica
            </h3>
            <button
              type="button"
              onClick={() => append({ medication: '', dose: '', frequency: '', duration: '' })}
              className="px-4 py-2 bg-[#4A5D4E] text-white rounded-xl text-xs font-bold tracking-widest uppercase flex items-center gap-2 hover:bg-[#5D6F61] transition-colors"
            >
              <Plus size={16} />
              Agregar Medicamento
            </button>
          </div>
          
          <div className="space-y-4">
            {fields.map((field, index) => (
              <motion.div 
                key={field.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 bg-[#F9F9F7] rounded-2xl relative border border-[#F0EFEA]"
              >
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#7F8C8D] uppercase">Medicamento</label>
                  <input 
                    {...register(`prescription.${index}.medication`)}
                    className="w-full bg-white border-[#F0EFEA] rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#4A5D4E]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#7F8C8D] uppercase">Dosis</label>
                  <input 
                    {...register(`prescription.${index}.dose`)}
                    className="w-full bg-white border-[#F0EFEA] rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#4A5D4E]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#7F8C8D] uppercase">Frecuencia</label>
                  <input 
                    {...register(`prescription.${index}.frequency`)}
                    className="w-full bg-white border-[#F0EFEA] rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#4A5D4E]"
                  />
                </div>
                <div className="flex gap-2 items-end">
                  <div className="flex-1 space-y-1">
                    <label className="text-[10px] font-bold text-[#7F8C8D] uppercase">Duración</label>
                    <input 
                      {...register(`prescription.${index}.duration`)}
                      className="w-full bg-white border-[#F0EFEA] rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#4A5D4E]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-2 text-rose-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
            
            {fields.length === 0 && (
              <div className="py-10 text-center border-2 border-dashed border-[#F0EFEA] rounded-2xl">
                <p className="text-[#7F8C8D] text-sm">No se han agregado medicamentos a la receta.</p>
              </div>
            )}
          </div>
        </section>

        {/* Botones de acción */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-8 py-3 rounded-2xl text-[#4A5D4E] font-bold uppercase tracking-widest text-xs hover:bg-[#F9F9F7] transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-[#4A5D4E] text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-[#5D6F61] transition-all shadow-lg flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save size={18} />
            )}
            Guardar Expediente
          </button>
        </div>
      </form>
    </div>
  );
};
