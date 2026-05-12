/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserRole } from '../types';

export const useRole = (currentRole: UserRole) => {
  const isAdmin = currentRole === UserRole.ADMIN;
  const isVet = currentRole === UserRole.VETERINARIAN;
  const isReception = currentRole === UserRole.RECEPTION;

  const canAccessManagement = isAdmin;
  const canAccessClinical = isAdmin || isVet;
  const canAccessReception = isAdmin || isReception;
  const canAccessPOS = isAdmin || isReception;

  return {
    isAdmin,
    isVet,
    isReception,
    canAccessManagement,
    canAccessClinical,
    canAccessReception,
    canAccessPOS,
  };
};
