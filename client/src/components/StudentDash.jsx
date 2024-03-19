import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'
import post from "../images/doubtPost.png"
import student from '../images/student.png'
import { useDemoContext } from '../contexts/DemoContext';
import AOS from 'aos'
import 'aos/dist/aos.css'
export const StudentDash = () => {
  const {studName} = useDemoContext();
  const [studentName, setStudentName] = useState('');
  const [doubtText, setDoubtText] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [subject, setSubject] = useState('');
  const [postedDoubt, setPostedDoubt] = useState(null);
  const [show,setShow] = useState(false)
  const {studentId} = useParams();

  setTimeout(() => {
    setShow(false)
  }, 8000);
  const postDoubt = async () => {
    try {
      
      const response = await axios.post('http://localhost:3000/student/post-doubt', {
        // studentName,
        doubtText,
        studentClass,
        subject,
        studName,
        studentId
      });
      // setPostedDoubt(response.data.studentName);
      setSubject(subject);
      setDoubtText(doubtText);
      setStudentClass(studentClass)
      const insertedId = response.data.insertedId;
      console.log(insertedId)
      console.log("posted in db");
      setShow(true)
    } catch (error) {
      console.error('Error posting doubt:', error);
    }
  };

  // const getFilteredDoubts = async () => {
  //   try {
  //     const params = new URLSearchParams({
  //       studentClass: 10,
  //       subject: "english",
  //     });
  //     const response = await fetch(
  //       `http://localhost:3000/teacher/get-doubts?${params}`
  //     );
  //     // console.log(response);
  //     const data = await response.json();

  //     setFilteredDoubts(data);
      
  //   } catch (error) {
  //     console.error("Error getting filtered doubts:", error);
  //   }
  // };  

//   useEffect(() => {
//     // Fetch filtered doubts when the component mounts
//     getFilteredDoubts();
//   }, []);

  useEffect(()=>{
    AOS.init();
    console.log(studName);
  },[])

 const both = ()=>{
  postDoubt();
  // getFilteredDoubts();
 }
  return (
    <div className="doubtForm">
      <Navbar />
      <div className="flex items-center justify-center doubt-post">
        {/* <div className="w-[70%] flex flex-col items-center justify-center "> */}
        {/* <div className="w-[80%] flex justify-center items-center"> */}
        <div className="flex flex-col items-center justify-center bg-[#2c2c6e] w-[30%] relative rounded-xl form-doubt">
          <img src={post} className="w-[50%]" />
          <h1 className="text-3xl mb-3 font-bold text-white">
            Post your Doubt
          </h1>
          <div className="flex justify-around w-[100%] overflow-hidden">
            <select
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              className="w-[45%] text-center rounded-md p-1 post-options"
            >
              <option>Class</option>
              <option value={6} className="">
                Class 6
              </option>
              <option value={7}>Class 7</option>
              <option value={8}>Class 8</option>
              <option value={9}>Class 9</option>
              <option value={10}>Class 10</option>
            </select>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-[45%] text-center rounded-md p-1 post-options"
            >
              <option>Subject</option>
              <option value={"English"}>English</option>
              <option value={"Maths"}>Maths</option>
              <option value={"Hindi"}>Hindi</option>
              <option value={"Science"}>Science</option>
              <option value={"German"}>German</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Doubt Text"
            value={doubtText}
            className="w-[95%] rounded-md p-1 mt-5"
            onChange={(e) => setDoubtText(e.target.value)}
          />
          <button onClick={both} className="my-4 bg-[#b7ebdf] rounded-xl p-1">
            Post Doubt
          </button>
        </div>
        {/* </div> */}
        {/* </div> */}
      </div>
      {show && (
        <div className="absolute top-4 left-[45vw] post-show">
          <div className="bg-blue-900 p-2 rounded-xl text-white" data-aos="fade-down"
          data-aos-duration="1000">
            <h1>posted succesfully</h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDash
