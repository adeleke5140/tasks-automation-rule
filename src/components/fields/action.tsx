import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectTaskAction, selectTaskObjectType, setObjectType, setSelectedAction } from '@/store/slices/actionSlice'
import type { TypeTask as TypeTaskType } from '@/types/client'
import { Box, Combobox, Group, InputBase, Menu, Text, useCombobox } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'

type Action = TypeTaskType['action']
type ObjectType = TypeTaskType['objectType']

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

const objectTypeLabels: Record<ObjectType, string> = {
  campaign: 'Campaign',
  adset: 'Ad Set',
  ad: 'Ad',
}

interface ActionProps {
  taskId: string
}

export const Action = ({ taskId }: ActionProps) => {
  const combobox = useCombobox()
  const dispatch = useAppDispatch()
  const selectedAction = useAppSelector((state) => selectTaskAction(state, taskId))
  const objectType = useAppSelector((state) => selectTaskObjectType(state, taskId))

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
        dispatch(setSelectedAction({ taskId, action: value as Action }))
        combobox.closeDropdown()
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          styles={{
            wrapper: {
              width: '350px',
              cursor: 'pointer',
              height: '60px',
            },
            input: {
              height: '60px',
            },
          }}
          style={{ width: 350, cursor: 'pointer' }}
          onClick={() => combobox.toggleDropdown()}
        >
          <Group justify="space-between" wrap="nowrap">
            <Box>
              <Text size="lg" fw={500} c="m-blue.6">
                {actionLabels[selectedAction || 'pause']}
              </Text>
              <Box onClick={(e) => e.stopPropagation()}>
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <Text size="sm" c="gray.6" style={{ cursor: 'pointer' }}>
                      {objectTypeLabels[objectType || 'adset']} ▾
                    </Text>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item onClick={() => dispatch(setObjectType({ taskId, objectType: 'campaign' }))}>
                      Campaign
                    </Menu.Item>
                    <Menu.Item onClick={() => dispatch(setObjectType({ taskId, objectType: 'adset' }))}>
                      Ad Set
                    </Menu.Item>
                    <Menu.Item onClick={() => dispatch(setObjectType({ taskId, objectType: 'ad' }))}>Ad</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Box>
            </Box>
            <IconChevronDown size={20} color="var(--mantine-color-gray-7)" />
          </Group>
        </InputBase>
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
