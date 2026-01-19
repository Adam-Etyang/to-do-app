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
import {
  FiPlus,
  FiCheckCircle,
  FiList,
  FiClock,
  FiTarget,
} from "react-icons/fi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { MdCancel } from "react-icons/md";

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
      completed: false,
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

  const handleDeleteTask = (taskName) => {
    setDataMap((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.delete(taskName);
      return newMap;
    });
  };

  const handleCompleteTask = (taskName) => {
    setDataMap((prevMap) => {
      const newMap = new Map(prevMap);
      const taskData = newMap.get(taskName);
      if (taskData) {
        newMap.set(taskName, { ...taskData, completed: !taskData.completed });
      }
      return newMap;
    });
  };

  const handleEditTask = (oldTaskName, newTaskName, newDesc, newDueDate) => {
    setDataMap((prevMap) => {
      const newMap = new Map(prevMap);
      const taskData = newMap.get(oldTaskName);
      if (taskData) {
        newMap.delete(oldTaskName);
        newMap.set(newTaskName, {
          ...taskData,
          text: newDesc,
          dueDate: newDueDate,
        });
      }
      return newMap;
    });
  };

  if (empty) {
    return (
      <>
        <Box position="relative" h="100vh" className="root" border="none">
          <div className="primary-conatainer">
            <div className="hero-section">
              <div className="icon-wrapper">
                <HiOutlineClipboardList className="main-icon" />
              </div>
              <h1 className="hero-title">To Do list</h1>
              <p className="hero-subtitle">Keep your tasks organized</p>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <FiList className="feature-icon" />
                <h3>Organized Tasks</h3>
                <p>Keep all your tasks in one place</p>
              </div>
              <div className="feature-card">
                <FiClock className="feature-icon" />
                <h3>Deadlines</h3>
                <p>Set due dates and stay on track</p>
              </div>
              <div className="feature-card">
                <FiTarget className="feature-icon" />
                <h3>Stay Focused</h3>
                <p>Achieve your goals efficiently</p>
              </div>
            </div>

            <div className="cta-section">
              <Button
                onClick={() => {
                  setEmpty(false);
                }}
                size="lg"
                colorPalette="blue"
                className="cta-button"
              >
                <FiPlus style={{ marginRight: "8px" }} />
                Add Your tasks
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
          <TasksCards
            dataMap={dataMap}
            onDeleteTask={handleDeleteTask}
            onCompleteTask={handleCompleteTask}
            onEditTask={handleEditTask}
          />
        </Sidebar>
        <div className="sidebarbutton">
          <button type="button" onClick={handlesidebar}>
            <HiOutlineClipboardList
              style={{ marginRight: "6px", fontSize: "18px" }}
            />
            View Tasks
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
              label="Description"
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
                <MdCancel style={{ marginRight: "6px", fontSize: "18px" }} />
                Cancel
              </button>
            </div>
            <div className="enter-button-container">
              <button className="enter-button" onClick={handleSubmit}>
                <FiPlus style={{ marginRight: "6px", fontSize: "18px" }} />
                Add Task
              </button>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}

export default App;
