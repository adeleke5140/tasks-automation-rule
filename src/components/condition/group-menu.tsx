import { ActionIcon, Menu } from '@mantine/core'
import { IconDots, IconCopy, IconUnlink, IconTrash } from '@tabler/icons-react'

interface GroupMenuProps {
  onDuplicate: () => void
  onUngroup: () => void
  onDelete: () => void
}

export const GroupMenu = ({ onDuplicate, onUngroup, onDelete }: GroupMenuProps) => {
  return (
    <Menu position="right-start" shadow="md" width={200} offset={20}>
      <Menu.Target>
        <ActionIcon variant="subtle" color="white" size="sm" onClick={(e) => e.stopPropagation()}>
          <IconDots size={18} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item leftSection={<IconCopy size={16} />} onClick={onDuplicate}>
          Duplicate
        </Menu.Item>
        <Menu.Item leftSection={<IconUnlink size={16} />} onClick={onUngroup}>
          Ungroup
        </Menu.Item>
        <Menu.Item leftSection={<IconTrash size={16} />} color="red" onClick={onDelete}>
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
