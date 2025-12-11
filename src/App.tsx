import {
  ActionIcon,
  Box,
  Button,
  Combobox,
  Group,
  Menu,
  Paper,
  Stack,
  Tabs,
  Text,
  Title,
  useCombobox,
} from "@mantine/core";
import {
  IconCheck,
  IconChevronDown,
  IconGripVertical,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";
import type { TypeTask } from "./types/client";

type Action = TypeTask["action"];

const actionLabels: Record<Action, string> = {
  pause: "Pause",
  resume: "Resume",
  increase_budget: "Increase budget",
  decrease_budget: "Decrease budget",
  extend_end_date_by_days: "Extend end date by days",
  add_to_name: "Add to name",
  remove_from_name: "Remove from name",
  increase_bid: "Increase bid",
  decrease_bid: "Decrease bid",
  change_creative: "Change creative",
  notify: "Notify",
};

function App() {
  const [selectedAction, setSelectedAction] = useState<Action>("pause");
  const [compareWith, setCompareWith] = useState<"Value" | "Metric">("Value");
  const combobox = useCombobox();

  const actionOptions: Action[] = [
    "pause",
    "resume",
    "increase_budget",
    "decrease_budget",
    "extend_end_date_by_days",
    "add_to_name",
    "remove_from_name",
    "increase_bid",
    "decrease_bid",
    "change_creative",
    "notify",
  ];

  return (
    <Box p="xl" style={{ maxWidth: 1200, margin: "0 auto" }}>
      <Stack gap="xl">
        <Box>
          <Title order={2} fw={700}>
            Task
          </Title>
          <Text size="sm" c="dimmed">
            Microcopy required
          </Text>
        </Box>

        <Paper p="lg" bg="m-pink.0" radius="md">
          <Stack gap="lg">
            <Combobox
              store={combobox}
              onOptionSubmit={(value) => {
                setSelectedAction(value as Action);
                combobox.closeDropdown();
              }}
            >
              <Combobox.Target>
                <Paper
                  p="md"
                  withBorder
                  radius="md"
                  style={{ width: 350, cursor: "pointer" }}
                  onClick={() => combobox.toggleDropdown()}
                >
                  <Group justify="space-between" wrap="nowrap">
                    <Box>
                      <Text size="lg" fw={500} c="m-blue.6">
                        {actionLabels[selectedAction]}
                      </Text>
                      <Text size="sm" c="gray.6">
                        Ad Group
                      </Text>
                    </Box>
                    <IconChevronDown
                      size={20}
                      color="var(--mantine-color-gray-7)"
                    />
                  </Group>
                </Paper>
              </Combobox.Target>

              <Combobox.Dropdown>
                <Combobox.Options>
                  {actionOptions.map((option) => (
                    <Combobox.Option value={option} key={option}>
                      <Text size="md" c="gray.7">
                        {actionLabels[option]}
                      </Text>
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </Combobox.Dropdown>
            </Combobox>

            <Box p="md" style={{ borderRadius: "8px" }}>
              <Group gap={0} wrap="nowrap">
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "8px",
                  }}
                >
                  <IconGripVertical
                    size={20}
                    style={{ color: "var(--mantine-color-gray-5)" }}
                  />
                  <Paper
                    p="md"
                    bg="white"
                    shadow="sm"
                    radius="0"
                    style={{ flex: 1 }}
                  >
                    <Text size="sm" fw={500}>
                      Cost
                    </Text>
                  </Paper>
                </Box>

                <Paper
                  p="md"
                  bg="white"
                  shadow="sm"
                  radius="0"
                  style={{ flex: 1 }}
                >
                  <Text size="sm" fw={500}>
                    Today
                  </Text>
                </Paper>

                <Paper
                  p="md"
                  radius="0"
                  bg="white"
                  shadow="sm"
                  style={{ minWidth: 60, textAlign: "center" }}
                >
                  <Text size="sm" fw={500}>
                    {">"}
                  </Text>
                </Paper>

                <Paper
                  p="md"
                  bg="white"
                  shadow="sm"
                  radius="0"
                  style={{ flex: 1 }}
                >
                  <Text size="sm" fw={500}>
                    $0
                  </Text>
                </Paper>

                <Menu position="bottom-end" shadow="md">
                  <Menu.Target>
                    <ActionIcon variant="subtle" color="gray" size="lg">
                      <IconSettings size={18} />
                    </ActionIcon>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Label>Compare with</Menu.Label>
                    <Menu.Item
                      onClick={() => setCompareWith("Value")}
                      rightSection={
                        compareWith === "Value" ? (
                          <IconCheck
                            size={16}
                            color="var(--mantine-color-blue-6)"
                          />
                        ) : null
                      }
                    >
                      <Text
                        size="sm"
                        c={compareWith === "Value" ? "blue.6" : "gray.7"}
                      >
                        Value
                      </Text>
                    </Menu.Item>
                    <Menu.Item onClick={() => setCompareWith("Metric")}>
                      <Text
                        size="sm"
                        c={compareWith === "Metric" ? "blue.6" : "gray.7"}
                      >
                        Metric
                      </Text>
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>

                <ActionIcon variant="subtle" color="gray" size="lg">
                  <IconTrash size={18} />
                </ActionIcon>
              </Group>
            </Box>

            <Group justify="space-between" align="center">
              <Group gap="md">
                <Button
                  variant="subtle"
                  color="gray"
                  leftSection={<span>+</span>}
                >
                  Condition
                </Button>
                <Button
                  variant="subtle"
                  color="gray"
                  leftSection={<span>+</span>}
                >
                  Group
                </Button>
              </Group>

              <Tabs
                defaultValue="preview"
                variant="default"
                styles={{
                  tab: {
                    "&[data-active]": {
                      backgroundColor: "transparent",
                      color: "var(--mantine-color-gray-9)",
                      borderBottom: "2px solid var(--mantine-color-gray-9)",
                    },
                  },
                }}
              >
                <Tabs.List>
                  <Tabs.Tab value="preview">Preview</Tabs.Tab>
                  <Tabs.Tab value="description">Description</Tabs.Tab>
                </Tabs.List>
              </Tabs>
            </Group>
          </Stack>
        </Paper>

        <Box>
          <Button variant="subtle" color="gray" leftSection={<span>+</span>}>
            Task
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default App;
