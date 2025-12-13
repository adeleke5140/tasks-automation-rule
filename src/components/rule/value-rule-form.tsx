import { Group, Stack } from '@mantine/core'
import { useState } from 'react'
import type { TypeMetric, TypeRange } from '../../types/client'
import { Connector } from '../connector/connector'
import { Metric } from '../metric'
import { Operator } from '../operator'
import { RuleSelector } from '../rule-selector'
import { Value } from '../value'
import type { RuleTypeFormProps } from './rule-unit-form'
import { Range } from '../range'

export const ValueRuleForm = ({ ruleType, payload }: RuleTypeFormProps<'valueBased'>) => {
  const [selectedMetric, setSelectedMetric] = useState<TypeMetric>(payload?.metric || 'cost')
  const [selectedRange, setSelectedRange] = useState<TypeRange>(payload?.range || 'today')
  return (
    <Group pos="relative" gap={0} wrap="nowrap" align="stretch">
      <Connector />

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
