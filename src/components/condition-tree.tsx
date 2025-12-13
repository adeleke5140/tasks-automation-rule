import { SimpleGrid, Stack } from '@mantine/core'
import { RelationConnector } from './relation-connector'
import { RuleUnitForm } from './rule/rule-unit-form'
import type { Condition } from './task-item'

type ConditionTreeProps = {
  cond: Condition
  selectionIds: Set<string>
  onToggleSelection: (item: string) => void
  isSelectable: boolean
}

export const ConditionTree = ({ cond, selectionIds, onToggleSelection, isSelectable }: ConditionTreeProps) => {
  if (cond.type === 'condition') {
    const deleteCondition = (id: string) => {
      console.log('deleted', id)
    }

    return (
      <RuleUnitForm
        id={cond.id}
        indicatorColor=""
        onDelete={(id) => deleteCondition(id)}
        ruleType={cond.ruleType}
        payload={cond.payload[cond.ruleType]}
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
      <RelationConnector connectionType={cond.relation} />
      <Stack component={'div'} gap="md" style={{ flex: 1, marginLeft: '25px' }} data-relation="true">
        {cond.children.map((item, i) => {
          return (
            <ConditionTree
              key={i}
              cond={item}
              selectionIds={selectionIds}
              onToggleSelection={onToggleSelection}
              isSelectable={isSelectable}
            />
          )
        })}
      </Stack>
    </SimpleGrid>
  )
}
