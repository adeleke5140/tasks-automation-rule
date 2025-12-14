import { Group, Paper } from '@mantine/core'
import type { TypeMetric } from '@/types/client'

interface ValueProps {
  selectedMetric: TypeMetric
  selectedValue: number
  onValueChange: (item: number) => void
  children: React.ReactNode
}

const metricsWithCurrency: TypeMetric[] = ['cpm', 'cost', 'spend', 'purchase_roas', 'current_bid', 'daily_budget']

export const Value = ({ selectedMetric, selectedValue, onValueChange, children }: ValueProps) => {
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
      <Group align="center" justify="space-between" gap={8}>
        <input
          type="number"
          value={selectedValue}
          onChange={(e) => {
            const value = e.target.value
            if (value === '') {
              onValueChange(0)
            } else {
              const numValue = parseFloat(value)
              if (!isNaN(numValue) && numValue >= 0) {
                onValueChange(numValue)
              }
            }
          }}
          min="0"
          step="0.01"
          placeholder={showCurrencySign ? '$' : '0'}
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
