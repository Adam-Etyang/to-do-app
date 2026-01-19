import "./tasks-cards.css";
import { Collapsible, Box, Button, Menu, Portal } from "@chakra-ui/react";
import { LuChevronRight } from "react-icons/lu";
import { FiEdit, FiTrash2, FiCheckCircle } from "react-icons/fi";
import dayjs from "dayjs";

export default function TasksCards({ dataMap }) {
  console.log("Tasks coming in", dataMap);

  // Convert Map to array for rendering
  const tasks = Array.from(dataMap.entries());

  if (tasks.length === 0) {
    return (
      <div className="no-tasks">
        <p>No tasks yet. Add a task to get started!</p>
      </div>
    );
  }

  return (
    <>
      {tasks.map(([taskName, taskData]) => (
        <div className="card" key={taskData.createdAt}>
          <Collapsible.Root borderRadius="8px" overflow="hidden">
            <Collapsible.Trigger
              paddingY="3"
              display="flex"
              gap="2"
              alignItems="center"
            >
              <Collapsible.Indicator
                transition="transform 0.2s"
                color="black"
                _open={{ transform: "rotate(90deg)" }}
              >
                <LuChevronRight />
              </Collapsible.Indicator>
              <p className="title">{taskName}</p>
            </Collapsible.Trigger>
            <Collapsible.Content>
              <Box padding="4" borderWidth="1px">
                <strong>Description:</strong>
                <p>{taskData.text || "No description"}</p>
                <br />
                <strong>Due Date:</strong>
                <p>
                  {taskData.dueDate
                    ? dayjs(taskData.dueDate).format("MMM DD, YYYY")
                    : "No due date"}
                </p>
                <br />
                <strong>Created:</strong>
                <p>{dayjs(taskData.createdAt).format("MMM DD, YYYY h:mm A")}</p>

                <Menu.Root>
                  <Menu.Trigger asChild>
                    <Button
                      variant="solid"
                      size="sm"
                      colorPalette="blue"
                      _hover={{ bg: "#1d4ed8" }}
                    >
                      Actions
                    </Button>
                  </Menu.Trigger>
                  <Portal>
                    <Menu.Positioner>
                      <Menu.Content>
                        <Menu.Item value="Edit">Edit</Menu.Item>
                        <Menu.Item value="CompleteTask">
                          Complete task
                        </Menu.Item>
                        <Menu.Item value="DeleteTask">Delete task</Menu.Item>
                      </Menu.Content>
                    </Menu.Positioner>
                  </Portal>
                </Menu.Root>
              </Box>
            </Collapsible.Content>
          </Collapsible.Root>
        </div>
      ))}
    </>
  );
}
