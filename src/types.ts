/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum UserRole {
  ADMIN = 'ADMIN',
  VETERINARIAN = 'VETERINARIAN',
  RECEPTION = 'RECEPTION',
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
}

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  owner_id: string;
  birth_date?: string;
}

export interface Appointment {
  id: string;
  pet_id: string;
  vet_id: string;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
  reason: string;
}

export interface ClinicalRecord {
  id: string;
  pet_id: string;
  appointment_id: string;
  vet_id: string;
  date: string;
  reason: string;
  anamnesis: string;
  physical_exam: {
    heart_rate: number;
    weight: number;
    temperature: number;
  };
  diagnosis: string;
  treatment_plan: string;
  prescription: PrescriptionItem[];
}

export interface PrescriptionItem {
  medication: string;
  dose: string;
  frequency: string;
  duration: string;
}
