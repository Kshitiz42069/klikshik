import { useState } from "react";
import Uploader from "./components/Pages/ImageUploader/Uploader";
import Viewer from "./components/Pages/ImageViewer/Viewer";
import Navbar from "./components/Pages/Navbar/Navbar";


function App() {
  const [view,setView] = useState(true);
  return (
      <div className="App flex w-full h-full">
        <Navbar setView={setView} view={view}/>
        <div className="py-4 px-4 bg-[#E1E1E1] w-full h-screen">
          {view ? (
            <Viewer/>
          ):(
            <Uploader/>
          )}
        </div>
      </div>
  );
}

export default App;
