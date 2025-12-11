import { Text, Title } from '@mantine/core'

import { Box } from '@mantine/core'

export const Header = () => {
  return (
    <Box>
      <Title order={2} fw={700}>
        Task
      </Title>
      <Text size="sm" c="dimmed">
        Microcopy required
      </Text>
    </Box>
  )
}
