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

export const ValueRuleForm = ({ id, ruleType, payload, onDelete, onChangeRuleType }: RuleTypeFormProps<'valueBased'>) => {
  const [selectedMetric, setSelectedMetric] = useState<TypeMetric>(payload?.metric || 'cost')
  const [selectedRange, setSelectedRange] = useState<TypeRange>(payload?.range || 'today')
  const [selectedOperator, setSelectedOperator] = useState(payload?.operator || 'lt')
  const [selectedValue, setSelectedValue] = useState(payload?.value || 0)
  return (
    <Group pos="relative" gap={0} wrap="nowrap" align="stretch">
      <Connector />

      <Stack gap="lg" style={{ flex: 1 }}>
        <Group gap={0} wrap="nowrap">
          <Metric selectedMetric={selectedMetric} onMetricChange={setSelectedMetric} />
          <Range selectedRange={selectedRange} onRangeChange={setSelectedRange} />
          <Operator selectedOperator={selectedOperator} onOperatorChange={setSelectedOperator} />
          <Value selectedMetric={selectedMetric} selectedValue={selectedValue} onValueChange={setSelectedValue}>
            <RuleSelector ruleType={ruleType} setRuleType={onChangeRuleType} onDelete={() => onDelete(id)} />
          </Value>
        </Group>
      </Stack>
    </Group>
  )
}
