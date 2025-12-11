import { ActionIcon, Group, Paper } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import type { TypeMetric } from '../types/client'

interface ValueProps {
  selectedMetric: TypeMetric
  children: React.ReactNode
}

const metricsWithCurrency: TypeMetric[] = ['cpm', 'cpc', 'spend', 'purchase_roas', 'current_bid', 'daily_budget']

export const Value = ({ selectedMetric, children }: ValueProps) => {
  const [value, setValue] = useState('')
  const showCurrencySign = metricsWithCurrency.includes(selectedMetric)

  return (
    <Paper
      p="md"
      bg="white"
      shadow="sm"
      radius="0"
      style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}
    >
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
          padding: 0,
          flex: 1,
          minWidth: 0,
        }}
      />
      <Group gap="xs" wrap="nowrap">
        {children}

        <ActionIcon variant="subtle" color="gray" size="sm">
          <IconTrash size={18} />
        </ActionIcon>
      </Group>
    </Paper>
  )
}
