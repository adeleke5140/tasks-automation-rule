import { Box, Group, Stack } from '@mantine/core'
import { useState } from 'react'
import type { TypeMetric, TypeRange } from '../types/client'
import { Metric } from './metric'
import { MetricWeight } from './metrics/metric-weight'
import { Operator } from './operator'
import { Range } from './range'
import { RuleSelector } from './rule-selector'
import { Value } from './value'

interface RuleUnitFormProps {
  showConnector?: boolean
  indicatorColor?: string
  onDelete?: () => void
}

export const RuleUnitForm = ({ onDelete, showConnector }: RuleUnitFormProps) => {
  const [selectedMetric, setSelectedMetric] = useState<TypeMetric>('spend')
  const [selectedRange, setSelectedRange] = useState<TypeRange>('today')
  const [selectedComparisonMetric, setSelectedComparisonMetric] = useState<TypeMetric>('spend')
  const [selectedComparisonRange, setSelectedComparisonRange] = useState<TypeRange>('yesterday')
  const [ruleType, setRuleType] = useState<'valueBased' | 'metricBased'>('valueBased')

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
          <>
            <Metric selectedMetric={selectedMetric} onMetricChange={setSelectedMetric} />
            <Range selectedRange={selectedRange} onRangeChange={setSelectedRange} />
            <Operator />
          </>

          {ruleType === 'metricBased' ? (
            <>
              <MetricWeight />
              <Metric
                selectedMetric={selectedComparisonMetric}
                onMetricChange={setSelectedComparisonMetric}
                isComparison
              />
              <Range selectedRange={selectedComparisonRange} onRangeChange={setSelectedComparisonRange} isComparison>
                <RuleSelector ruleType={ruleType} setRuleType={setRuleType} onDelete={onDelete} />
              </Range>
            </>
          ) : (
            <Value selectedMetric={selectedMetric}>
              <RuleSelector ruleType={ruleType} setRuleType={setRuleType} onDelete={onDelete} />
            </Value>
          )}
        </Group>
      </Stack>
    </Group>
  )
}
