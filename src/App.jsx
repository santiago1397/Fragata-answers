import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import './App.css'
import { ThemeProvider } from './contexts/ThemeContext';
import Landing from './pages/landing/Landing';
import Modules from './pages/modules/Modules';
import Chapter from './pages/chapter/Chapter';
import Course from './pages/course/Course';
import Page from './pages/page/Page';


function App() {

  return (
    <>
      <BrowserRouter>
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/courses" element={<Modules />} />
            <Route path="/course/:courseId" element={<Course />} />
            <Route path="/chapter/:chapterId" element={<Chapter />} />
            <Route path="/page/:pageId" element={<Page />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

export default App
