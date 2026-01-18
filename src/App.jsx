import "./App.css";
import { Box, Button } from "@chakra-ui/react";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";

import Sidebar from "./components/sidebar";
import TasksCards from "./components/tasks-cards";
import { useState } from "react";

function App() {
  const [empty, setEmpty] = useState(true);
  const [dataMap, setDataMap] = useState(new Map());
  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handlesidebar = () => {
    console.log("open sidebar");
    setSidebarOpen(true);
  };

  const handleCancel = () => {
    console.log("cancel button pressed");
    setTask("");
    setDesc("");
    setDate(null);
  };

  const handleSubmit = () => {
    const trimmed = task.trim();

    if (trimmed == "") return;

    const descobj = {
      text: desc,
      createdAt: Date.now(),
      dueDate: date,
    };
    setDataMap((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.set(trimmed, descobj);
      return newMap;
    });

    setTask("");
    setDesc("");
    setDate(null);
  };

  if (empty) {
    return (
      <>
        <Box position="relative" h="100vh" className="root" border="none">
          <div className="primary-conatainer">
            <div className="default">
              <img src="/empty-box.svg" alt="Empty box" className="box-image" />
            </div>
            <div className="secondary-text-box">
              <p className="secondary-text">
                This is you inbox it is where you put your tasks to accomplish
              </p>
            </div>
            <div className="Add-task-button">
              <Button
                onClick={() => {
                  setEmpty(false);
                }}
                size="sm"
                colorPalette="yellow"
              >
                Click ts
              </Button>
            </div>
          </div>
        </Box>
      </>
    );
  }

  return (
    <>
      <Box position="relative" h="100vh" className="root" border="none">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}>
          <TasksCards dataMap={dataMap} />
        </Sidebar>
        <div className="sidebarbutton">
          <button type="button" onClick={handlesidebar}>
            open
          </button>
        </div>

        <div className="input-container">
          <div className="text-field">
            {/*
            <input
              className="primary-input"
              placeholder="Sth random"
              id="task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />*/}
            <TextField
              id="task"
              value={task}
              label="Task"
              onChange={(e) => setTask(e.target.value)}
              variant="standard"
              sx={{
                pl: "10px",
                pr: "10px",

                "& .MuiInputBase-input": {
                  paddingLeft: "10px",
                  paddingRight: "10px",
                },
                "& .MuiInputLabel-root": {
                  paddingLeft: "10px",
                },
              }}
            />
            <TextField
              id="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              label="Despription"
              variant="standard"
              sx={{
                pl: "10px",
                pr: "10px",

                "& .MuiInputBase-input": {
                  paddingLeft: "10px",
                  paddingRight: "10px",
                },
                "& .MuiInputLabel-root": {
                  paddingLeft: "10px",
                },
              }}
            />

            <div className="calender">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Basic date time picker"
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                    label="Due Date"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </div>

          <div className="card-footer">
            <div className="cancel-button-container">
              <button
                type="button"
                className="cancel-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
            <div className="enter-button-container">
              <button className="enter-button" onClick={handleSubmit}>
                Add task
              </button>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}

export default App;
