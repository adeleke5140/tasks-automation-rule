import { Box, Button, Paper, Stack } from '@mantine/core'
import { Header } from './components/header'
import { RuleUnitForm } from './components/rule-unit-form'

function App() {
  return (
    <Box p="xl" style={{ maxWidth: 1400, margin: '0 auto' }}>
      <Stack gap="xl">
        <Header />

        <Paper p="lg" bg="m-pink.0" radius="md">
          <RuleUnitForm />
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
