import { Box, Group, Text } from '@mantine/core'
import { useState } from 'react'
import type { TypeRuleUnit } from '../types/client'

interface RelationConnectorProps {
  connectionType: TypeRuleUnit['relation']
  groupId?: string
  children?: React.ReactNode
}

export const RelationConnector = ({ connectionType, children }: RelationConnectorProps) => {
  const [relation, setRelation] = useState(connectionType)
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
      onClick={() => {
        if (!relation) return
        if (relation === 'and') {
          setRelation('or')
        } else {
          setRelation('and')
        }
      }}
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
