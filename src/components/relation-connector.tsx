import { Box, Group, Text } from '@mantine/core'
import type { TypeRuleUnit } from '../types/client'

export const RelationConnector = ({
  connectionType,
}: {
  connectionType: TypeRuleUnit['relation']
  setConnectionType: (item: TypeRuleUnit['relation']) => void
}) => {
  return (
    <Box
      component="button"
      type="button"
      mr={0}
      p="sm"
      style={{ borderRadius: '4px', zIndex: 2, border: 'transparent' }}
      bg={connectionType === 'and' ? 'm-blue.6' : 'm-orange.3'}
      w={'fit-content'}
      onClick={() => {}}
    >
      <Group gap={0} dir="row" align="center" justify="center" h={'100%'}>
        <Text
          style={{
            writingMode: 'vertical-lr',
            transform: 'rotate(180deg)',
          }}
          c="white"
          fw={500}
        >
          + {connectionType?.toUpperCase()}
        </Text>
      </Group>
    </Box>
  )
}
