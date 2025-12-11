import { ActionIcon, Group, Menu, Paper, Text } from '@mantine/core'
import { IconCheck, IconSettings, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import type { TypeMetric } from '../types/client'

interface ValueProps {
  selectedMetric: TypeMetric
}

const metricsWithCurrency: TypeMetric[] = ['cpm', 'cpc', 'spend', 'purchase_roas', 'current_bid', 'daily_budget']

export const Value = ({ selectedMetric }: ValueProps) => {
  const [compareWith, setCompareWith] = useState<'Value' | 'Metric'>('Value')
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
        <Menu position="bottom-end" shadow="md">
          <Menu.Target>
            <ActionIcon variant="subtle" color="gray" size="sm">
              <IconSettings size={18} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Compare with</Menu.Label>
            <Menu.Item
              onClick={() => setCompareWith('Value')}
              rightSection={
                compareWith === 'Value' ? <IconCheck size={16} color="var(--mantine-color-m-blue-6)" /> : null
              }
            >
              <Text size="sm" fw={500} c={compareWith === 'Value' ? 'm-blue.6' : 'gray.7'}>
                Value
              </Text>
            </Menu.Item>
            <Menu.Item
              onClick={() => setCompareWith('Metric')}
              rightSection={
                compareWith === 'Metric' ? <IconCheck size={16} color="var(--mantine-color-m-blue-6)" /> : null
              }
            >
              <Text size="sm" fw={500} c={compareWith === 'Metric' ? 'm-blue.6' : 'gray.7'}>
                Metric
              </Text>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>

        <ActionIcon variant="subtle" color="gray" size="sm">
          <IconTrash size={18} />
        </ActionIcon>
      </Group>
    </Paper>
  )
}
