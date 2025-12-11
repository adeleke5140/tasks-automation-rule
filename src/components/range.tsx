import { Combobox, Group, Paper, Text, useCombobox } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import type { TypeRange } from '../types/client'

const rangeLabels: Record<TypeRange, string> = {
  yesterday: 'Yesterday',
  today: 'Today',
  last_3_days: 'Last 3 days',
  last_7_days: 'Last 7 days',
  last_15_days: 'Last 15 days',
  last_30_days: 'Last 30 days',
}

interface RangeProps {
  selectedRange: TypeRange
  onRangeChange: (value: TypeRange) => void
  children?: React.ReactNode
}

export const Range = ({ selectedRange, onRangeChange, children }: RangeProps) => {
  const rangeCombobox = useCombobox()

  const rangeOptions: TypeRange[] = ['yesterday', 'today', 'last_3_days', 'last_7_days', 'last_15_days', 'last_30_days']

  return (
    <Paper>
      <Group align="center" justify="space-between" gap={8}>
        <Combobox
          store={rangeCombobox}
          onOptionSubmit={(value) => {
            onRangeChange(value as TypeRange)
            rangeCombobox.closeDropdown()
          }}
        >
          <Combobox.Target>
            <Paper
              p="md"
              bg="white"
              shadow="sm"
              radius="0"
              style={{ flex: 1, cursor: 'pointer', borderRight: '1px solid #C6C6C6' }}
              onClick={() => rangeCombobox.toggleDropdown()}
            >
              <Group justify="space-between" wrap="nowrap" gap="xs">
                <Text size="sm" c="gray.7">
                  {rangeLabels[selectedRange]}
                </Text>
                <IconChevronDown size={16} color="var(--mantine-color-gray-5)" />
              </Group>
            </Paper>
          </Combobox.Target>

          <Combobox.Dropdown>
            <Combobox.Options>
              {rangeOptions.map((option) => (
                <Combobox.Option value={option} key={option}>
                  <Text size="sm" c={selectedRange === option ? 'black' : 'gray.7'}>
                    {rangeLabels[option]}
                  </Text>
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
        {children}
      </Group>
    </Paper>
  )
}
