import { Group, Stack } from '@mantine/core'
import { useState } from 'react'
import { type TypeMetric, type TypeOperator, type TypeRange } from '../../types/client'
import { Connector } from '../connector/connector'
import { Metric } from '../metric'
import { MetricWeight } from '../metrics/metric-weight'
import { Operator } from '../operator'
import { Range } from '../range'
import { RuleSelector } from '../rule-selector'
import type { RuleTypeFormProps } from './rule-unit-form'

export const MetricRuleForm = ({ id, ruleType, payload, onDelete, onChangeRuleType }: RuleTypeFormProps<'metricBased'>) => {
  const [selectedMetric, setSelectedMetric] = useState<TypeMetric>(payload?.metric || 'cost')
  const [selectedRange, setSelectedRange] = useState<TypeRange>(payload?.range || 'last_30_days')
  const [selectedComparisonMetric, setSelectedComparisonMetric] = useState<TypeMetric>(
    payload?.comparisonMetric || 'cost'
  )
  const [selectedComparisonRange, setSelectedComparisonRange] = useState<TypeRange>(
    payload?.comparisonMetricRange || 'last_30_days'
  )
  const [selectedComparisonWeight, setSelectedComparisionWeight] = useState(payload?.comparisonMetricWeight || 0)
  const [selectedOperator, setSelectedOperator] = useState<TypeOperator>(payload?.operator || 'eq')

  return (
    <Group pos="relative" gap={0} wrap="nowrap" align="stretch">
      <Connector />
      <Stack gap="lg" style={{ flex: 1 }}>
        <Group gap={0} wrap="nowrap">
          <Metric selectedMetric={selectedMetric} onMetricChange={setSelectedMetric} />
          <Range selectedRange={selectedRange} onRangeChange={setSelectedRange} />
          <Operator selectedOperator={selectedOperator} onOperatorChange={setSelectedOperator} />
          <MetricWeight weight={selectedComparisonWeight} onWeightChange={setSelectedComparisionWeight} />
          <Metric selectedMetric={selectedComparisonMetric} onMetricChange={setSelectedComparisonMetric} isComparison />
          <Range selectedRange={selectedComparisonRange} onRangeChange={setSelectedComparisonRange} isComparison>
            <RuleSelector ruleType={ruleType} setRuleType={onChangeRuleType} onDelete={() => onDelete(id)} />
          </Range>
        </Group>
      </Stack>
    </Group>
  )
}
