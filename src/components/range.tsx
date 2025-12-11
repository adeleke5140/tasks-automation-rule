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
  isComparison?: boolean
}

export const Range = ({ selectedRange, onRangeChange, children, isComparison }: RangeProps) => {
  const rangeCombobox = useCombobox()

  const rangeOptions: TypeRange[] = ['yesterday', 'today', 'last_3_days', 'last_7_days', 'last_15_days', 'last_30_days']

  return (
    <Paper
      p="md"
      bg="white"
      shadow="sm"
      radius="0"
      flex={1}
      style={{ borderRight: isComparison ? '' : '1px solid #c6c6c6' }}
    >
      <Group align="center" justify="space-between" gap={0} flex={1}>
        <Combobox
          store={rangeCombobox}
          onOptionSubmit={(value) => {
            onRangeChange(value as TypeRange)
            rangeCombobox.closeDropdown()
          }}
        >
          <Combobox.Target>
            <Group
              onClick={() => rangeCombobox.toggleDropdown()}
              justify="space-between"
              wrap="nowrap"
              gap="xs"
              flex={1}
            >
              <Text size="sm" c="gray.7">
                {rangeLabels[selectedRange]}
              </Text>
              <IconChevronDown size={16} color="var(--mantine-color-gray-5)" />
            </Group>
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
        <Group wrap="nowrap" gap="xs">
          {children}
        </Group>
      </Group>
    </Paper>
  )
}
