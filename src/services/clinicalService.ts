/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// import { createClient } from '@supabase/supabase-js';
import { ClinicalRecord } from '../types';

/**
 * Este servicio simula la interacción con Supabase.
 * Para una implementación real, se debe configurar el cliente de Supabase
 * con las variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.
 */

/*
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
*/

export const saveClinicalRecord = async (
  recordData: Partial<ClinicalRecord>,
  appointmentId: string
) => {
  console.log('Iniciando proceso de guardado...', { recordData, appointmentId });

  // 1. Insertar el registro clínico
  // const { data, error } = await supabase
  //   .from('clinical_records')
  //   .insert([recordData])
  //   .select();

  // 2. Actualizar el estado de la cita
  // if (!error) {
  //   await supabase
  //     .from('appointments')
  //     .update({ status: 'completed' })
  //     .eq('id', appointmentId);
  // }

  // Simulación de delay de red
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: true, message: 'Registro clínico guardado exitosamente' };
};

export const generatePrescriptionPDF = (record: Partial<ClinicalRecord>) => {
  // Aquí se integraría una librería como jspdf o react-pdf
  console.log('Generando PDF para receta...', record.prescription);
  return true;
};
