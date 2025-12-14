import { Box, Group, Stack, Text } from '@mantine/core'
import { useAppSelector } from '@/store/hooks'
import { selectTaskConditions } from '@/store/slices/conditionsSlice'
import { selectTaskAction, selectTaskObjectType, getObjectTypeDisplay } from '@/store/slices/actionSlice'
import { metricLabels, operatorLabels, rangeLabels } from '@/utils/labels'
import classes from './preview.module.scss'
import type { Condition, RuleItem } from '@/components/task/types'

interface PreviewProps {
  taskId: string
}

const getValueBasedText = (item: RuleItem) => {
  if (!item.payload.valueBased) return ''
  const { metric, range, operator, value } = item.payload.valueBased
  return `${metricLabels[metric] || metric} ${rangeLabels[range] || range} ${operatorLabels[operator] || operator} ${value}`
}

const getMetricBasedText = (item: RuleItem) => {
  if (!item.payload.metricBased) return ''
  const { metric, range, comparisonMetric, operator, comparisonMetricWeight, comparisonMetricRange } =
    item.payload.metricBased

  const baseMetric = metricLabels[metric] || metric || 'cost'
  const baseRange = rangeLabels[range] || range || ''
  const comparison = metricLabels[comparisonMetric] || comparisonMetric || 'cost'
  const op = operatorLabels[operator] || operator || 'eq'
  const weight = comparisonMetricWeight ?? 0
  const compRange = rangeLabels[comparisonMetricRange] || comparisonMetricRange || 'last_30_days'

  return `${baseMetric} ${baseRange} is ${weight}% ${op} than ${comparison} ${compRange}`
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

export const Preview = ({ taskId }: PreviewProps) => {
  const conditions = useAppSelector((state) => selectTaskConditions(state, taskId))
  const selectedAction = useAppSelector((state) => selectTaskAction(state, taskId))
  const objectType = useAppSelector((state) => selectTaskObjectType(state, taskId))

  const actionDisplay = (selectedAction || 'pause').replace(/_/g, ' ')

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
          ({getObjectTypeDisplay(objectType || 'adset')})
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
