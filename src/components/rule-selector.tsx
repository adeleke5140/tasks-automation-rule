import { ActionIcon, Group, Menu, Text } from '@mantine/core'
import { IconCheck, IconSettings, IconTrash } from '@tabler/icons-react'

interface RuleSelectorProps {
  ruleType: 'valueBased' | 'metricBased'
  setRuleType: (ruleType: 'valueBased' | 'metricBased') => void
  onDelete?: () => void
}

export const RuleSelector = ({ ruleType, setRuleType, onDelete }: RuleSelectorProps) => {
  return (
    <Group>
      <Menu position="bottom-end" shadow="md">
        <Menu.Target>
          <ActionIcon variant="subtle" color="gray" size="sm">
            <IconSettings size={18} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Compare with</Menu.Label>
          <Menu.Item
            onClick={() => setRuleType('valueBased')}
            rightSection={
              ruleType === 'valueBased' ? <IconCheck size={16} color="var(--mantine-color-m-blue-6)" /> : null
            }
          >
            <Text size="sm" fw={500} c={ruleType === 'valueBased' ? 'm-blue.6' : 'gray.7'}>
              Value
            </Text>
          </Menu.Item>
          <Menu.Item
            onClick={() => setRuleType('metricBased')}
            rightSection={
              ruleType === 'metricBased' ? <IconCheck size={16} color="var(--mantine-color-m-blue-6)" /> : null
            }
          >
            <Text size="sm" fw={500} c={ruleType === 'metricBased' ? 'm-blue.6' : 'gray.7'}>
              Metric
            </Text>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      {onDelete && (
        <ActionIcon variant="subtle" color="gray" size="sm" onClick={onDelete}>
          <IconTrash size={18} />
        </ActionIcon>
      )}
    </Group>
  )
}
