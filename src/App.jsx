import './App.css';
import {
  Box,
  Button,
} from '@chakra-ui/react';

import Sidebar from './components/sidebar';
import { useState } from 'react';

function App() {
  const [empty, setEmpty] = useState(true);
  const [dataMap, setDataMap] = useState(new Map());
  const [task, setTask] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handlesidebar = () => {
    console.log('open sidebar');
    setSidebarOpen(true);
  };


  const handleCancel = () => {
    console.log('cancel button pressed');
    setTask('');
    setDesc('');
    setDate('');
  }

  const handleSubmit = () => {
    const trimmed = task.trim();

    if (trimmed == '') return;

    const descobj = {
      text: desc,
      createdAt: Date.now(),
      dueDate: date

    }
    setDataMap(prevMap => {
      const newMap = new Map(prevMap);
      newMap.set(trimmed, descobj);
      return newMap;
    });

    setTask('');
    setDesc('');
    setDate(Date.now());

  }





  if (empty) {
    return (
      <>

        <Box position="relative" h="100vh" className='root' border='none'>
          <div className='primary-conatainer'>
            <div className='default'>
              <img src="/empty-box.svg" alt="Empty box" className='box-image' />
            </div>
            <div className='secondary-text-box'>
              <p className='secondary-text'>
                This is you inbox it is where you put your tasks to accomplish
              </p>
            </div>
            <div className='Add-task-button'>
              <Button
                onClick={() => { setEmpty(false) }}
                size='sm'
                colorPalette='yellow'>
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
      <Box position="relative" h="100vh" className='root' border='none'>

        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} >
        </Sidebar>
        <div className='sidebarbutton'>
          <button type="button" onClick={handlesidebar}>
            open</button>
        </div>

        <div className='input-container'>

          <div className='text-field'>
            <input
              className='primary-input'
              placeholder='Sth random'
              id='task'
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <input
              className='secondary-input'
              placeholder='Despription'
              id='desc'
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <input
              className='date'
              placeholder='Date'
              id='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

          </div>

          <div className='card-footer'>
            <div
              className='cancel-button-container'>

              <button
                type="button"
                className='cancel-button'
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
            <div className='enter-button-container'>

              <button
                className='enter-button'
                onClick={handleSubmit}
              >
                send
              </button>
            </div>

          </div>

        </div>
      </Box>
    </>
  )


}

export default App
