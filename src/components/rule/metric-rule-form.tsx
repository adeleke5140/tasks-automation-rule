import { Group, Stack } from '@mantine/core'
import { type TypeMetric, type TypeOperator, type TypeRange } from '@/types/client'
import { Connector } from '@/components/connector/connector'
import { Metric } from '@/components/metrics/metric'
import { MetricWeight } from '@/components/metrics/metric-weight'
import { Operator } from '@/components/fields/operator'
import { Range } from '@/components/fields/range'
import { RuleSelector } from './rule-selector'
import type { RuleTypeFormProps } from './rule-unit-form'
import { useAppDispatch } from '@/store/hooks'
import { updateConditionPayload } from '@/store/slices/conditionsSlice'

export const MetricRuleForm = ({
  id,
  taskId,
  ruleType,
  payload,
  onDelete,
  onChangeRuleType,
}: RuleTypeFormProps<'metricBased'>) => {
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

  const handleComparisonWeightChange = (comparisonMetricWeight: number) => {
    dispatch(updateConditionPayload({ taskId, conditionId: id, payload: { comparisonMetricWeight } }))
  }

  const handleComparisonMetricChange = (comparisonMetric: TypeMetric) => {
    dispatch(updateConditionPayload({ taskId, conditionId: id, payload: { comparisonMetric } }))
  }

  const handleComparisonRangeChange = (comparisonMetricRange: TypeRange) => {
    dispatch(updateConditionPayload({ taskId, conditionId: id, payload: { comparisonMetricRange } }))
  }

  return (
    <Group pos="relative" gap={0} wrap="nowrap" align="stretch">
      <Connector />
      <Stack gap="lg" style={{ flex: 1 }}>
        <Group gap={0} wrap="nowrap">
          <Metric selectedMetric={payload?.metric || 'cost'} onMetricChange={handleMetricChange} />
          <Range selectedRange={payload?.range || 'last_30_days'} onRangeChange={handleRangeChange} />
          <Operator selectedOperator={payload?.operator || 'eq'} onOperatorChange={handleOperatorChange} />
          <MetricWeight weight={payload?.comparisonMetricWeight || 0} onWeightChange={handleComparisonWeightChange} />
          <Metric selectedMetric={payload?.comparisonMetric || 'cost'} onMetricChange={handleComparisonMetricChange} isComparison />
          <Range selectedRange={payload?.comparisonMetricRange || 'last_30_days'} onRangeChange={handleComparisonRangeChange} isComparison>
            <RuleSelector ruleType={ruleType} setRuleType={onChangeRuleType} onDelete={() => onDelete(id)} />
          </Range>
        </Group>
      </Stack>
    </Group>
  )
}
