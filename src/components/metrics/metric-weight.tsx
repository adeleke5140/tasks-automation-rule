import { Paper } from '@mantine/core'
import styles from './metric-weight.module.scss'

export const MetricWeight = ({
  weight,
  onWeightChange,
}: {
  weight: number
  onWeightChange: (item: number) => void
}) => {
  return (
    <Paper p="md" bg="white" shadow="sm" radius="0" w={80} className={styles.weightPaper}>
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
        className={styles.weightInput}
      />
    </Paper>
  )
}
