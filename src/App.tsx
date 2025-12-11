import { Box, Button, Group, Paper, Stack, Tabs } from '@mantine/core'
import { useState } from 'react'
import { Connector } from './components/connector'
import { Header } from './components/header'
import { RuleUnitForm } from './components/rule-unit-form'

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

  const toggleConnector = (index: number) => {
    const updatedConditions = [...conditions]
    if (updatedConditions[index].connectorType) {
      updatedConditions[index].connectorType = updatedConditions[index].connectorType === 'AND' ? 'OR' : 'AND'
      setConditions(updatedConditions)
    }
  }

  return (
    <Box p="xl" style={{ maxWidth: 1144, margin: '0 auto' }}>
      <Stack gap="xl">
        <Header />

        <Paper p="lg" bg="m-pink.0" radius="md">
          <Stack gap="lg">
            {conditions.map((condition, index) => (
              <Stack key={condition.id} gap="lg">
                {index > 0 && (
                  <Group gap={0} style={{ paddingLeft: '20px' }}>
                    <Connector type={condition.connectorType || 'AND'} onToggle={() => toggleConnector(index)} />
                  </Group>
                )}
                <RuleUnitForm showTask={index === 0} showIndicator={index > 0} indicatorColor="#3B82F6" />
              </Stack>
            ))}

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
