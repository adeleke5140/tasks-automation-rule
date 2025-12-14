import { Paper } from '@mantine/core'

export const MetricWeight = ({
  weight,
  onWeightChange,
}: {
  weight: number
  onWeightChange: (item: number) => void
}) => {
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
        onChange={(e) => {
          const value = e.target.value
          if (value === '') {
            onWeightChange(0)
          } else {
            const numValue = parseFloat(value)
            if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
              onWeightChange(numValue)
            }
          }
        }}
        min="0"
        max="100"
        step="0.1"
        placeholder="0"
        aria-label="Weight"
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
