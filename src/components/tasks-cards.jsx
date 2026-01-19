import "./tasks-cards.css";
import { Collapsible, Box, Button, Menu, Portal } from "@chakra-ui/react";
import { LuChevronRight } from "react-icons/lu";
import { FiEdit, FiTrash2, FiCheckCircle } from "react-icons/fi";
import dayjs from "dayjs";
import { useState } from "react";

export default function TasksCards({
  dataMap,
  onDeleteTask,
  onCompleteTask,
  onEditTask,
}) {
  console.log("Tasks coming in", dataMap);
  const [editingTask, setEditingTask] = useState(null);
  const [editTaskName, setEditTaskName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editDueDate, setEditDueDate] = useState(null);

  // Convert Map to array for rendering
  const tasks = Array.from(dataMap.entries());

  const handleMenuSelect = (taskName, taskData, action) => {
    if (action === "Edit") {
      setEditingTask(taskName);
      setEditTaskName(taskName);
      setEditDesc(taskData.text);
      setEditDueDate(taskData.dueDate);
    } else if (action === "CompleteTask") {
      onCompleteTask(taskName);
    } else if (action === "DeleteTask") {
      onDeleteTask(taskName);
    }
  };

  const handleSaveEdit = (oldTaskName) => {
    if (editTaskName.trim()) {
      onEditTask(oldTaskName, editTaskName.trim(), editDesc, editDueDate);
      setEditingTask(null);
      setEditTaskName("");
      setEditDesc("");
      setEditDueDate(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setEditTaskName("");
    setEditDesc("");
    setEditDueDate(null);
  };

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
              <Box padding="4">
                {editingTask === taskName ? (
                  <>
                    <Box mb="3">
                      <strong>Task Name:</strong>
                      <input
                        type="text"
                        value={editTaskName}
                        onChange={(e) => setEditTaskName(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px",
                          marginTop: "4px",
                          border: "1px solid #e2e8f0",
                        }}
                      />
                    </Box>
                    <Box mb="3">
                      <strong>Description:</strong>
                      <textarea
                        variant="flushed"
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px",
                          marginTop: "4px",
                          border: "1px solid #e2e8f0",
                          minHeight: "60px",
                          background: "white",
                          color: "black",
                        }}
                      />
                    </Box>
                    <Box display="flex" gap="2" mt="3">
                      <Button
                        size="md"
                        colorPalette="blue"
                        onClick={() => handleSaveEdit(taskName)}
                        px="8"
                        py="4"
                        minW="120px"
                      >
                        Save
                      </Button>
                      <Button
                        size="md"
                        colorPalette="red"
                        variant="solid"
                        onClick={handleCancelEdit}
                        px="8"
                        py="4"
                        minW="120px"
                      >
                        Cancel
                      </Button>
                    </Box>
                  </>
                ) : (
                  <>
                    <strong>Description:</strong>
                    <p
                      style={{
                        textDecoration: taskData.completed
                          ? "line-through"
                          : "none",
                        opacity: taskData.completed ? 0.6 : 1,
                      }}
                    >
                      {taskData.text || "No description"}
                    </p>
                    <br />
                    <strong>Due Date:</strong>
                    <p
                      style={{
                        textDecoration: taskData.completed
                          ? "line-through"
                          : "none",
                        opacity: taskData.completed ? 0.6 : 1,
                      }}
                    >
                      {taskData.dueDate
                        ? dayjs(taskData.dueDate).format("MMM DD, YYYY")
                        : "No due date"}
                    </p>
                    <br />
                    <strong>Created:</strong>
                    <p>
                      {dayjs(taskData.createdAt).format("MMM DD, YYYY h:mm A")}
                    </p>
                    {taskData.completed && (
                      <>
                        <br />
                        <strong style={{ color: "#16a34a" }}>
                          Status: Completed ✓
                        </strong>
                      </>
                    )}

                    <Menu.Root
                      onSelect={(details) =>
                        handleMenuSelect(taskName, taskData, details.value)
                      }
                    >
                      <Menu.Trigger asChild>
                        <Button
                          variant="solid"
                          size="sm"
                          px="6"
                          py="3"
                          colorPalette="blue"
                          _hover={{ bg: "#1d4ed8" }}
                          mt="3"
                        >
                          Actions
                        </Button>
                      </Menu.Trigger>
                      <Portal>
                        <Menu.Positioner>
                          <Menu.Content
                            minHeight="150px"
                            padding="3"
                            borderWidth="0"
                            bg="white"
                          >
                            <Menu.Item value="Edit" padding="3" color="#1e293b">
                              <FiEdit style={{ marginRight: "8px" }} />
                              Edit
                            </Menu.Item>
                            <Menu.Item
                              value="CompleteTask"
                              padding="3"
                              color="#1e293b"
                            >
                              <FiCheckCircle style={{ marginRight: "8px" }} />
                              {taskData.completed
                                ? "Mark Incomplete"
                                : "Complete task"}
                            </Menu.Item>
                            <Menu.Item
                              value="DeleteTask"
                              padding="3"
                              color="#dc2626"
                            >
                              <FiTrash2 style={{ marginRight: "8px" }} />
                              Delete task
                            </Menu.Item>
                          </Menu.Content>
                        </Menu.Positioner>
                      </Portal>
                    </Menu.Root>
                  </>
                )}
              </Box>
            </Collapsible.Content>
          </Collapsible.Root>
        </div>
      ))}
    </>
  );
}
