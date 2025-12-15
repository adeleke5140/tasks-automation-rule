import { Group, Paper, TextInput } from '@mantine/core'
import type { TypeMetric } from '@/types/client'

interface ValueProps {
  selectedMetric: TypeMetric
  selectedValue: number | string
  onValueChange: (item: number) => void
  children: React.ReactNode
}

const metricsWithCurrency: TypeMetric[] = ['cpm', 'cost', 'spend', 'purchase_roas', 'current_bid', 'daily_budget']

export const Value = ({ selectedMetric, selectedValue, onValueChange, children }: ValueProps) => {
  const showCurrencySign = metricsWithCurrency.includes(selectedMetric)

  return (
    <Paper
      p="xs"
      bg="white"
      shadow="sm"
      radius="0"
      flex={1}
      style={{ borderTopRightRadius: '4px', borderBottomRightRadius: '4px' }}
    >
      <Group align="center" justify="space-between" gap={8}>
        <TextInput
          type="number"
          value={selectedValue}
          onChange={(event) => {
            const value = event.currentTarget.value
            onValueChange(Number(value))
          }}
          min={0}
          step={10}
          placeholder={showCurrencySign ? '$' : '0'}
          variant="unstyled"
          inputMode="decimal"
          styles={{
            input: {
              color: 'var(--mantine-color-gray-7)',
              fontSize: 'var(--mantine-font-size-sm)',
              backgroundColor: 'transparent',
            },
          }}
        />
        <Group gap="xs" wrap="nowrap">
          {children}
        </Group>
      </Group>
    </Paper>
  )
}
