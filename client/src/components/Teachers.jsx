import React ,{useState,useEffect , useContext } from 'react'
import Navbar from './Navbar'
import Lottie from 'react-lottie-player';
import axios from 'axios'
import { useParams  } from 'react-router-dom'
import profile from "../assets/profile.json"
import teacher from "../images/profile-teacher.png"
import { useDemoContext } from '../contexts/DemoContext';
import { trusted } from 'mongoose';
import AOS from 'aos'
import 'aos/dist/aos.css'
const Teachers = () => {

  const {name} = useDemoContext();
  // const {teacherId} = useContext(DemoContext)
  const {teacherId} = useParams();
  const [selectedClass, setSelectedClass] = useState();
  const [selectedSubject, setSelectedSubject] = useState('');
  const [update,setUpdate] = useState(false)
  

  setTimeout(()=>{
    setUpdate(false)
  },6000)

  // const handleClassChange = (classOption) => {
  //   setSelectedClass(classOption);
  // };

  // const handleSubjectChange = (subjectOption) => {
  //   setSelectedSubject(subjectOption);
  // };

  
  
  const handleUpdate = async ()=>{
    try {
      // Make the API call to update user information
      await axios.put('http://localhost:3000/teacher/update', {
        teacherId,
        subject : selectedSubject,
        classs: selectedClass,
      });

      console.log('User information updated successfully',selectedClass);
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  }

  const both = ()=>{
    handleUpdate();
  }

  const handleSavedinfo = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/teacher/information/${teacherId}`);
      const { classs, subject } = response.data;
      setSelectedClass(classs);
      setSelectedSubject(subject);
    } catch (err) {
      console.error('Error getting teacher information:', err);
    }
  };
  
  useEffect(() => {
    handleSavedinfo();
    console.log(selectedSubject);
    console.log("name is :",  name);
    AOS.init();
    console.log(selectedClass,selectedSubject);
  }, [teacherId]);
  
  

  return (
    // <TeachContext.Provider value={{ selectedClass, selectedSubject }}>
    <div className="profile-teacher min-h-[100vh] h-auto relative">
      <div>
        <Navbar />
        <div className="flex items-center justify-center ">
          <div class="forms flex flex-col justify-around items-center  z-0 bg-blue-950 p-8 rounded-xl text-white relative">
            <div className="absolute   flex  z-[-1]  justify-center">
              <Lottie
                play
                animationData={profile}
                className=" opacity-40"
              ></Lottie>
            </div>
            <h1 class="accountType text-6xl font-bold">TEACHER ACCOUNT</h1>
            <img src={teacher} className="w-[50%] mt-4" />

            <div class="choices flex justify-around items-center w-[80%] relative mt-12">
              <div className="w-full relative flex flex-col items-center">
                <h2 className="text-2xl font-bold accountType">
                  Select Class:
                </h2>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="text-black w-[60%] mt-3 rounded-md border-none"
                >
                  <option>Class</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10</option>
                </select>
              </div>

              <div className="w-full relative flex flex-col items-center">
                <h2 className="text-2xl font-bold accountType ">
                  Select Subject
                </h2>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="text-black w-[60%] mt-3 rounded-md"
                >
                  <option>Subject</option>
                  <option value={"Hindi"}>Hindi</option>
                  <option value={"English"}>English</option>
                  <option value={"Maths"}>Maths</option>
                  <option value={"Science"}>Science</option>
                  <option value={"German"}>German</option>
                </select>
              </div>
            </div>
            <div class="saveRow mt-7">
              <button
                class="modalSubmit rounded-lg p-2 w-[5rem] text-white"
                onClick={() => {
                  both(), setUpdate(true);
                }}
              >
                SAVE
              </button>
            </div>
            <div className="flex absolute items-center z-[-1]">
              {/* <img src={classs} class="w-[100%]  opacity-30" /> */}
            </div>
          </div>
        </div>
      </div>
      {update && (
        <div className="absolute w-[10vw] h-[10vh] top-5 left-[45vw] z-10   flex items-center  " >
          <div className="bg-blue flex items-center justify-center p-2 bg-blue-900 rounded-xl text-center text-white" data-aos="fade-down"
          data-aos-duration="1000">
            <h1>Info updated successfully</h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default Teachers