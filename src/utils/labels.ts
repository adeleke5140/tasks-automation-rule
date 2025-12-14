import type { TypeMetric, TypeRange, TypeOperator } from '@/types/client'

export const metricLabels: Record<TypeMetric, string> = {
  cost: 'Cost',
  clicks: 'Clicks',
  cpm: 'CPM',
  cpc: 'CPC',
  impressions: 'Impressions',
  spend: 'Spend',
  reach: 'Reach',
  purchase_roas: 'Purchase ROAS',
  current_bid: 'Current bid',
  time_greater_than: 'Time greater than',
  time_less_than: 'Time less than',
  daily_budget: 'Daily Budget',
  purchases: 'Purchases',
  ctr: 'CTR',
  leads_value: 'Leads Value',
  active_ads_in_adset: 'Active Ads in Adset',
}

export const rangeLabels: Record<TypeRange, string> = {
  yesterday: 'Yesterday',
  today: 'Today',
  last_3_days: 'Last 3 days',
  last_7_days: 'Last 7 days',
  last_15_days: 'Last 15 days',
  last_30_days: 'Last 30 days',
}

export const operatorLabels: Record<TypeOperator, string> = {
  lt: '<',
  lte: '≤',
  gt: '>',
  gte: '≥',
  eq: '=',
  ne: '≠',
}

export const operatorTextLabels: Record<TypeOperator, string> = {
  lt: 'Lt',
  lte: 'Lte',
  gt: 'Gt',
  gte: 'Gte',
  eq: 'Eq',
  ne: 'Ne',
}
