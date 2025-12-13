import { MetricRuleForm } from './metric-rule-form'
import type { Payload, RuleType, RuleValues } from './types'
import { ValueRuleForm } from './value-rule-form'

export type RuleTypeFormProps<T extends RuleType> = {
  ruleType: T
  payload: RuleValues[T]['payload']
}

export type RuleUnitFormProps<T extends RuleType = RuleType> = {
  id: string
  indicatorColor: string
  onDelete: (id: string) => void
  ruleType: T
  payload: Payload[T]
}

export const RuleUnitForm = (props: RuleUnitFormProps) => {
  if (props.ruleType === 'metricBased') {
    return <MetricRuleForm {...(props as RuleUnitFormProps<'metricBased'>)} />
  }
  return <ValueRuleForm {...(props as RuleTypeFormProps<'valueBased'>)} />
}
