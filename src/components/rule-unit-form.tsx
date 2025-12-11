import { Button, Group, Stack, Tabs } from '@mantine/core'
import { useState } from 'react'
import type { TypeMetric, TypeRange } from '../types/client'
import { Metric } from './metric'
import { MetricWeight } from './metrics/metric-weight'
import { Operator } from './operator'
import { Range } from './range'
import { RuleSelector } from './rule-selector'
import { Task } from './task'
import { Value } from './value'

export const RuleUnitForm = () => {
  const [selectedMetric, setSelectedMetric] = useState<TypeMetric>('spend')
  const [selectedRange, setSelectedRange] = useState<TypeRange>('today')
  const [selectedComparisonMetric, setSelectedComparisonMetric] = useState<TypeMetric>('spend')
  const [selectedComparisonRange, setSelectedComparisonRange] = useState<TypeRange>('yesterday')
  const [ruleType, setRuleType] = useState<'valueBased' | 'metricBased'>('valueBased')

  return (
    <Stack gap="lg">
      <Task />

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

      <Group justify="space-between" align="center">
        <Group gap="md">
          <Button variant="subtle" color="gray" leftSection={<span>+</span>}>
            Condition
          </Button>
          <Button variant="subtle" color="gray" leftSection={<span>+</span>}>
            Group
          </Button>
        </Group>

        <Tabs
          defaultValue="preview"
          variant="default"
          styles={{
            tab: {
              '&[data-active]': {
                backgroundColor: 'transparent',
                color: 'var(--mantine-color-gray-9)',
                borderBottom: '2px solid var(--mantine-color-gray-9)',
              },
            },
          }}
        >
          <Tabs.List>
            <Tabs.Tab value="preview">Preview</Tabs.Tab>
            <Tabs.Tab value="description">Description</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </Group>
    </Stack>
  )
}
