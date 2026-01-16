import './App.css';
import {
  Box,
  Button,
  Field,
  Card,
  Avatar,
  Input,
} from '@chakra-ui/react';
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
        <div className='input-container'>

          <div className='text-field'>
            <input className='primary-input' placeholder='Sth random' />
            <input className='secondary-input' placeholder='Despription' />
          </div>

          <div className='card-footer'>
            <div
              className='cancel-button-container'>

              <button type="button" className='cancel-button'>x</button>
            </div>
            <div className='enter-button-container'>

              <button type="button" className='enter-button'
              >send</button>
            </div>

          </div>

        </div>
      </Box>
    </>
  )


}

export default App
