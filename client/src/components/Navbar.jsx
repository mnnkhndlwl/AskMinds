import React,{useState,useEffect , useRef} from 'react'
import profile from "../images/profile.png"
import logo from "../images/logo.png"
import { Link , useNavigate , useParams } from 'react-router-dom';
import menu from "../images/menu.png"
import profileImg from "../Icons/profile.png"
import blueMenu from "../Icons/blue-menu.png"
import autoAnimate from "@formkit/auto-animate";
const Navbar = () => {
  const [show , setShow] = useState(false);
  const [showProfile , setShowProfile] = useState(false);
  const token = sessionStorage.getItem('token');
  const teacherId = sessionStorage.getItem('id');
  const name = sessionStorage.getItem('name');
  const user = sessionStorage.getItem('user')
  
  const navigate = useNavigate()
  const [hide,setHide] = useState(false)
  const logout = ()=>{
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('name');
    navigate('/teachsign')
  }
  useEffect(()=>{
    const curUrl = window.location.href;
    if(curUrl.includes('http://localhost:5173/teachsign')){
      setHide(true)
    }
    else{
      setHide(false)
    }
  })
  const parentRef = useRef(null);
  useEffect(()=>{
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  },[parentRef])
  return (
    <div className="pt-5     pb-5" ref={parentRef}>
      <div className="flex justify-between items-center p-5 nav-first">
        {/* <div className="logo flex  gap-10 items-center ml-[2%] "> */}
        <div className="w-[4%] nav-logo ml-4">
          <a>
            <Link to="/">
              <img className="w-[100%] " src={logo} />
            </Link>
          </a>
        </div>
        <div className="flex justify-between">
          {!token && !hide && (
            <div className="temp flex justify-between w-[20%]">
              <a href="#features">
                <button className=" p-2 text-white rounded-lg  px-5 py-2 hover:bg-blue-900    text-xl font-bold">
                  Features
                </button>
              </a>
              <a href="#about">
                <button className="  p-2 text-white  hover:text-white rounded-lg  px-5 py-2 hover:bg-blue-900 text-xl font-bold">
                  About
                </button>
              </a>
            </div>
          )}

          {/* </div> */}
          <div className="   nav">
            <div className="flex justify-center ml-2">
              {token ? (
                <div>
                  <img
                    src={profileImg}
                    className="w-[4rem] cursor-pointer mr-4"
                    onClick={() => {
                      setShowProfile(!showProfile);
                    }}
                  />
                  {showProfile && (
                    <div className="flex flex-col absolute p-3 bg-blue-200 rounded-xl gap-4 right-2">
                      {user === "teacher" ? (
                        <Link to={`/dashteach/${teacherId}/${name}`}>
                          <button className="rounded-lg  px-5 py-2 bg-blue-900 text-xl text-white font-bold">
                            Profile
                          </button>
                        </Link>
                      ) : (
                        <Link to={`/dashstud/${teacherId}/${name}`}>
                          <button className="rounded-lg  px-5 py-2 bg-blue-900 text-xl text-white font-bold">
                            Profile
                          </button>
                        </Link>
                      )}
                      {/* <Link to={`/dashteach/${teacherId}/${name}`}>
                      <button className="rounded-lg  px-5 py-2 bg-blue-900 text-xl text-white">
                        Profile
                      </button>
                    </Link> */}
                      <button
                        className="rounded-lg  px-5 py-2 bg-red-600 text-xl text-white cursor-pointer"
                        onClick={logout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <Link to="/teachsign">
                    <button className="rounded-lg  px-5 py-2 bg-blue-900 text-xl text-white font-bold">
                      Login
                    </button>
                  </Link>
                </div>
              )}
              <img src={menu} className="w-10 hidden cursor-pointer" />
            </div>
          </div>
        </div>
        <div className=" hidden menu">
          {hide ? (
            <img
              src={blueMenu}
              className="w-12 cursor-pointer"
              onClick={() => {
                setShow(!show);
              }}
            />
          ) : (
            <img
              src={menu}
              className="w-14 cursor-pointer"
              onClick={() => {
                setShow(!show);
              }}
            />
          )}
        </div>
      </div>
      {show && (
        <div>
          {token ? (
            <div className="flex flex-col items-center    w-full h-[10rem]  shownav  opacity-800 text-white">
              <div className="flex items-center justify-center bg-blue-950 w-full h-[4rem] border-b-2">
                {user === "teacher" ? (
                  <Link to={`/dashteach/${teacherId}/${name}`}>
                    <button className="rounded-lg   text-xl text-white font-bold">
                      Profile
                    </button>
                  </Link>
                ) : (
                  <Link to={`/dashstud/${teacherId}/${name}`}>
                    <button className="rounded-lg    text-xl text-white font-bold">
                      Profile
                    </button>
                  </Link>
                )}
              </div>

              {/* <hr className="w-[100%] border-gray-300 " /> */}
              <div className="bg-red-500 w-full flex items-center justify-center h-[4rem]">
                <Link to="/teachsign">
                  <button className="rounded-lg   loginbut text-xl text-white font-bold bg-red-500">
                    Logout
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-around w-full   h-[9rem]  shownav bg-blue-950 opacity-800 text-white">
              <a href="#features" className='flex items-center justify-center'>
                <button className="  p-2  hover:rounded-lg hover:text-white navbut text-xl font-bold ">
                  Features
                </button>
              </a>
              <hr className="w-[100%] border-gray-300 " />
              <a href="#about" className='flex items-center justify-center'>
                <button className=" p-2  hover:rounded-lg hover:text-white navbut text-xl font-bold">
                  About
                </button>
              </a>
              <hr className="w-[100%] border-gray-300 " />
              <Link to="/teachsign" className='flex items-center justify-center'>
                <button className="rounded-lg  px-5 py-2 loginbut text-xl text-white font-bold">
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar