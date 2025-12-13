import { SimpleGrid, Stack } from '@mantine/core'
import { RelationConnector } from './relation-connector'
import { RuleUnitForm } from './rule-unit-form'
import type { Condition } from './task-item'

type ConditionTreeProps = {
  cond: Condition
}

export const ConditionTree = ({ cond }: ConditionTreeProps) => {
  if (cond.type === 'condition') {
    //potential tightly coupling state and ui change
    const deleteCondition = (id: string) => {
      console.log('deleted', id)
      //   if (conditions.length === 1) {
      //     notifications.show({
      //       title: 'Cannot delete',
      //       message: 'At least one condition must be present',
      //       color: 'red',
      //     })
      //     return
      //   }
      //   setConditions(conditions.filter((condition) => condition.id !== id))
    }

    return (
      <RuleUnitForm
        id={cond.id}
        showConnector={true}
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
      <RelationConnector connectionType={cond.relation} setConnectionType={() => {}} />
      <Stack gap="md" style={{ flex: 1, marginLeft: '25px' }}>
        {cond.children.map((item, i) => {
          return <ConditionTree key={i} cond={item} />
        })}
      </Stack>
    </SimpleGrid>
  )
}
