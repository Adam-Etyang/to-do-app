import './sidebar.css';

export default function Sidebar({ isOpen, onClose }) {
  if (!isOpen) return null;
  console.log('its open');

  return (

    <>
      console.log('its open')
      <div className='sidebar-overlay' onClick={onClose}></div>
      <div className='main-container'>
        <div className='sidebar-header'>
          <h2>Tasks</h2>
          <button className='close-button' onClick={onClose}>×</button>
        </div>
        <div className='sidebar-content'>
          {/* Task content will go here */}
        </div>
      </div>
    </>
  );
}



