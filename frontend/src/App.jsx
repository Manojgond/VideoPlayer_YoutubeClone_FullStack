import React from 'react'
import Homepage from './Components/Homepage';
import VideoPlayerPage from './Components/VideoPlayerPage';
import Navbar from './Components/Navbar';

function App() {
  return (
    <>
      <div className='bg-[#181818] text-white min-h-screen'>
        {/* <!-- Navbar (Fixed at the top) --> */}
        <div className="fixed top-0 left-0 right-0 h-16 z-10">
          <Navbar />
        </div>
        <VideoPlayerPage />
        {/* <Homepage /> */}
      </div>
    </>
  );
}

export default App;
