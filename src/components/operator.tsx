import { Combobox, Group, Paper, Text, useCombobox } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import { useState } from 'react'
import type { TypeOperator } from '../types/client'

const operatorLabels: Record<TypeOperator, string> = {
  lt: '<',
  lte: '≤',
  gt: '>',
  gte: '≥',
  eq: '=',
  ne: '≠',
}

const operatorDropdownLabels: Record<TypeOperator, string> = {
  gt: '> greater than',
  lt: '< less than',
  lte: '≤ less than or equal',
  gte: '≥ greater than or equal',
  eq: '= equals',
  ne: '≠ does not equal',
}

export const Operator = () => {
  const operatorCombobox = useCombobox()
  const [selectedOperator, setSelectedOperator] = useState<TypeOperator>('gt')

  const operatorOptions: TypeOperator[] = ['lt', 'lte', 'gt', 'gte', 'eq', 'ne']

  return (
    <Combobox
      store={operatorCombobox}
      onOptionSubmit={(value) => {
        setSelectedOperator(value as TypeOperator)
        operatorCombobox.closeDropdown()
      }}
    >
      <Combobox.Target>
        <Paper
          p="md"
          radius="0"
          bg="white"
          shadow="sm"
          style={{ minWidth: 60, textAlign: 'center', cursor: 'pointer', borderRight: '1px solid #C6C6C6' }}
          onClick={() => operatorCombobox.toggleDropdown()}
        >
          <Group justify="center" wrap="nowrap" gap="xs">
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
