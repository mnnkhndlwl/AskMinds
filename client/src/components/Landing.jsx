import React , {useState , useRef , useEffect} from 'react'
import Navbar from './Navbar';
import { Link , useNavigate } from 'react-router-dom';
import new1 from '../images/new1.png'
import Lottie from 'react-lottie-player'
import land1 from '../assets/land1.json'
import land3 from '../assets/land3.json'
import land4 from '../assets/land4.json'
import down from "../images/down.png"
import sub1 from "../images/sub1.png"
import sub2 from "../images/sub2.png"
import sub3 from "../images/sub3.png"
import sub4 from "../images/sub4.png"
import sub5 from "../images/sub5.png"
import sub6 from "../images/sub6.png"
import sub7 from "../images/sub7.png"
import sub8 from "../images/sub8.png"
import sub9 from "../images/sub9.png"
import autoAnimate from "@formkit/auto-animate";
import AOS from 'aos'
import 'aos/dist/aos.css'
const Landing = () => {
  const navigate = useNavigate();

  const [click1, setClick1] = useState(true);
  const [click2, setClick2] = useState(false);
  const [click3, setClick3] = useState(false);
  const parentRef1 = useRef(null);
  const parentRef2 = useRef(null);
  const parentRef3 = useRef(null);
  useEffect(()=>{
    AOS.init();;
  },[])

  useEffect(() => {
    if (parentRef1.current) {
      autoAnimate(parentRef1.current);
    }
    if (parentRef2.current) {
      autoAnimate(parentRef2.current);
    }
    if (parentRef3.current) {
      autoAnimate(parentRef3.current);
    }
  }, [parentRef1,parentRef2,parentRef3])

  const handleClick1 = () => {
    setClick1(true);
    setClick2(false);
    setClick3(false);
  };
  const handleClick2 = () => {
    setClick1(false);
    setClick2(true);
    setClick3(false);
  };
  const handleClick3 = () => {
    setClick1(false);
    setClick2(false);
    setClick3(true);
  };

  const token = sessionStorage.getItem("token");
  const id = sessionStorage.getItem("id");
  const name = sessionStorage.getItem("name");

  return (
    <div>
      <div className="mainland overflow-hidden">
        <Navbar />
        <div className="flex justify-between land-1  h-[80vh] ">
          <div className="w-[50%] flex items-center justify-center l1div">
            <div className="flex flex-col  justify-center w-[70%] gap-10 l1in">
              <h1 className="text-6xl text-white font-bold land-head">
                AskMinds : The Ultimate Doubt Solving Platform
              </h1>
              <h2 className="text-white text-xl ">
                AskMinds is a revolutionary platform for students and teachers
                to connect. Get instant solutions to your academic doubts from
                expert teachers.
              </h2>
              {token ? (
                <button
                  className="rounded-xl w-[7rem] h-10 bg-blue-900 text-white font-bold"
                  onClick={() => {
                    navigate(`/dashteach/${id}/${name}`);
                  }}
                >
                  Get Started
                </button>
              ) : (
                <Link to="/teachsign">
                  <button className="rounded-xl w-[7rem] h-10 bg-blue-900 text-white font-bold">
                    Get Started
                  </button>
                </Link>
              )}
            </div>
          </div>
          <div className="w-[50%] flex items-center justify-center l2div">
            <Lottie play animationData={land4} className="w-[80%]"></Lottie>
          </div>
        </div>
      </div>
      <div
        className="flex items-center justify-between mainland3"
        
        id="features"
      >
        <div className="flex w-[50%] items-center justify-center l21div" data-aos="fade-up"
        data-aos-duration="2000">
          <Lottie
            play
            animationData={land3}
            // style={{ width: "10rem" }}
            className="w-[80%]"
          ></Lottie>
        </div>
        <div className="flex w-[50%] items-center justify-center h-[100vh] l22div" data-aos="fade-up"
        data-aos-duration="2000">
          <div className="flex flex-col  justify-center w-[70%] gap-10 ">
            <h1 className="text-5xl font-bold">
              AskMinds: Your Academic Companion
            </h1>
            <h2 className="text-xl">
              AskMinds is the ultimate platform for students to find solutions
              to their academic doubts. Our mission is to make learning
              accessible and enjoyable for everyone.
            </h2>
            {token ? (
              <button
                className="rounded-xl w-[9rem] h-10 bg-blue-900 text-white font-bold p-2"
                onClick={() => {
                  navigate(`/dashteach/${id}/${name}`);
                }}
              >
                Start Learning
              </button>
            ) : (
              <Link to="/teachsign">
                <button className="rounded-xl w-[9rem]  bg-blue-900 text-center text-white font-bold p-2">
                  Start Learning
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="flex  justify-between bg-blue-200 h-[100vh] mainland2">
        <div className="flex w-[50%] items-center justify-center l31div" data-aos="fade-up"
        data-aos-duration="2000">
          <div className="flex flex-col  justify-center w-[70%] gap-10">
            <h1 className="text-6xl text-white font-bold">Join the AskMinds</h1>
            <h2 className="text-white text-xl">
              AskMinds is the go-to platform for students and teachers. Our
              community-driven approach ensures reliable and accurate solutions
              to your academic queries.
            </h2>
            {token ? (
              <button
                className="rounded-xl w-[7rem]  bg-blue-900 text-white font-bold p-2"
                onClick={() => {
                  navigate(`/dashteach/${id}/${name}`);
                }}
              >
                Join Now
              </button>
            ) : (
              <Link to="/teachsign">
                <button className="rounded-xl w-[7rem]  bg-blue-900 text-center text-white font-bold p-2">
                  Join Now
                </button>
              </Link>
            )}
          </div>
        </div>
        <div className="flex w-[50%] items-center justify-center l32div" data-aos="fade-up"
        data-aos-duration="2000">
          <Lottie
            play
            animationData={land1}
            // style={{ width: "10rem" }}
            className="w-[80%] lottie-land"
          ></Lottie>
        </div>
      </div>
      <div className="flex flex-col items-center mainland3 pt-10" id="about">
        <div className="w-[80%]  " ref={parentRef1} data-aos="fade-up"
        data-aos-duration="1500">
          <div className="flex flex-col">
            <hr className="border-blue-800" />
            <div className="flex justify-between my-6">
              <h1 className="text-3xl font-bold">How AskMinds works</h1>
              <div className="flex items-center justify-center">
                <img
                  src={down}
                  className="w-[50px] cursor-pointer"
                  onClick={handleClick1}
                />
              </div>
            </div>
            <hr className="border-blue-800" />
          </div>
          {click1 && (
            <div className="flex justify-between mt-10 mb-24 click-div">
              <div className=" bg-blue-950 w-[32%] rounded-xl">
                <div className="p-4  flex flex-col items-center ">
                  <img src={sub1} className="w-[22rem]" />
                  <h1 className="text-xl font-bold font-sans mt-4 text-white">
                    Find the right teacher
                  </h1>
                  <h2 className="text-sm text-white">
                    Choose from a variety of subjects and expertise
                  </h2>
                </div>
              </div>
              <div className=" bg-blue-950 w-[32%] rounded-xl">
                <div className="p-4 w flex flex-col items-center">
                  <img src={sub2} className="w-[22rem]" />
                  <h1 className="text-xl font-bold font-sans mt-4 text-white">
                    Get personalized assistance
                  </h1>
                  <h2 className="text-sm text-white">
                    Submit your doubt and get step-by-step solutions
                  </h2>
                </div>
              </div>
              <div className=" bg-blue-950 w-[32%] rounded-xl">
                <div className="p-4  flex flex-col items-center">
                  <img src={sub3} className="w-[22rem]" />
                  <h1 className="text-xl font-bold font-sans mt-4 text-white">
                    Enhance Your Knowledge
                  </h1>
                  <h2 className="text-sm text-white">
                    Improve your grades and understanding
                  </h2>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-[80%]   text-white mt-10 " ref={parentRef2} >
          <div className="flex flex-col">
            <hr className="border-blue-800" />
            <div className="flex justify-between my-6">
              <h1 className="text-3xl font-bold text-black">
                Connect with teachers
              </h1>
              <div className="flex items-center justify-center">
                <img
                  src={down}
                  className="w-[50px] cursor-pointer"
                  onClick={handleClick2}
                />
              </div>
            </div>
            <hr className="border-blue-800" />
          </div>
          {click2 && (
            <div className="flex justify-between mt-10 mb-24  delay delay-content click-div">
              <div className=" bg-blue-950 w-[32%] rounded-xl">
                <div className="p-4  flex flex-col items-center ">
                  <img src={sub4} className="w-[22rem]" />
                  <h1 className="text-xl font-bold font-sans mt-4">
                    Get your doubts resolved
                  </h1>
                  <h2 className="text-sm">
                    Ask questions and receive detailed explanations
                  </h2>
                </div>
              </div>
              <div className=" bg-blue-950 w-[32%] rounded-xl">
                <div className="p-4 w flex flex-col items-center">
                  <img src={sub5} className="w-[22rem]" />
                  <h1 className="text-xl font-bold font-sans mt-4">
                    Join DoubtResolve community
                  </h1>
                  <h2 className="text-sm">
                    Connect with students and teachers
                  </h2>
                </div>
              </div>
              <div className=" bg-blue-950 w-[32%] rounded-xl">
                <div className="p-4  flex flex-col items-center">
                  <img src={sub6} className="w-[22rem]" />
                  <h1 className="text-xl font-bold font-sans mt-4">AskMinds</h1>
                  <h2 className="text-sm">Academic assistance</h2>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-[80%]   text-white mt-10 mb-5" ref={parentRef3} >
          <div className="flex flex-col">
            <hr className="border-blue-800" />
            <div className="flex justify-between my-6">
              <h1 className="text-3xl font-bold text-black">Easy to use</h1>
              <div className="flex items-center justify-center">
                <img
                  src={down}
                  className="w-[50px] cursor-pointer"
                  onClick={handleClick3}
                />
              </div>
            </div>
            <hr className="border-blue-800" />
          </div>
          {click3 && (
            <div
              className={`flex justify-between mt-10 mb-24 click-div animate-in`}
            >
              <div className=" bg-blue-950 w-[32%] rounded-xl">
                <div className="p-4  flex flex-col items-center ">
                  <img src={sub7} className="w-[22rem]" />
                  <h1 className="text-xl font-bold font-sans mt-4">
                    Get solutions
                  </h1>
                  <h2 className="text-sm">24/7 support</h2>
                </div>
              </div>
              <div className=" bg-blue-950 w-[32%] rounded-xl">
                <div className="p-4 w flex flex-col items-center">
                  <img src={sub8} className="w-[22rem]" />
                  <h1 className="text-xl font-bold font-sans mt-4">
                    Expert teachers
                  </h1>
                  <h2 className="text-sm">Qualified professionals</h2>
                </div>
              </div>
              <div className=" bg-blue-950 w-[32%] rounded-xl">
                <div className="p-4  flex flex-col items-center">
                  <img src={sub9} className="w-[22rem]" />
                  <h1 className="text-xl font-bold font-sans mt-4">
                    Subject-specific help
                  </h1>
                  <h2 className="text-sm">All subjects covered</h2>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing