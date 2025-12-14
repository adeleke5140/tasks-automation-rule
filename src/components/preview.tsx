import { Box, Group, Stack, Text } from '@mantine/core'
import { useAppSelector } from '../store/hooks'
import { getObjectTypeDisplay } from '../store/slices/actionSlice'
import { metricLabels, operatorLabels, rangeLabels } from '../utils/labels'
import classes from './preview.module.scss'
import type { Condition, RuleItem } from './task-item'

const getValueBasedText = (item: RuleItem) => {
  if (!item.payload.valueBased) return ''
  const { metric, range, operator, value } = item.payload.valueBased
  return `${metricLabels[metric] || metric} ${rangeLabels[range] || range} ${operatorLabels[operator] || operator} ${value}`
}

const getMetricBasedText = (item: RuleItem) => {
  if (!item.payload.metricBased) return ''
  const { metric, comparisonMetric, operator, comparisonMetricWeight, comparisonMetricRange } = item.payload.metricBased
  const baseMetric = metricLabels[metric] || metric
  const comparison = comparisonMetric ? metricLabels[comparisonMetric] || comparisonMetric : ''
  const op = operatorLabels[operator] || operator
  const range = comparisonMetricRange ? rangeLabels[comparisonMetricRange] || comparisonMetricRange : ''
  return `${baseMetric} is ${comparisonMetricWeight}% ${op} than ${comparison} ${range}`
}

const getConditionText = (item: RuleItem) => {
  return item.ruleType === 'valueBased' ? getValueBasedText(item) : getMetricBasedText(item)
}

const RenderGroup = ({ item, depth }: { item: Condition; depth: number }) => {
  if (item.type !== 'group') return null
  return (
    <Box key={item.id}>
      <Text size="sm" fw={500} c="gray.7" ml={depth * 10} mb="xs">
        {item.relation}
      </Text>
      <RenderConditionTree items={item.children} depth={depth + 1} />
    </Box>
  )
}

const RenderCondition = ({ item, depth }: { item: Condition; depth: number }) => {
  if (item.type !== 'condition') return null
  return (
    <Box key={item.id} className={classes.conditionItem} ml={depth * 10}>
      <Text size="sm" c="gray.7">
        {getConditionText(item)}
      </Text>
    </Box>
  )
}

const RenderConditionTree = ({ items, depth = 0 }: { items: Array<Condition>; depth?: number }) => {
  return (
    <Stack gap="xs">
      {items.map((item) =>
        item.type === 'group' ? (
          <RenderGroup key={item.id} item={item} depth={depth} />
        ) : (
          <RenderCondition key={item.id} item={item} depth={depth} />
        )
      )}
    </Stack>
  )
}

export const Preview = () => {
  const conditions = useAppSelector((state) => state.conditions.conditions)
  const selectedAction = useAppSelector((state) => state.action.selectedAction)
  const objectType = useAppSelector((state) => state.action.objectType)

  const actionDisplay = selectedAction.replace(/_/g, ' ')

  if (conditions.length === 0) {
    return (
      <Text size="sm" c="dimmed" ta="center" py="lg">
        No conditions to preview
      </Text>
    )
  }

  const hasTopLevelGroup = conditions.length === 1 && conditions[0].type === 'group'
  const relation = hasTopLevelGroup && conditions[0].type === 'group' ? conditions[0].relation : 'and'
  const itemsToRender = hasTopLevelGroup && conditions[0].type === 'group' ? conditions[0].children : conditions

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

      <Box pl={12} className={classes.previewContainer}>
        <Text size="sm" fw={500} c="gray.7" mb="xs">
          {relation}
        </Text>
        <RenderConditionTree items={itemsToRender} depth={1} />
      </Box>
    </Stack>
  )
}
