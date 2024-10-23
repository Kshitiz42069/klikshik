import { useState } from "react";
import Uploader from "./components/Pages/ImageUploader/Uploader";
import Viewer from "./components/Pages/ImageViewer/Viewer";
import Navbar from "./components/Pages/Navbar/Navbar";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useThemeContext } from "./components/Theme/ThemeProviderContext";


function App() {
  const [view,setView] = useState(true);
  const { theme } = useThemeContext();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div className="App flex w-full h-full">
        <Navbar setView={setView} view={view}/>
        <div className="py-4 px-4 w-full h-screen">
          {view ? (
            <Viewer/>
          ):(
            <Uploader/>
          )}
        </div>
      </div>
    
    </ThemeProvider>
  );
}

export default App;
