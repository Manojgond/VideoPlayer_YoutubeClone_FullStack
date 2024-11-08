import { useState } from "react";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import Temp from "./Components/Temp"

function App() {
  return (
    <>
      <div className="bg-blue-200 w-full h-screen font-medium">
          <Navbar />
          <Sidebar />
          <Temp />
      </div>
    </>
  );
}

export default App;
