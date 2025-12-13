import { Button, Group, Paper, Stack, Tabs } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useState } from 'react'
import { sampleItem } from '../data/data'
import type { TypeRuleUnit } from '../types/client'
import { Action } from './action'
import { ConditionTree } from './condition-tree'
import { notifications } from '@mantine/notifications'

export type Relation = TypeRuleUnit['relation']

//Note to self: Extra discriminated union to fix edge case
export type RuleItem = TypeRuleUnit & {
  id: string
  type: 'condition'
}

export type Group = { id: string; type: 'group'; relation: Relation; children: Array<Condition> }

export type Condition = Group | RuleItem

export const TaskItem = () => {
  const [conditions, setConditions] = useState<Array<Condition>>([sampleItem])

  const addCondition = (conditions: Array<Condition>) => {
    const existingGroup = conditions.find((item) => item.type === 'group')
    console.log({ existingGroup })
    if (!existingGroup) {
      setConditions((prev) => [...prev, sampleItem])
      return
    }
    const updatedGroup = { ...existingGroup, children: [...existingGroup.children, sampleItem] }
    setConditions([updatedGroup])
  }

  const createGroup = (conditions: Array<Condition>) => {
    if (conditions.length <= 1) {
      return notifications.show({
        title: 'Group requires multiple conditions',
        message: 'Add a new condition to create a new group',
      })
    }
    const newGroup: Group = {
      id: (conditions.length + 1).toString(),
      type: 'group',
      relation: 'or',
      children: conditions,
    }
    setConditions([newGroup])
  }

  return (
    <Paper p="xl" bg="m-pink.0" radius="md">
      <Stack gap="lg">
        <Stack>
          <Action />
          {conditions.map((cond) => (
            <ConditionTree cond={cond} />
          ))}
        </Stack>

        <Group justify="space-between" align="center">
          <Group gap="xs">
            <Button
              variant="subtle"
              fw={400}
              size="md"
              color="black"
              leftSection={<IconPlus size={16} />}
              onClick={() => addCondition(conditions)}
            >
              Condition
            </Button>
            <Button
              onClick={() => createGroup(conditions)}
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
            styles={{
              tab: {
                '&[data-active]': {
                  backgroundColor: 'transparent',
                  color: 'var(--mantine-color-gray-9)',
                  borderBottom: '2px solid var(--mantine-color-gray-9)',
                },
              },
            }}
          >
            <Tabs.List>
              <Tabs.Tab value="preview">Preview</Tabs.Tab>
              <Tabs.Tab value="description">Description</Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </Group>
      </Stack>
    </Paper>
  )
}
