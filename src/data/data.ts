import type { Group, RuleItem } from '@/components/task/types'
import { newId } from '@/utils/id'

export const sampleGroup: Group = {
  id: newId('group'),
  relation: 'and',
  type: 'group',
  children: [
    {
      id: newId('condition'),
      ruleType: 'valueBased',
      type: 'condition',
      payload: {
        valueBased: {
          metric: 'spend',
          range: 'today',
          operator: 'gt',
          value: 100,
        },
      },
      relation: '',
      children: [],
    },
    {
      id: newId('condition'),
      type: 'condition',
      ruleType: 'valueBased',
      payload: {
        valueBased: {
          metric: 'purchases',
          range: 'yesterday',
          operator: 'lt',
          value: 50,
        },
      },
      relation: '',
      children: [],
    },
    {
      id: newId('group'),
      relation: 'or',
      type: 'group',
      children: [
        {
          id: newId('condition'),
          type: 'condition',
          ruleType: 'valueBased',
          payload: {
            valueBased: {
              metric: 'impressions',
              range: 'last_3_days',
              operator: 'lte',
              value: 500,
            },
          },
          relation: '',
          children: [],
        },
        {
          id: newId('condition'),
          type: 'condition',
          ruleType: 'valueBased',
          payload: {
            valueBased: {
              metric: 'purchase_roas',
              range: 'last_7_days',
              operator: 'eq',
              value: 20,
            },
          },
          relation: '',
          children: [],
        },
      ],
    },
    {
      id: newId('condition'),
      type: 'condition',
      ruleType: 'valueBased',
      relation: '',
      payload: {
        valueBased: {
          metric: 'clicks',
          range: 'today',
          operator: 'lt',
          value: 100,
        },
      },
      children: [],
    },
  ],
}

export const sampleItem = {
  id: newId('condition'),
  type: 'condition',
  ruleType: 'valueBased',
  payload: {
    valueBased: {
      metric: 'impressions',
      range: 'last_3_days',
      operator: 'lte',
      value: 500,
    },
  },
  relation: '',
  children: [],
} as RuleItem
