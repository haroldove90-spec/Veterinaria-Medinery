/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { UserRole } from '../types';
import { useRole } from '../hooks/useRole';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  currentRole: UserRole;
  fallback?: React.ReactNode;
}

/**
 * Componente para proteger secciones de la UI basadas en roles.
 * Simula el comportamiento de un middleware en aplicaciones SPA.
 */
export const RoleGuard: React.FC<RoleGuardProps> = ({ 
  children, 
  allowedRoles, 
  currentRole,
  fallback = null 
}) => {
  const hasAccess = allowedRoles.includes(currentRole);

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

/**
 * Ejemplo de configuración lógica para "Middleware" (Rutas Protegidas)
 */
export const RoutePermissions = {
  admin: [UserRole.ADMIN],
  clinic: [UserRole.ADMIN, UserRole.VETERINARIAN],
  reception: [UserRole.ADMIN, UserRole.RECEPTION],
  pos: [UserRole.ADMIN, UserRole.RECEPTION],
};
