// ----------------------
// Types for dashboard data
// ----------------------

export interface Variable {
  id: number;
  title: string;
}

export type VariableGroups = {
  [category: string]: Variable[];
};

export interface KPI {
  heading: string;
  description: string;
  highlight: string;
}

export type KPIData = {
  [id: number]: KPI;
};

// ----------------------
// Mock variable group data categorized by type
// ----------------------

export const variableGroups: VariableGroups = {
  VariableCategory1: [
    { id: 1, title: 'Carbon 1' },
    { id: 2, title: 'Co2 Distribution' },
    { id: 3, title: 'Fleet sizing' },
  ],
  VariableCategory2: [
    { id: 1, title: 'Parking Rate' },
    { id: 2, title: 'Border Rate' },
    { id: 3, title: 'Request rate' },
    { id: 4, title: 'Variable 1' },
    { id: 5, title: 'Variable 1' },
    { id: 6, title: 'Variable 1' },
  ],
  VariableCategory3: [
    { id: 1, title: 'Variable 1' },
    { id: 2, title: 'Variable 1' },
    { id: 3, title: 'Variable 1' },
  ],
};

// ----------------------
// Mock KPI data for dashboard metrics
// ----------------------

export const kpiData: KPIData = {
  1: {
    heading: 'Infrastructure Units',
    description: 'This describes val two and what the shown data means.',
    highlight: '€421.07',
  },
  2: {
    heading: 'Charging Growth',
    description: 'This describes val two and what the shown data means.',
    highlight: '33.07',
  },
  3: {
    heading: 'Localization change',
    description: 'This describes val two and what the shown data means.',
    highlight: '21.9%',
  },
  4: {
    heading: 'Fleet growth',
    description: 'This describes val two and what the shown data means.',
    highlight: '7.03%',
  },
};
