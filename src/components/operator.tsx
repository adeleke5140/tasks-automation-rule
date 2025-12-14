import { Combobox, Group, Paper, Text, useCombobox } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import type { TypeOperator } from '../types/client'
import { operatorLabels } from '../utils/labels'

const operatorDropdownLabels: Record<TypeOperator, string> = {
  gt: '> greater than',
  lt: '< less than',
  lte: '≤ less than or equal',
  gte: '≥ greater than or equal',
  eq: '= equals',
  ne: '≠ does not equal',
}

export const Operator = ({
  selectedOperator,
  onOperatorChange,
}: {
  selectedOperator: TypeOperator
  onOperatorChange: (item: TypeOperator) => void
}) => {
  const operatorCombobox = useCombobox()

  const operatorOptions: TypeOperator[] = ['lt', 'lte', 'gt', 'gte', 'eq', 'ne']

  return (
    <Combobox
      store={operatorCombobox}
      onOptionSubmit={(value) => {
        onOperatorChange(value as TypeOperator)
        operatorCombobox.closeDropdown()
      }}
    >
      <Combobox.Target>
        <Paper
          p="md"
          radius="0"
          bg="white"
          shadow="sm"
          w={100}
          style={{ textAlign: 'center', cursor: 'pointer', borderRight: '1px solid #C6C6C6' }}
          onClick={() => operatorCombobox.toggleDropdown()}
        >
          <Group px={0} justify="space-between" wrap="nowrap" gap="xs">
            <Text size="sm" c="gray.7">
              {operatorLabels[selectedOperator]}
            </Text>
            <IconChevronDown size={16} color="var(--mantine-color-gray-5)" />
          </Group>
        </Paper>
      </Combobox.Target>

      <Combobox.Dropdown style={{ minWidth: 250 }}>
        <Combobox.Options>
          {operatorOptions.map((option) => (
            <Combobox.Option value={option} key={option} style={{ padding: '12px 16px' }}>
              <Text size="md" c="gray.7">
                {operatorDropdownLabels[option]}
              </Text>
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}
