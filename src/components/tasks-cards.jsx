import "./tasks-cards.css";
import { Collapsible, Box } from "@chakra-ui/react";
import { GoTriangleDown } from "react-icons/go";
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
          <Collapsible.Root>
            <Collapsible.Trigger paddingY="3">
              {taskName}
              <GoTriangleDown />
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
              </Box>
            </Collapsible.Content>
          </Collapsible.Root>
        </div>
      ))}
    </>
  );
}
