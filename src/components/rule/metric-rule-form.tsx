import { useState } from 'react'
import type { RuleTypeFormProps } from './rule-unit-form'
import type { TypeMetric, TypeRange } from '../../types/client'
import { Group, Stack } from '@mantine/core'
import { Connector } from '../connector/connector'
import { Metric } from '../metric'
import { Operator } from '../operator'
import { MetricWeight } from '../metrics/metric-weight'
import { Range } from '../range'
import { RuleSelector } from '../rule-selector'

export const MetricRuleForm = ({ ruleType, payload }: RuleTypeFormProps<'metricBased'>) => {
  const [selectedMetric, setSelectedMetric] = useState<TypeMetric>(payload?.metric || 'cost')
  const [selectedRange, setSelectedRange] = useState<TypeRange>(payload?.range || 'last_30_days')
  const [selectedComparisonMetric, setSelectedComparisonMetric] = useState<TypeMetric>(
    payload?.comparisonMetric || 'cost'
  )
  const [selectedComparisonRange, setSelectedComparisonRange] = useState<TypeRange>(
    payload?.comparisonMetricRange || 'last_30_days'
  )
  const [selectedComparisonWeight, setSelectedComparisionWeight] = useState(payload?.comparisonMetricWeight || 0)
  return (
    <Group pos="relative" gap={0} wrap="nowrap" align="stretch">
      <Connector />
      <Stack gap="lg" style={{ flex: 1 }}>
        <Group gap={0} wrap="nowrap">
          <Metric selectedMetric={selectedMetric} onMetricChange={setSelectedMetric} />
          <Range selectedRange={selectedRange} onRangeChange={setSelectedRange} />
          <Operator />
          <MetricWeight weight={selectedComparisonWeight} onWeightChange={setSelectedComparisionWeight} />
          <Metric selectedMetric={selectedComparisonMetric} onMetricChange={setSelectedComparisonMetric} isComparison />
          <Range selectedRange={selectedComparisonRange} onRangeChange={setSelectedComparisonRange} isComparison>
            <RuleSelector ruleType={ruleType} setRuleType={() => {}} onDelete={() => {}} />
          </Range>
        </Group>
      </Stack>
    </Group>
  )
}
