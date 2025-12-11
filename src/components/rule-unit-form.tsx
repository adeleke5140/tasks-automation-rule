import { Box, Group, Stack } from '@mantine/core'
import { useState } from 'react'
import type { TypeMetric, TypeRange } from '../types/client'
import { Metric } from './metric'
import { MetricWeight } from './metrics/metric-weight'
import { Operator } from './operator'
import { Range } from './range'
import { RuleSelector } from './rule-selector'
import { Task } from './task'
import { Value } from './value'

interface RuleUnitFormProps {
  showTask?: boolean
  showIndicator?: boolean
  indicatorColor?: string
}

export const RuleUnitForm = ({
  showTask = true,
  showIndicator = false,
  indicatorColor = '#3B82F6'
}: RuleUnitFormProps) => {
  const [selectedMetric, setSelectedMetric] = useState<TypeMetric>('spend')
  const [selectedRange, setSelectedRange] = useState<TypeRange>('today')
  const [selectedComparisonMetric, setSelectedComparisonMetric] = useState<TypeMetric>('spend')
  const [selectedComparisonRange, setSelectedComparisonRange] = useState<TypeRange>('yesterday')
  const [ruleType, setRuleType] = useState<'valueBased' | 'metricBased'>('valueBased')

  return (
    <Group gap={0} wrap="nowrap" align="flex-start">
      {showIndicator && (
        <Box
          style={{
            width: '4px',
            height: '100%',
            backgroundColor: indicatorColor,
            borderRadius: '2px',
            marginRight: '16px',
            minHeight: '60px',
          }}
        />
      )}

      <Stack gap="lg" style={{ flex: 1 }}>
        {showTask && <Task />}

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
                <RuleSelector ruleType={ruleType} setRuleType={setRuleType} />
              </Range>
            </>
          ) : (
            <Value selectedMetric={selectedMetric}>
              <RuleSelector ruleType={ruleType} setRuleType={setRuleType} />
            </Value>
          )}
        </Group>
      </Stack>
    </Group>
  )
}
