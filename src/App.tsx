import { Box, Button, Stack } from '@mantine/core'
import { Header } from '@/components/header'
import { TaskItem } from '@/components/task/task-item'
import { IconPlus } from '@tabler/icons-react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { addTask, selectAllTaskIds } from '@/store/slices/tasksSlice'

function App() {
  const dispatch = useAppDispatch()
  const taskIds = useAppSelector(selectAllTaskIds)

  const handleAddTask = () => {
    dispatch(addTask())
  }

  return (
    <Box p="xl" style={{ maxWidth: 1144, margin: '0 auto' }}>
      <Stack gap="xl">
        <Header />

        <Stack gap={'md'}>
          {taskIds.map((taskId) => (
            <TaskItem key={taskId} taskId={taskId} />
          ))}
        </Stack>

        <Box>
          <Button variant="filled" bg="gray.1" c="black" leftSection={<IconPlus size={16} />} onClick={handleAddTask}>
            Task
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}

export default App
