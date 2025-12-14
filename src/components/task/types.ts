import type { TypeRuleUnit } from '@/types/client'

export type Relation = TypeRuleUnit['relation']

export type RuleItem = TypeRuleUnit & {
  id: string
  type: 'condition'
}

export type Group = { id: string; type: 'group'; relation: Relation; children: Array<Condition> }

export type Condition = Group | RuleItem
