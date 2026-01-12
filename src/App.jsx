import './App.css';
import { Box, Button } from '@chakra-ui/react';
import { useState } from 'react';

function App() {
  const [empty, setEmpty] = useState(true);
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
                onClick={() => { addTask() }}
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
    </>
  )


}

export default App
