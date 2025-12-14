import { Group, Stack } from '@mantine/core'
import type { TypeMetric, TypeRange, TypeOperator } from '@/types/client'
import { Connector } from '@/components/connector/connector'
import { Metric } from '@/components/metrics/metric'
import { Operator } from '@/components/fields/operator'
import { RuleSelector } from './rule-selector'
import { Value } from '@/components/fields/value'
import type { RuleTypeFormProps } from './rule-unit-form'
import { Range } from '@/components/fields/range'
import { useAppDispatch } from '@/store/hooks'
import { updateConditionPayload } from '@/store/slices/conditionsSlice'

export const ValueRuleForm = ({
  id,
  taskId,
  ruleType,
  payload,
  onDelete,
  onChangeRuleType,
  isSelectable,
  isSelected,
  onToggleSelection,
}: RuleTypeFormProps<'valueBased'> & {
  isSelectable?: boolean
  isSelected?: boolean
  onToggleSelection?: () => void
}) => {
  const dispatch = useAppDispatch()

  const handleMetricChange = (metric: TypeMetric) => {
    dispatch(updateConditionPayload({ taskId, conditionId: id, payload: { metric } }))
  }

  const handleRangeChange = (range: TypeRange) => {
    dispatch(updateConditionPayload({ taskId, conditionId: id, payload: { range } }))
  }

  const handleOperatorChange = (operator: TypeOperator) => {
    dispatch(updateConditionPayload({ taskId, conditionId: id, payload: { operator } }))
  }

  const handleValueChange = (value: number) => {
    dispatch(updateConditionPayload({ taskId, conditionId: id, payload: { value } }))
  }

  return (
    <Group pos="relative" gap={0} wrap="nowrap" align="stretch">
      <Connector />

      <Stack gap="lg" style={{ flex: 1 }}>
        <Group gap={0} wrap="nowrap">
          <Metric
            selectedMetric={payload?.metric || 'cost'}
            onMetricChange={handleMetricChange}
            isSelectable={isSelectable}
            isSelected={isSelected}
            onToggleSelection={onToggleSelection}
          />
          <Range selectedRange={payload?.range || 'today'} onRangeChange={handleRangeChange} />
          <Operator selectedOperator={payload?.operator || 'lt'} onOperatorChange={handleOperatorChange} />
          <Value
            selectedMetric={payload?.metric || 'cost'}
            selectedValue={payload?.value || 0}
            onValueChange={handleValueChange}
          >
            <RuleSelector ruleType={ruleType} setRuleType={onChangeRuleType} onDelete={() => onDelete(id)} />
          </Value>
        </Group>
      </Stack>
    </Group>
  )
}
