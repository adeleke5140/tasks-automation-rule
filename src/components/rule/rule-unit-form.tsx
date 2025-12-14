import { MetricRuleForm } from './metric-rule-form'
import type { Payload, RuleType, RuleValues } from './types'
import { ValueRuleForm } from './value-rule-form'

export type RuleTypeFormProps<T extends RuleType> = {
  id: string
  ruleType: T
  payload: RuleValues[T]['payload']
  onDelete: (id: string) => void
  onChangeRuleType: (ruleType: RuleType) => void
}

export type RuleUnitFormProps<T extends RuleType = RuleType> = {
  id: string
  indicatorColor: string
  onDelete: (id: string) => void
  ruleType: T
  payload: Payload[T]
  isSelectable?: boolean
  isSelected?: boolean
  onToggleSelection?: () => void
}

export const RuleUnitForm = (props: RuleUnitFormProps) => {
  const formProps = {
    id: props.id,
    ruleType: props.ruleType,
    payload: props.payload,
    onDelete: props.onDelete,
    onChangeRuleType: (newRuleType: RuleType) => {
      console.log('Change rule type to:', newRuleType)
    }
  }

  if (props.ruleType === 'metricBased') {
    return <MetricRuleForm {...(formProps as RuleTypeFormProps<'metricBased'>)} />
  }
  return <ValueRuleForm {...(formProps as RuleTypeFormProps<'valueBased'>)} />
}
