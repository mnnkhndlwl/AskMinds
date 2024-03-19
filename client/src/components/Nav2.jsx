import React,{useState,useEffect} from 'react'
import profile from "../images/profile.png"
import logo from "../images/logo.png"
import { Link , useNavigate } from 'react-router-dom';
import menu from "../images/menu.png"
import profileImg from "../Icons/profile.png"
const Nav2 = () => {
  const [show , setShow] = useState(false);
  const [showProfile , setShowProfile] = useState(false);
  const token = sessionStorage.getItem('token');
  const studentId = sessionStorage.getItem('id');
  const name = sessionStorage.getItem('name');
  const navigate = useNavigate()
  const logout = ()=>{
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('name');
    navigate('/teachsign')
  }
  return (
    <div className="pt-5     pb-5">
      <div className="flex justify-around items-center p-5 nav-first">
        {/* <div className="logo flex  gap-10 items-center ml-[2%] "> */}
        <div className="w-[4%] nav-logo">
          <a>
            <Link to="/">
              <img className="w-[100%] " src={logo} />
            </Link>
          </a>
        </div>

        <div className="temp flex justify-between w-[25%]">
          <a href="#feature">
            <button className=" p-2 text-white    text-xl font-bold">
              Features
            </button>
          </a>
          <a href="#about">
            <button className="  p-2 text-white  hover:text-white  text-xl font-bold">
              About
            </button>
          </a>
          <button className=" p-2 text-white  hover:text-white  text-xl font-bold">
            Contact
          </button>
        </div>
        {/* </div> */}
        <div className="   nav">
          <div className="flex justify-center">
            {token ? (
              <div>
                <img
                  src={profileImg}
                  className="w-[4rem] cursor-pointer"
                  onClick={() => {
                    setShowProfile(!showProfile);
                  }}
                />
                {showProfile && (
                  <div className="flex flex-col absolute p-3 bg-blue-200 rounded-xl gap-4 right-2">
                    <Link to={`/dashstud/${studentId}/${name}`}>
                      <button className="rounded-lg  px-5 py-2 bg-blue-900 text-xl text-white">
                        Profile
                      </button>
                    </Link>
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
              <Link to="/teachsign">
                <button className="rounded-lg  px-5 py-2 bg-blue-900 text-xl text-white">
                  Login
                </button>
              </Link>
            )}

            <img src={menu} className="w-10 hidden cursor-pointer" />
          </div>
        </div>
        <div className=" hidden menu cursor-pointer">
          <img
            src={menu}
            className="w-14"
            onClick={() => {
              setShow(!show);
            }}
          />
        </div>
      </div>
      {show && (
        <div className="flex flex-col items-center justify-around w-full  h-[11rem]  shownav bg-blue-950 opacity-800 text-white">
          <button className="  p-2  hover:rounded-lg hover:text-white navbut text-xl font-bold ">
            About
          </button>
          <hr className="w-[100%] border-gray-300 " />
          <button className=" p-2  hover:rounded-lg hover:text-white navbut text-xl font-bold">
            Contact
          </button>
          <hr className="w-[100%] border-gray-300 " />
          <button className=" p-2  hover:rounded-lg hover:text-white navbut text-xl font-bold">
            Help
          </button>
          <hr className="w-[100%] border-gray-300 " />
          <Link to="/teachsign">
            <button className="rounded-lg  px-5 py-2 loginbut text-xl text-white font-bold">
              Login
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Nav2