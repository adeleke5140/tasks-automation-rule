import { Box, Button, Stack } from '@mantine/core'
import { useState } from 'react'
import { Header } from './components/header'
import { TaskItem } from './components/task-item'
import { IconPlus } from '@tabler/icons-react'

interface Task {
  id: string
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([{ id: '1' }])

  const addTask = () => {
    setTasks((prev) => [...prev, { id: (prev.length + 1).toString() }])
  }

  return (
    <Box p="xl" style={{ maxWidth: 1144, margin: '0 auto' }}>
      <Stack gap="xl">
        <Header />

        <Stack gap={'md'}>
          {tasks.map((task) => (
            <TaskItem key={task.id} />
          ))}
        </Stack>

        <Box>
          <Button variant="filled" bg="gray.1" c="black" leftSection={<IconPlus size={16} />} onClick={addTask}>
            Task
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}

export default App
