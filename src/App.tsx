import { Box, Button, Stack } from '@mantine/core'
import { Header } from './components/header'
import { TaskItem } from './components/task-item'

function App() {
  return (
    <Box p="xl" style={{ maxWidth: 1144, margin: '0 auto' }}>
      <Stack gap="xl">
        <Header />

        <TaskItem />
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
