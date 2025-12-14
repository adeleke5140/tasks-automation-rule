import { Combobox, Group, Paper, Text, useCombobox } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import type { TypeRange } from '@/types/client'
import { rangeLabels } from '@/utils/labels'

interface RangeProps {
  selectedRange: TypeRange
  onRangeChange: (value: TypeRange) => void
  isComparison?: boolean
}

export const Range = ({ selectedRange, onRangeChange, isComparison }: RangeProps) => {
  const rangeCombobox = useCombobox()

  const rangeOptions: TypeRange[] = ['yesterday', 'today', 'last_3_days', 'last_7_days', 'last_15_days', 'last_30_days']

  return (
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
          flex={1}
          onClick={() => rangeCombobox.toggleDropdown()}
          style={{ borderRight: isComparison ? '' : '1px solid #c6c6c6' }}
        >
          <Group justify="space-between" wrap="nowrap" gap="xs" flex={1}>
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
  )
}
