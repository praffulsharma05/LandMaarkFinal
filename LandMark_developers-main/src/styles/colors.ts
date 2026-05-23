/**
 * Color System Tokens
 * Strictly defines all colors used in the project to avoid hardcoded hex/rgb/rgba literals.
 */

export const COLORS = {
  // Brand Colors
  primary: {
    DEFAULT: '#0a1f44',
    light: '#1e3a6a',
    dark: '#030f24',
  },
  secondary: {
    DEFAULT: '#A52A2A',
    light: '#b83e3e',
    dark: '#8B4513',
  },

  // Base Grays
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030712',
  },

  // Interface Colors
  success: {
    DEFAULT: '#10b981',
    light: '#ecfdf5',
    dark: '#065f46',
  },
  error: {
    DEFAULT: '#ef4444',
    light: '#fef2f2',
    dark: '#991b1b',
  },
  warning: {
    DEFAULT: '#f59e0b',
    light: '#fdfbeb',
    dark: '#92400e',
  },
  info: {
    DEFAULT: '#3b82f6',
    light: '#eff6ff',
    dark: '#1e40af',
  },

  // Basic Colors
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',

  // Extended icon colors
  purple: {
    500: '#8b5cf6',
    50: '#f5f3ff',
  },
  indigo: {
    500: '#6366f1',
    50: '#eef2ff',
  },
  amber: {
    600: '#d97706',
    100: '#fef3c7',
    50: '#fffbeb',
  },
  orange: {
    500: '#f97316',
    50: '#fff7ed',
  },
  sky: {
    500: '#0ea5e9',
    50: '#f0f9ff',
  },
  green: {
    500: '#22c55e',
    50: '#f0fdf4',
  },
  pink: {
    600: '#db2777',
    100: '#fce7f3',
  },
  yellow: {
    500: '#eab308',
    50: '#fefce8',
  },
  cyan: {
    500: '#06b6d4',
    50: '#ecfeff',
  },
  blue: {
    100: '#dbeafe',
  },
  bookmark: '#5e40e0',
} as const;

export type ThemeColors = typeof COLORS;
