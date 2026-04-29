import type { Exhibitor } from '../data/exhibitors';
import { exhibitors } from '../data/exhibitors';

/**
 * Add a new exhibitor to the system  
 */
export function addExhibitor(exhibitor: Exhibitor): void {
  exhibitors.push(exhibitor);
}

/**
 * Update exhibitor information
 */
export function updateExhibitor(id: string, updates: Partial<Exhibitor>): boolean {
  const index = exhibitors.findIndex(e => e.id === id);
  if (index !== -1) {
    exhibitors[index] = { ...exhibitors[index], ...updates };
    return true;
  }
  return false;
}

/**
 * Remove an exhibitor
 */
export function removeExhibitor(id: string): boolean {
  const index = exhibitors.findIndex(e => e.id === id);
  if (index !== -1) {
    exhibitors.splice(index, 1);
    return true;
  }
  return false;
}

/**
 * Get exhibitor by ID
 */
export function getExhibitor(id: string): Exhibitor | undefined {
  return exhibitors.find(e => e.id === id);
}

/**
 * Search exhibitors by name or description
 */
export function searchExhibitors(query: string): Exhibitor[] {
  const lowerQuery = query.toLowerCase();
  return exhibitors.filter(
    e => e.name.toLowerCase().includes(lowerQuery) || 
         e.description.toLowerCase().includes(lowerQuery) ||
         e.category.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Validate exhibitor data
 */
export function validateExhibitor(exhibitor: Partial<Exhibitor>): string[] {
  const errors: string[] = [];
  
  if (!exhibitor.id?.trim()) {
    errors.push('Exhibitor ID is required');
  }
  
  if (!exhibitor.name?.trim()) {
    errors.push('Exhibitor name is required');
  }
  
  if (!exhibitor.logo?.trim()) {
    errors.push('Exhibitor logo path is required');
  }
  
  if (!exhibitor.description?.trim()) {
    errors.push('Exhibitor description is required');
  }
  
  if (!exhibitor.category?.trim()) {
    errors.push('Exhibitor category is required');
  }
  
  return errors;
}