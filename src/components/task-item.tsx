import { Button, Group, Paper, Stack, Tabs } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import type { TypeRuleUnit } from '../types/client'
import { Action } from './action'
import { ConditionTree } from './condition-tree'
import { Preview } from './preview'
import { notifications } from '@mantine/notifications'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { addCondition, createNestedGroup } from '../store/slices/conditionsSlice'
import { clearSelection } from '../store/slices/selectionSlice'
import classes from './task-item.module.scss'

export type Relation = TypeRuleUnit['relation']

export type RuleItem = TypeRuleUnit & {
  id: string
  type: 'condition'
}

export type Group = { id: string; type: 'group'; relation: Relation; children: Array<Condition> }

export type Condition = Group | RuleItem

export const TaskItem = () => {
  const dispatch = useAppDispatch()
  const conditions = useAppSelector((state) => state.conditions.conditions)
  const selectedIds = useAppSelector((state) => state.selection.selectedIds)

  const handleAddCondition = () => {
    dispatch(addCondition())
  }

  const handleCreateGroup = () => {
    if (selectedIds.length >= 2) {
      dispatch(createNestedGroup(selectedIds))
      dispatch(clearSelection())
    } else {
      notifications.show({
        title: 'Group requires multiple conditions',
        message: 'Select at least 2 conditions to create a group',
      })
    }
  }

  return (
    <Paper p="xl" bg="m-pink.0" radius="md" className={classes.paper}>
      <Stack gap="lg">
        <Stack>
          <Action />
          {conditions.map((cond) => (
            <ConditionTree key={cond.id} cond={cond} />
          ))}
        </Stack>

        <Group justify="space-between" ml={-18} align="start">
          <Group gap="xs">
            <Button
              variant="subtle"
              fw={400}
              size="md"
              color="black"
              leftSection={<IconPlus size={16} />}
              onClick={handleAddCondition}
            >
              Condition
            </Button>
            <Button
              onClick={handleCreateGroup}
              variant="subtle"
              fw="400"
              size="md"
              color="black"
              leftSection={<IconPlus size={16} />}
            >
              Group
            </Button>
          </Group>

          <Tabs
            defaultValue="preview"
            variant="default"
            classNames={{ tab: classes.tab }}
          >
            <Tabs.List>
              <Tabs.Tab value="preview">Preview</Tabs.Tab>
              <Tabs.Tab value="description">Description</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="preview" pt="md">
              <Preview />
            </Tabs.Panel>

            <Tabs.Panel value="description" pt="md">
              <div>Description content placeholder</div>
            </Tabs.Panel>
          </Tabs>
        </Group>
      </Stack>
    </Paper>
  )
}
