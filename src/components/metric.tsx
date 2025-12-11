import { Combobox, Group, Paper, Text, useCombobox } from '@mantine/core'
import { IconChevronDown, IconGripVertical } from '@tabler/icons-react'
import type { TypeMetric } from '../types/client'

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

const metricLabels: Record<TypeMetric, string> = {
  cost: 'Cost',
  clicks: 'Clicks',
  cpm: 'CPM',
  cpc: 'CPC',
  impressions: 'Impressions',
  spend: 'Spend',
  reach: 'Reach',
  purchase_roas: 'Purchase ROAS',
  current_bid: 'Current bid',
  time_greater_than: 'Time greater than',
  time_less_than: 'Time less than',
  daily_budget: 'Daily Budget',
  purchases: 'Purchases',
  ctr: 'CTR',
  leads_value: 'Leads Value',
  active_ads_in_adset: 'Active Ads in Adset',
}

interface MetricProps {
  selectedMetric: TypeMetric
  onMetricChange: (metric: TypeMetric) => void
  isComparison?: boolean
}

export const Metric = ({ selectedMetric, onMetricChange, isComparison }: MetricProps) => {
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
          }}
          p="md"
          bg="white"
          shadow="sm"
          radius="0"
          flex={1}
          onClick={() => metricCombobox.toggleDropdown()}
        >
          <Group align="center" gap={8}>
            {!isComparison ? <IconGripVertical size={20} style={{ color: 'var(--mantine-color-gray-5)' }} /> : null}

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
