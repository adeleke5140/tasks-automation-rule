import { Box, Combobox, Group, Paper, Text, useCombobox } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import type { TypeTask as TypeTaskType } from '../types/client'
import { useState } from 'react'

type Action = TypeTaskType['action']

const actionLabels: Record<Action, string> = {
  pause: 'Pause',
  resume: 'Resume',
  increase_budget: 'Increase budget',
  decrease_budget: 'Decrease budget',
  extend_end_date_by_days: 'Extend end date by days',
  add_to_name: 'Add to name',
  remove_from_name: 'Remove from name',
  increase_bid: 'Increase bid',
  decrease_bid: 'Decrease bid',
  change_creative: 'Change creative',
  notify: 'Notify',
}

export const Task = () => {
  const combobox = useCombobox()
  const [selectedAction, setSelectedAction] = useState<Action>('pause')

  const actionOptions: Action[] = [
    'pause',
    'resume',
    'increase_budget',
    'decrease_budget',
    'extend_end_date_by_days',
    'add_to_name',
    'remove_from_name',
    'increase_bid',
    'decrease_bid',
    'change_creative',
    'notify',
  ]
  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(value) => {
        setSelectedAction(value as Action)
        combobox.closeDropdown()
      }}
    >
      <Combobox.Target>
        <Paper
          p="md"
          withBorder
          radius="md"
          style={{ width: 350, cursor: 'pointer' }}
          onClick={() => combobox.toggleDropdown()}
        >
          <Group justify="space-between" wrap="nowrap">
            <Box>
              <Text size="lg" fw={500} c="m-blue.6">
                {actionLabels[selectedAction]}
              </Text>
              <Text size="sm" c="gray.6">
                Ad Group
              </Text>
            </Box>
            <IconChevronDown size={20} color="var(--mantine-color-gray-7)" />
          </Group>
        </Paper>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {actionOptions.map((option) => (
            <Combobox.Option value={option} key={option}>
              <Text size="md" c="gray.7">
                {actionLabels[option]}
              </Text>
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}
