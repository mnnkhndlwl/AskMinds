import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import Courses from './DoubtAccept';
import Teachers from "./Teachers";
import DoubtAccept from "./DoubtAccept";
import Navbar from "./Navbar";
import bg2 from "../images/bg1.mp4";
import Lottie from 'react-lottie-player'
import stud from "../assets/studDoubt.json"
import checking from "../assets/checking.json"
import update from "../assets/update.json"
import doubt from "../images/doubt.png"
import profile from "../images/teach.png"
import ChatTeach from './ChatTeach';
import { useDemoContext } from '../contexts/DemoContext';

const Demo = () => {
  const { teacherId  , name} = useParams();
  
  const {setName} = useDemoContext();
  const navigate = useNavigate()
  const token = sessionStorage.getItem('token')
  useEffect(()=>{
    
    if(!token){
      navigate('/teachsign')
    }
    setName(name);
    console.log(name);
  },[setName,token])
  

  return (
    <div className="text-white h-[100vh] demo">
      <Navbar teacherId={teacherId} />
      <div className="flex items-center justify-center ">
        <div className="flex flex-col justify-center items-center w-[80%] ">
          <h2 className="text-center text-6xl font-bold text-[#9AD4D6]">
            Welcome {name}
          </h2>
          <div className="flex justify-around items-center w-[100%] mt-2 teach-land">
            <div className=" w-[28%] h-[22rem] rounded-xl  flex flex-col items-center justify-center example mt-11 relative  ">
              <div className="imgi  w-[100%]  rounded-xl">
                <Lottie
                  play
                  animationData={checking}
                  className="h-[100%]"
                ></Lottie>
              </div>
              <div className="content bg-[#564787] flex flex-col items-center justify-center text-white">
                <h1 className="text-center text-xl m-1">
                  Take up doubts and provide expert answers to students
                </h1>
                <Link to={`/dashteach/${teacherId}/${name}/doubts`}>
                  <h1 className="rounded-xl p-1 bg-[#9AD4D6] text-center w-[100%] py-2 my-2">
                    Take Doubts
                  </h1>
                </Link>
              </div>
            </div>

            <div className=" w-[28%] h-[22rem] rounded-xl  flex flex-col items-center justify-center example mt-11 relative ">
              <div className="imgi  shadow-md w-[100%]  rounded-xl">
                <Lottie
                  play
                  animationData={update}
                  className="h-[90%]"
                ></Lottie>
              </div>
              <div className="content bg-[#564787] flex flex-col items-center justify-center text-white">
                <h1 className="text-center text-xl m-1">
                  Chat with your teacher and get your doubt cleared
                </h1>
                <Link to={`/dashteach/${teacherId}/profile`}>
                  <div>
                    <h1 className="rounded-xl p-1 bg-[#9AD4D6] text-center w-[100%] py-2 my-2">
                      Update profile
                    </h1>
                  </div>
                </Link>
              </div>
            </div>
            <div className=" w-[28%] h-[22rem] rounded-xl  flex flex-col items-center justify-center example mt-11 relative ">
              <div className="imgi  shadow-md w-[100%]  rounded-xl">
                <Lottie play animationData={stud} className="h-[90%]"></Lottie>
              </div>
              <div className="content bg-[#564787] flex flex-col items-center justify-center text-white">
                <h1 className="text-center text-xl m-1">
                  Chat with your student and clear their doubts
                </h1>
                <Link to={`/chatTeach/${teacherId}/${name}`}>
                  <div>
                    <h1 className="rounded-xl p-1 bg-[#9AD4D6] text-center w-[100%] py-2 my-2">
                      Start chatting
                    </h1>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </DemoContext.Provider> */}
    </div>
  );
};

export default Demo;
