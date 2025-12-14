import { Combobox, Group, Paper, Text, useCombobox, Checkbox } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import type { TypeMetric } from '../types/client'
import { metricLabels } from '../utils/labels'

const metricOptions: TypeMetric[] = [
  'cost',
  'clicks',
  'cpm',
  'cpc',
  'impressions',
  'spend',
  'reach',
  'purchase_roas',
  'current_bid',
  'time_greater_than',
  'time_less_than',
  'daily_budget',
  'purchases',
  'ctr',
  'leads_value',
  'active_ads_in_adset',
] as const

interface MetricProps {
  selectedMetric: TypeMetric
  onMetricChange: (metric: TypeMetric) => void
  isComparison?: boolean
  isSelectable?: boolean
  isSelected?: boolean
  onToggleSelection?: () => void
}

export const Metric = ({ selectedMetric, onMetricChange, isComparison, isSelectable, isSelected, onToggleSelection }: MetricProps) => {
  const metricCombobox = useCombobox()

  return (
    <Combobox
      store={metricCombobox}
      onOptionSubmit={(value) => {
        onMetricChange(value as TypeMetric)
        metricCombobox.closeDropdown()
      }}
    >
      <Combobox.Target>
        <Paper
          style={{
            borderRight: '1px solid #C6C6C6',
            borderTopLeftRadius: '4px',
            borderBottomLeftRadius: '4px',
          }}
          p="md"
          bg="white"
          shadow="sm"
          radius="0"
          flex={1}
          onClick={() => metricCombobox.toggleDropdown()}
        >
          <Group align="center" gap={8}>
            {!isComparison && isSelectable && onToggleSelection ? (
              <Checkbox
                checked={isSelected}
                onChange={(e) => {
                  e.stopPropagation()
                  onToggleSelection()
                }}
                onClick={(e) => e.stopPropagation()}
                styles={{
                  input: {
                    cursor: 'pointer'
                  }
                }}
              />
            ) : null}

            <Group justify="space-between" wrap="nowrap" gap="xs" style={{ flex: 1 }}>
              <Text size="sm">{metricLabels[selectedMetric]}</Text>
              <IconChevronDown size={16} color="var(--mantine-color-gray-5)" />
            </Group>
          </Group>
        </Paper>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {metricOptions.map((option) => (
            <Combobox.Option value={option} key={option}>
              <Text size="sm" c={selectedMetric === option ? 'black' : 'gray.7'}>
                {metricLabels[option]}
              </Text>
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}
