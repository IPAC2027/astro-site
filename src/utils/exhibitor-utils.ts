import type { Sponsor, Exhibitor } from '../data/exhibitors';
import { sponsors, exhibitors } from '../data/exhibitors';

/**
 * Add a new sponsor to the system
 */
export function addSponsor(sponsor: Sponsor): void {
  sponsors.push(sponsor);
}

/**
 * Add a new exhibitor to the system  
 */
export function addExhibitor(exhibitor: Exhibitor): void {
  exhibitors.push(exhibitor);
}

/**
 * Update sponsor information
 */
export function updateSponsor(name: string, updates: Partial<Sponsor>): boolean {
  const index = sponsors.findIndex(s => s.name === name);
  if (index !== -1) {
    sponsors[index] = { ...sponsors[index], ...updates };
    return true;
  }
  return false;
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
 * Remove a sponsor
 */
export function removeSponsor(name: string): boolean {
  const index = sponsors.findIndex(s => s.name === name);
  if (index !== -1) {
    sponsors.splice(index, 1);
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
 * Get sponsor by name
 */
export function getSponsor(name: string): Sponsor | undefined {
  return sponsors.find(s => s.name === name);
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
 * Search sponsors by name or description
 */
export function searchSponsors(query: string): Sponsor[] {
  const lowerQuery = query.toLowerCase();
  return sponsors.filter(
    s => s.name.toLowerCase().includes(lowerQuery) || 
         (s.description && s.description.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Generate logo path for a given filename
 */
export function getLogoPath(filename: string): string {
  return `/logos/${filename}`;
}

/**
 * Validate sponsor data
 */
export function validateSponsor(sponsor: Partial<Sponsor>): string[] {
  const errors: string[] = [];
  
  if (!sponsor.name?.trim()) {
    errors.push('Sponsor name is required');
  }
  
  if (!sponsor.logo?.trim()) {
    errors.push('Sponsor logo path is required');
  }
  
  if (!sponsor.link?.trim()) {
    errors.push('Sponsor website link is required');
  }
  
  if (!sponsor.tier || !['platinum', 'gold', 'silver', 'bronze'].includes(sponsor.tier)) {
    errors.push('Valid sponsor tier is required (platinum, gold, silver, bronze)');
  }
  
  return errors;
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