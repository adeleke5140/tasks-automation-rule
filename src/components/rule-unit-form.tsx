import { Box, Group, Stack } from '@mantine/core'
import { useState } from 'react'
import type { TypeMetric, TypeRange, TypeRuleUnit } from '../types/client'
import { Metric } from './metric'
import { MetricWeight } from './metrics/metric-weight'
import { Operator } from './operator'
import { Range } from './range'
import { RuleSelector } from './rule-selector'
import { Value } from './value'

type Payload = TypeRuleUnit['payload']
type RuleType = TypeRuleUnit['ruleType']

type RuleValues = {
  [K in RuleType]: {
    ruleType: K
    payload: Payload[K]
  }
}

type RuleTypeFormProps<T extends RuleType> = {
  ruleType: T
  showConnector: boolean
  payload: RuleValues[T]['payload']
}

const ValueRuleForm = ({ ruleType, showConnector, payload }: RuleTypeFormProps<'valueBased'>) => {
  const [selectedMetric, setSelectedMetric] = useState<TypeMetric>(payload?.metric || 'cost')
  const [selectedRange, setSelectedRange] = useState<TypeRange>(payload?.range || 'today')
  return (
    <Group pos="relative" gap={0} wrap="nowrap" align="stretch">
      {showConnector ? (
        <Box
          component="span"
          pos="absolute"
          style={{
            width: '2em',
            height: '2px',
            left: '-32px',
            top: '50%',
            background: '#A5B3BF',
          }}
        />
      ) : null}

      <Stack gap="lg" style={{ flex: 1 }}>
        <Group gap={0} wrap="nowrap">
          <Metric selectedMetric={selectedMetric} onMetricChange={setSelectedMetric} />
          <Range selectedRange={selectedRange} onRangeChange={setSelectedRange} />
          <Operator />
          <Value selectedMetric={selectedMetric}>
            <RuleSelector ruleType={ruleType} setRuleType={() => {}} onDelete={() => {}} />
          </Value>
        </Group>
      </Stack>
    </Group>
  )
}

const MetricRuleForm = ({ ruleType, showConnector, payload }: RuleTypeFormProps<'metricBased'>) => {
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
      {showConnector ? (
        <Box
          component="span"
          pos="absolute"
          style={{
            width: '2em',
            height: '2px',
            left: '-32px',
            top: '50%',
            background: '#A5B3BF',
          }}
        />
      ) : null}

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

type RuleUnitFormProps<T extends RuleType = RuleType> = {
  id: string
  showConnector: boolean
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
