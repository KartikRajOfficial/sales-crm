// Lead status options used across the app
export const LEAD_STATUSES = [
  'New',
  'Contacted',
  'Qualified',
  'Proposal Sent',
  'Won',
  'Lost',
];

// Opportunity stage options
export const OPPORTUNITY_STAGES = [
  'Prospecting',
  'Qualification',
  'Proposal',
  'Negotiation',
  'Won',
  'Lost',
];

// Color mappings for lead statuses (for badges and charts)
export const LEAD_STATUS_COLORS = {
  'New': { bg: 'bg-blue-500/15', text: 'text-blue-400', fill: '#3b82f6' },
  'Contacted': { bg: 'bg-cyan-500/15', text: 'text-cyan-400', fill: '#06b6d4' },
  'Qualified': { bg: 'bg-violet-500/15', text: 'text-violet-400', fill: '#8b5cf6' },
  'Proposal Sent': { bg: 'bg-amber-500/15', text: 'text-amber-400', fill: '#f59e0b' },
  'Won': { bg: 'bg-emerald-500/15', text: 'text-emerald-400', fill: '#10b981' },
  'Lost': { bg: 'bg-red-500/15', text: 'text-red-400', fill: '#ef4444' },
};

// Color mappings for opportunity stages
export const OPPORTUNITY_STAGE_COLORS = {
  'Prospecting': { bg: 'bg-blue-500/15', text: 'text-blue-400', fill: '#3b82f6' },
  'Qualification': { bg: 'bg-cyan-500/15', text: 'text-cyan-400', fill: '#06b6d4' },
  'Proposal': { bg: 'bg-violet-500/15', text: 'text-violet-400', fill: '#8b5cf6' },
  'Negotiation': { bg: 'bg-amber-500/15', text: 'text-amber-400', fill: '#f59e0b' },
  'Won': { bg: 'bg-emerald-500/15', text: 'text-emerald-400', fill: '#10b981' },
  'Lost': { bg: 'bg-red-500/15', text: 'text-red-400', fill: '#ef4444' },
};
