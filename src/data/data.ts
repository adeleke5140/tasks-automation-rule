import type { Group, RuleItem } from '../components/task-item'

export const sampleGroup: Group = {
  id: '1',
  relation: 'and',
  type: 'group',
  children: [
    {
      id: '1',
      ruleType: 'valueBased',
      type: 'condition',
      payload: {
        valueBased: {
          metric: 'cost',
          range: 'today',
          operator: 'gt',
          value: 100,
        },
      },
      relation: '',
      children: [],
    },
    {
      id: '2',
      type: 'condition',
      ruleType: 'valueBased',
      payload: {
        valueBased: {
          metric: 'cost',
          range: 'today',
          operator: 'gt',
          value: 100,
        },
      },
      relation: '',
      children: [],
    },
    {
      id: '3',
      relation: 'or',
      type: 'group',
      children: [
        {
          id: '4',
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
          id: '5',
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
  ],
}

export const sampleItem = {
  id: '1',
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
