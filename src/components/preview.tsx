import { Stack, Text, Box, Group } from '@mantine/core'
import { useAppSelector } from '../store/hooks'
import type { Condition } from './task-item'
import { selectAction, selectObjectType, getObjectTypeDisplay } from '../store/slices/actionSlice'
import { metricLabels, rangeLabels, operatorTextLabels } from '../utils/labels'

const RenderConditionTree = ({ items, depth = 0 }: { items: Array<Condition>; depth?: number }) => {
  return (
    <Stack gap="xs">
      {items.map((item) => {
        if (item.type === 'group') {
          return (
            <Box key={item.id}>
              <Text size="sm" fw={500} c="gray.7" ml={depth * 20} mb="xs">
                {item.relation}
              </Text>
              <RenderConditionTree items={item.children} depth={depth + 1} />
            </Box>
          )
        }

        let conditionText = ''
        if (item.ruleType === 'valueBased' && item.payload.valueBased) {
          const { metric, range, operator, value } = item.payload.valueBased
          conditionText = `${metricLabels[metric] || metric} ${rangeLabels[range] || range} ${operatorTextLabels[operator] || operator} ${value}`
        } else if (item.ruleType === 'metricBased' && item.payload.metricBased) {
          const { metric, comparisonMetric, operator, comparisonMetricWeight, comparisonMetricRange } = item.payload.metricBased
          const baseMetric = metricLabels[metric] || metric
          const comparison = comparisonMetric ? metricLabels[comparisonMetric] || comparisonMetric : ''
          const op = operatorTextLabels[operator] || operator
          const range = comparisonMetricRange ? rangeLabels[comparisonMetricRange] || comparisonMetricRange : ''
          conditionText = `${baseMetric} is ${comparisonMetricWeight}% ${op} than ${comparison} ${range}`
        }

        return (
          <Box
            key={item.id}
            style={{
              marginLeft: depth * 20 + 20,
              borderLeft: '3px solid #4C6EF5',
              paddingLeft: 12,
              paddingTop: 4,
              paddingBottom: 4,
            }}
          >
            <Text size="sm" c="gray.7">
              {conditionText}
            </Text>
          </Box>
        )
      })}
    </Stack>
  )
}

export const Preview = () => {
  const conditions = useAppSelector((state) => state.conditions.conditions)
  const selectedAction = useAppSelector(selectAction)
  const objectType = useAppSelector(selectObjectType)

  const actionDisplay = selectedAction.replace(/_/g, ' ')

  if (conditions.length === 0) {
    return (
      <Text size="sm" c="dimmed" ta="center" py="lg">
        No conditions to preview
      </Text>
    )
  }

  const hasTopLevelGroup = conditions.length === 1 && conditions[0].type === 'group'
  const topRelation = hasTopLevelGroup ? conditions[0].relation : 'and'

  return (
    <Stack gap="md" py="md">
      <Group gap="xs" align="flex-start">
        <Text size="sm" fw={600} c="gray.8">
          {actionDisplay} -
        </Text>
        <Text size="sm" c="gray.6">
          ({getObjectTypeDisplay(objectType)})
        </Text>
      </Group>

      <Box
        style={{
          borderLeft: '3px solid #4C6EF5',
          paddingLeft: 16,
        }}
      >
        {hasTopLevelGroup ? (
          <>
            <Text size="sm" fw={500} c="gray.7" mb="xs">
              {topRelation}
            </Text>
            {conditions[0].type === 'group' && <RenderConditionTree items={conditions[0].children} depth={1} />}
          </>
        ) : (
          <>
            <Text size="sm" fw={500} c="gray.7" mb="xs">
              and
            </Text>
            <RenderConditionTree items={conditions} depth={1} />
          </>
        )}
      </Box>
    </Stack>
  )
}