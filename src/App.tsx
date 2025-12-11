import { Box, Button, Group, Paper, SimpleGrid, Stack, Tabs, Text } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useState } from 'react'
import { Header } from './components/header'
import { RuleUnitForm } from './components/rule-unit-form'
import { Task } from './components/task'

type ConnectorType = 'AND' | 'OR'

interface Condition {
  id: string
  connectorType?: ConnectorType
}

function App() {
  const [conditions, setConditions] = useState<Condition[]>([{ id: '1' }])

  const addCondition = () => {
    setConditions((prev) => [...prev, { id: (prev.length + 1).toString(), connectorType: 'AND' }])
  }

  const deleteCondition = (id: string) => {
    if (conditions.length === 1) {
      notifications.show({
        title: 'Cannot delete',
        message: 'At least one condition must be present',
        color: 'red',
      })
      return
    }
    setConditions(conditions.filter((condition) => condition.id !== id))
  }

  const showConector = conditions.length > 1

  return (
    <Box p="xl" style={{ maxWidth: 1144, margin: '0 auto' }}>
      <Stack gap="xl">
        <Header />

        <Paper p="xl" bg="m-pink.0" radius="md">
          <Stack gap="lg">
            <Stack>
              <Task />
              <SimpleGrid
                styles={{
                  root: {
                    gridTemplateColumns: showConector ? '40px 1fr' : '',
                    gap: 0,
                  },
                }}
              >
                {showConector ? (
                  <Box
                    component="div"
                    mr={0}
                    p="sm"
                    style={{ borderRadius: '4px', zIndex: 2 }}
                    bg="m-blue.6"
                    w={'fit-content'}
                  >
                    <Group gap={0} dir="row" align="center" justify="center" h={'100%'}>
                      <Text
                        style={{
                          writingMode: 'vertical-lr',
                          transform: 'rotate(180deg)',
                        }}
                        c="white"
                        fw={500}
                      >
                        + AND
                      </Text>
                    </Group>
                  </Box>
                ) : null}

                <Stack gap="md" style={{ flex: 1, marginLeft: conditions.length > 1 ? '25px' : '' }}>
                  {conditions.map((condition) => (
                    <RuleUnitForm
                      key={condition.id}
                      showConnector={conditions.length > 1}
                      indicatorColor="#3B82F6"
                      onDelete={() => deleteCondition(condition.id)}
                    />
                  ))}
                </Stack>
              </SimpleGrid>
            </Stack>

            <Group justify="space-between" align="center">
              <Group gap="md">
                <Button variant="subtle" color="gray" leftSection={<span>+</span>} onClick={addCondition}>
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
        </Paper>

        <Box>
          <Button variant="subtle" color="gray" leftSection={<span>+</span>}>
            Task
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}

export default App
