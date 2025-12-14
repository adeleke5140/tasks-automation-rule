import { Box, Group, Text } from '@mantine/core'
import type { TypeRuleUnit } from '@/types/client'
import { useAppDispatch } from '@/store/hooks'
import { updateRelation } from '@/store/slices/conditionsSlice'

interface RelationConnectorProps {
  relation: TypeRuleUnit['relation']
  groupId: string
  children?: React.ReactNode
}

export const RelationConnector = ({ relation, groupId, children }: RelationConnectorProps) => {
  const dispatch = useAppDispatch()

  const handleToggleRelation = () => {
    if (!relation) return
    const newRelation = relation === 'and' ? 'or' : 'and'
    dispatch(updateRelation({ id: groupId, relation: newRelation }))
  }

  return (
    <Box
      component="button"
      type="button"
      pos="relative"
      mr={0}
      p="sm"
      style={{ borderRadius: '4px', zIndex: 2, border: 'transparent' }}
      bg={relation === 'and' ? 'm-blue.6' : 'm-orange.3'}
      w={'fit-content'}
      onClick={handleToggleRelation}
    >
      <Box pos={'absolute'}>{children}</Box>
      <Group gap={0} dir="row" align="center" justify="center" h={'100%'}>
        <Text
          style={{
            writingMode: 'vertical-lr',
            transform: 'rotate(180deg)',
          }}
          c="white"
          fw={500}
        >
          + {relation?.toUpperCase()}
        </Text>
      </Group>
    </Box>
  )
}
