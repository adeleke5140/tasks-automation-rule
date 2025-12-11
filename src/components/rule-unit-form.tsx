import { Button, Group, Stack, Tabs } from '@mantine/core'
import { Metric } from './metric'
import { Operator } from './operator'
import { Range } from './range'
import { Task } from './task'
import { Value } from './value'
import { useState } from 'react'
import type { TypeMetric } from '../types/client'

export const RuleUnitForm = () => {
  const [selectedMetric, setSelectedMetric] = useState<TypeMetric>('spend')

  return (
    <Stack gap="lg">
      <Task />

      <Group gap={0} wrap="nowrap">
        <Metric selectedMetric={selectedMetric} onMetricChange={setSelectedMetric} />

        <Range />

        <Operator />

        <Value selectedMetric={selectedMetric} />
      </Group>

      <Group justify="space-between" align="center">
        <Group gap="md">
          <Button variant="subtle" color="gray" leftSection={<span>+</span>}>
            Condition
          </Button>
          <Button variant="subtle" color="gray" leftSection={<span>+</span>}>
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
  )
}
