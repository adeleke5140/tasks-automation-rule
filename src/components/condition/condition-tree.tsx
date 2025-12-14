import { SimpleGrid, Stack } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { RelationConnector } from './relation-connector'
import { RuleUnitForm } from '@/components/rule/rule-unit-form'
import { GroupMenu } from './group-menu'
import type { Condition } from '@/components/task/task-item'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  deleteCondition,
  ungroupGroup,
  duplicateGroup,
  deleteGroup,
  selectTaskConditions,
} from '@/store/slices/conditionsSlice'
import { toggleSelection, isIdSelected } from '@/store/slices/selectionSlice'
import classes from './condition-tree.module.scss'

type ConditionTreeProps = {
  cond: Condition
  taskId: string
  isNested?: boolean
}

export const ConditionTree = ({ cond, taskId, isNested = false }: ConditionTreeProps) => {
  const dispatch = useAppDispatch()
  const isSelected = useAppSelector((state) => isIdSelected(state, taskId, cond.id))
  const totalConditions = useAppSelector((state) => {
    let count = 0
    const countConditions = (items: Array<Condition>) => {
      items.forEach((item) => {
        if (item.type === 'condition') count++
        else countConditions(item.children)
      })
    }
    const conditions = selectTaskConditions(state, taskId)
    countConditions(conditions)
    return count
  })

  if (cond.type === 'condition') {
    const handleDelete = (id: string) => {
      if (totalConditions <= 1) {
        notifications.show({
          title: 'Cannot delete',
          message: 'At least one condition must remain',
          color: 'red',
        })
        return
      }
      dispatch(deleteCondition({ taskId, conditionId: id }))
    }

    const handleToggleSelection = () => {
      dispatch(toggleSelection({ taskId, conditionId: cond.id }))
    }

    return (
      <RuleUnitForm
        id={cond.id}
        taskId={taskId}
        onDelete={handleDelete}
        ruleType={cond.ruleType}
        payload={cond.payload[cond.ruleType]}
        isSelectable={true}
        isSelected={isSelected}
        onToggleSelection={handleToggleSelection}
      />
    )
  }

  const showConnector = cond.children.length >= 2

  if (!showConnector) {
    return (
      <Stack component={'div'} gap="md">
        {cond.children.map((item) => {
          return <ConditionTree key={item.id} cond={item} taskId={taskId} isNested={item.type === 'group'} />
        })}
      </Stack>
    )
  }

  return (
    <SimpleGrid
      styles={{
        root: {
          gridTemplateColumns: '40px 1fr',
          gap: 0,
        },
      }}
    >
      <RelationConnector relation={cond.relation} groupId={cond.id} taskId={taskId}>
        {isNested && (
          <GroupMenu
            onDuplicate={() => dispatch(duplicateGroup({ taskId, groupId: cond.id }))}
            onUngroup={() => dispatch(ungroupGroup({ taskId, groupId: cond.id }))}
            onDelete={() => dispatch(deleteGroup({ taskId, groupId: cond.id }))}
          />
        )}
      </RelationConnector>
      <Stack component={'div'} gap="md" className={classes.childrenStack} data-relation="true">
        {cond.children.map((item) => {
          return <ConditionTree key={item.id} cond={item} taskId={taskId} isNested={item.type === 'group'} />
        })}
      </Stack>
    </SimpleGrid>
  )
}
