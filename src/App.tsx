import { Box, Button, Stack } from '@mantine/core'
import { Header } from '@/components/header'
import { TaskItem } from '@/components/task/task-item'
import { IconPlus } from '@tabler/icons-react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { addTask, selectAllTaskIds } from '@/store/slices/tasksSlice'
import { ErrorBoundary, SectionErrorBoundary } from '@/components/ErrorBoundary'

function App() {
  const dispatch = useAppDispatch()
  const taskIds = useAppSelector(selectAllTaskIds)

  const handleAddTask = () => {
    dispatch(addTask())
  }

  return (
    <ErrorBoundary>
      <Box p="xl" style={{ maxWidth: 1144, margin: '0 auto' }}>
        <Stack gap="xl">
          <Header />

          <Stack gap={'md'}>
            {taskIds.map((taskId) => (
              <SectionErrorBoundary key={taskId} name={`Task ${taskId}`}>
                <TaskItem taskId={taskId} />
              </SectionErrorBoundary>
            ))}
          </Stack>

          <Box>
            <Button variant="filled" bg="gray.1" c="black" leftSection={<IconPlus size={16} />} onClick={handleAddTask}>
              Task
            </Button>
          </Box>
        </Stack>
      </Box>
    </ErrorBoundary>
  )
}

export default App
