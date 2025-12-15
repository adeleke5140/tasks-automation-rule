import { MetricRuleForm } from './metric-rule-form'
import type { Payload, RuleType, RuleValues } from './types'
import { ValueRuleForm } from './value-rule-form'
import { useAppDispatch } from '@/store/hooks'
import { changeRuleType } from '@/store/slices/conditionsSlice'

export type SelectableProps = {
  isSelectable?: boolean
  isSelected?: boolean
  onToggleSelection?: () => void
}

export type RuleTypeFormProps<T extends RuleType> = {
  id: string
  taskId: string
  ruleType: T
  payload: RuleValues[T]['payload']
  onDelete: (id: string) => void
  onChangeRuleType: (ruleType: RuleType) => void
}

export type RuleUnitFormProps<T extends RuleType = RuleType> = {
  id: string
  taskId: string
  onDelete: (id: string) => void
  ruleType: T
  payload: Payload[T]
} & SelectableProps

export const RuleUnitForm = (props: RuleUnitFormProps) => {
  const dispatch = useAppDispatch()

  const formProps = {
    id: props.id,
    taskId: props.taskId,
    ruleType: props.ruleType,
    payload: props.payload,
    onDelete: props.onDelete,
    onChangeRuleType: (newRuleType: RuleType) => {
      dispatch(changeRuleType({ taskId: props.taskId, conditionId: props.id, ruleType: newRuleType }))
    },
    isSelectable: props.isSelectable,
    isSelected: props.isSelected,
    onToggleSelection: props.onToggleSelection,
  }

  if (props.ruleType === 'metricBased') {
    return <MetricRuleForm {...(formProps as RuleTypeFormProps<'metricBased'> & SelectableProps)} />
  }
  return <ValueRuleForm {...(formProps as RuleTypeFormProps<'valueBased'> & SelectableProps)} />
}
