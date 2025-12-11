import { Button, Stack } from '@mantine/core'

type ConnectorType = 'AND' | 'OR'

interface ConnectorProps {
  type: ConnectorType
  onToggle: () => void
}

export const Connector = ({ type, onToggle }: ConnectorProps) => {
  return (
    <Stack gap={0} align="center" style={{ position: 'relative' }}>
      <Button
        onClick={onToggle}
        size="compact-md"
        variant="filled"
        color="m-blue"
        style={{
          borderRadius: '4px',
          padding: '4px 12px',
          height: '28px',
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '0.5px',
        }}
      >
        {type}
      </Button>
    </Stack>
  )
}