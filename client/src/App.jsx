import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Teachers from './components/Teachers'
import TeachSign from './components/TeachSign'
// import DashTeach from './components/DashTeach'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { DemoProvider } from '../src/contexts/DemoContext'
import StudentDash from './components/StudentDash'
import Demo from './components/Demo'
import DashStud from './components/DashStud'
import LogTeach from './components/LogTeach'
import LogStud from './components/LogStud'
import ChatTeach from './components/ChatTeach'
import DoubtAccept from './components/DoubtAccept'
import ChatStud from './components/ChatStud'
function App() {

  return (
    <>
      <DemoProvider>
        <Router>
          <Routes>
            <Route path="/">
              <Route index element={<Landing />} />
              {/* <Route path="land" element={<Landing />} /> */}
              <Route path="teachers" element={<Teachers />} />
              <Route path="teachsign" element={<TeachSign />} />
              {/* <Route path="dashteach" element={<DashTeach />} /> */}
              <Route path="dashstud" element={<StudentDash />} />
              <Route path="dashteach/:teacherId/:name" element={<Demo />} />
              <Route path="dashstud/:studentId/:name" element={<DashStud />} />
              <Route path="logteach" element={<LogTeach />} />
              <Route path="/land/:id" element={<Landing />} />
              <Route path="logstud" element={<LogStud />} />
              {/* <Route
                path="chatTeach/:teacherId/:studentId/:nam?"
                element={<ChatTeach />}
              /> */}
              <Route
                path="dashteach/:teacherId/:name/doubts"
                element={<DoubtAccept />}
              />
              <Route
                path="dashteach/:teacherId/profile"
                element={<Teachers />}
              />
              <Route
                path="dashstud/:studentId/doubts"
                element={<StudentDash />}
              />
              <Route path="dashstud/:studentId/chat/:name/:teachName?/:teacherId?" element={<ChatStud />} />
              <Route
                path="chatTeach/:teacherId/:nam/:studentId?/:studentName?"
                element={<ChatTeach />}
              />
            </Route>
          </Routes>
        </Router>
      </DemoProvider>
    </>
  );
}

export default App
