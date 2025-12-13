import { Group, Paper } from '@mantine/core'
import { useState } from 'react'
import type { TypeMetric } from '../types/client'

interface ValueProps {
  selectedMetric: TypeMetric
  children: React.ReactNode
}

const metricsWithCurrency: TypeMetric[] = ['cpm', 'cost', 'spend', 'purchase_roas', 'current_bid', 'daily_budget']

export const Value = ({ selectedMetric, children }: ValueProps) => {
  const [value, setValue] = useState('0')
  const showCurrencySign = metricsWithCurrency.includes(selectedMetric)

  return (
    <Paper
      p="md"
      bg="white"
      shadow="sm"
      radius="0"
      flex={1}
      style={{ borderTopRightRadius: '4px', borderBottomRightRadius: '4px' }}
    >
      <Group align="cneter" justify="space-between" gap={8}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={showCurrencySign ? '$' : ''}
          style={{
            border: 'none',
            outline: 'none',
            background: 'transparent',
            color: 'var(--mantine-color-gray-7)',
            fontSize: 'var(--mantine-font-size-sm)',
          }}
        />
        <Group gap="xs" wrap="nowrap">
          {children}
        </Group>
      </Group>
    </Paper>
  )
}
