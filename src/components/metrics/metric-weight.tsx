import { Paper } from '@mantine/core'
import { useState } from 'react'

export const MetricWeight = () => {
  const [weight, setWeight] = useState('')

  return (
    <Paper
      p="md"
      bg="white"
      shadow="sm"
      radius="0"
      w={80}
      style={{ minWidth: 40, display: 'flex', alignItems: 'center', gap: '8px', borderRight: '1px solid #C6C6C6' }}
    >
      {/* //fix this */}
      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        placeholder="0"
        style={{
          border: 'none',
          outline: 'none',
          background: 'transparent',
          color: 'var(--mantine-color-gray-7)',
          fontSize: 'var(--mantine-font-size-sm)',
          padding: 0,
          flex: 1,
          minWidth: 0,
        }}
      />
    </Paper>
  )
}
