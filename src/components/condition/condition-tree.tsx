import { SimpleGrid, Stack } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { RelationConnector } from './relation-connector'
import { RuleUnitForm } from '@/components/rule/rule-unit-form'
import { GroupMenu } from './group-menu'
import type { Condition } from '@/components/task/task-item'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { deleteCondition, ungroupGroup, duplicateGroup, deleteGroup } from '@/store/slices/conditionsSlice'
import { toggleSelection, isIdSelected } from '@/store/slices/selectionSlice'
import classes from './condition-tree.module.scss'

type ConditionTreeProps = {
  cond: Condition
  isNested?: boolean
}

export const ConditionTree = ({ cond, isNested = false }: ConditionTreeProps) => {
  const dispatch = useAppDispatch()
  const isSelected = useAppSelector((state) => isIdSelected(state, cond.id))
  const totalConditions = useAppSelector((state) => {
    let count = 0
    const countConditions = (items: Array<Condition>) => {
      items.forEach((item) => {
        if (item.type === 'condition') count++
        else countConditions(item.children)
      })
    }
    countConditions(state.conditions.conditions)
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
      dispatch(deleteCondition(id))
    }

    const handleToggleSelection = () => {
      dispatch(toggleSelection(cond.id))
    }

    return (
      <RuleUnitForm
        id={cond.id}
        onDelete={handleDelete}
        ruleType={cond.ruleType}
        payload={cond.payload[cond.ruleType]}
        isSelectable={true}
        isSelected={isSelected}
        onToggleSelection={handleToggleSelection}
      />
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
      <RelationConnector relation={cond.relation} groupId={cond.id}>
        {isNested && (
          <GroupMenu
            onDuplicate={() => dispatch(duplicateGroup(cond.id))}
            onUngroup={() => dispatch(ungroupGroup(cond.id))}
            onDelete={() => dispatch(deleteGroup(cond.id))}
          />
        )}
      </RelationConnector>
      <Stack component={'div'} gap="md" className={classes.childrenStack} data-relation="true">
        {cond.children.map((item) => {
          return <ConditionTree key={item.id} cond={item} isNested={item.type === 'group'} />
        })}
      </Stack>
    </SimpleGrid>
  )
}
