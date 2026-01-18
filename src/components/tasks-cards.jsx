import "./tasks-cards.css";
import { Collapsible, Box } from "@chakra-ui/react";
import { GoTriangleDown } from "react-icons/go";

export default function TasksCards({ task, desc }) {
  console.log("Tasks comming in");
  return (
    <>
      <div className="card">
        <Collapsible.Root>
          <Collapsible.Trigger paddingY="3">
            <GoTriangleDown />
            {task}
          </Collapsible.Trigger>
          <Collapsible.Content>
            <Box padding="4" borderWidth="1px">
              {desc}
              <br />
              <br />
              Think of each component as a wheel in your app’s UI — smooth,
              connected, and full of potential. Build with harmony. Build with
              <strong>Chakra UI</strong>.
            </Box>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
    </>
  );
}
