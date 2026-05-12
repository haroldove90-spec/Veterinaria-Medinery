/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserRole } from '../types';

export const useRole = (currentRole: UserRole) => {
  const isAdmin = currentRole === UserRole.ADMIN;
  const isVet = currentRole === UserRole.VETERINARIAN;
  const isReception = currentRole === UserRole.RECEPTION;
  const isClient = currentRole === UserRole.CLIENT;

  const canAccessManagement = isAdmin;
  const canAccessClinical = isAdmin || isVet;
  const canAccessReception = isAdmin || isReception;
  const canAccessPOS = isAdmin || isReception;

  return {
    isAdmin,
    isVet,
    isReception,
    isClient,
    canAccessManagement,
    canAccessClinical,
    canAccessReception,
    canAccessPOS,
  };
};
