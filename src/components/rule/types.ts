import type { TypeRuleUnit } from '../../types/client'

export type Payload = TypeRuleUnit['payload']
export type RuleType = TypeRuleUnit['ruleType']

export type RuleValues = {
  [K in RuleType]: {
    ruleType: K
    payload: Payload[K]
  }
}
