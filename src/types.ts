/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum UserRole {
  ADMIN = 'ADMIN',
  VETERINARIAN = 'VETERINARIAN',
  RECEPTION = 'RECEPTION',
}

export enum AppointmentStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum ServiceType {
  CONSULTA = 'CONSULTA',
  CIRUGIA = 'CIRUGIA',
  ESTETICA = 'ESTETICA',
  VACUNACION = 'VACUNACION',
}

export enum ProductCategory {
  MEDICAMENTO = 'MEDICAMENTO',
  ALIMENTO = 'ALIMENTO',
  ACCESORIO = 'ACCESORIO',
  SERVICIO = 'SERVICIO',
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  stock: number;
  reorder_point: number;
}

export interface Sale {
  id: string;
  customer_id: string;
  total: number;
  tax: number;
  discount: number;
  created_at: string;
  items: SaleItem[];
}

export interface SaleItem {
  id: string;
  sale_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface Owner {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  address?: string;
}

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  owner_id: string;
  birth_date?: string;
  age?: number;
  weight?: number;
  photo_url?: string;
}

export interface Appointment {
  id: string;
  pet_id: string;
  pet_name?: string; // Cache for easy display
  vet_id: string;
  vet_name?: string;
  date: string; // ISO String
  time: string; // HH:mm
  status: AppointmentStatus;
  service_type: ServiceType;
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
