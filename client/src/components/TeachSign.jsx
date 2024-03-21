import React ,{useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Navbar from './Navbar'
import teacher from "../images/teacher.png"
import student from "../images/student.png"
import { Link } from 'react-router-dom';
import AOS from 'aos'
import 'aos/dist/aos.css'
const TeachSign = () => {
  const navigate = useNavigate();
  const navigate2 = useNavigate();
  const [token , setToken] = useState()
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [form1, setForm1] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [message , setMessage] = useState("")
  const [show,setShow] = useState(false)
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const [message1 , setMessage1] = useState("")
  const [show1,setShow1] = useState(false)
  const handleInputChange1 = (e) => {
    setForm1({ ...form1, [e.target.name]: e.target.value });
  };
  
  useEffect(()=>{
    AOS.init();
  },[])
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/teacher/sign', form);
      const { message,insertedId ,token} = response.data;
      setToken(token)
      setMessage(message);
      sessionStorage.setItem('token',token)
      sessionStorage.setItem('id',insertedId)
      sessionStorage.setItem('name',form.firstName)
      sessionStorage.setItem('user','teacher')
      navigate(`/dashteach/${insertedId}/${form.firstName}`);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          if (error.response.data.message === 'Email already exists') {
            setMessage('Email is already registered. Please use a different email.');
            setShow(true)
          } else {
            setMessage('Bad Request: ' + error.response.data.message);
            setShow(true)
          }
        } else if (error.response.status === 500) {
          setMessage('Internal Server Error: ' + error.response.data.message);
          setShow(true)
        } else {
          setMessage('Error: ' + error.response.data.message);
          setShow(true)
        }
      } else if (error.request) {
        setMessage('Error: No response from the server');
        setShow(true)
      } else {
        setMessage('Error: Request could not be sent');
        setShow(true)
      }
    }
  };
  const handleSubmit2 = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/student/sign', form1);
      const { message1,insertedId,token } = response.data;
      // const { message1 } = response.data;
      setMessage1(message1);
      sessionStorage.setItem('token',token)
      sessionStorage.setItem('id',insertedId)
      sessionStorage.setItem('name',form1.firstName)
      sessionStorage.setItem('user','student')
      navigate2(`/dashstud/${insertedId}/${form1.firstName}`);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          if (error.response.data.message === 'Email already exists') {
            setMessage1('Email is already registered. Please use a different email.');
            setShow1(true)
          } else {
            setMessage1('Bad Request: ' + error.response.data.message);
            setShow1(true)
          }
        } else if (error.response.status === 500) {
          setMessage1('Internal Server Error: ' + error.response.data.message);
          setShow1(true)
        } else {
          setMessage1('Error: ' + error.response.data.message);
          setShow1(true)
        }
      } else if (error.request) {
        setMessage1('Error: No response from the server');
        setShow1(true)
      } else {
        setMessage1('Error: Request could not be sent');
        setShow1(true)
      }
    }


  };
  setTimeout(()=>{
    setShow(false);
    setShow1(false)
  },8000)
  return (
    <div className="signteach ">
      <Navbar />
      <div className="flex justify-center  login-main">
        <div className="flex  justify-center items-center min-h-[30rem] h-auto teach-div w-[100%] opaci">
          <form
            onSubmit={handleSubmit}
            className="flex  justify-center items-center h-[30rem] teach-div w-[100%]"
          >
            <div className="flex flex-col justify-center items-center mt-[5%]  teach-form w-[50%] px-3 h-[100%] relative rounded-xl shadow-lg log-in">
              <img src={teacher} className="w-[40%]" />
              <h1 className="text-2xl text-white mt-3 text-center">Sign In As Teacher</h1>
              <div className="w-[100%] relative flex justify-center my-5 gap-5">
                <input
                  type="text "
                  placeholder="First name"
                  className="w-[45%] rounded-md p-1 text-center"
                  name="firstName"
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-[45%] rounded-md p-1 text-center"
                  name="lastName"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col w-[100%] relative justify-center items-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-[95%] rounded-md p-1 text-center"
                  name="email"
                  onChange={handleInputChange}
                />
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  className="w-[95%] my-5 rounded-md p-1 text-center"
                  onChange={handleInputChange}
                />
              </div>
              {/* <Link to="/dashteach"> */}
              <button
                className="px-2 py-1 rounded-xl w-[7rem] bg-yellow-300"
                type="submit"
              >
                Sign In
              </button>
              <Link to="/logteach">
                <h1 className="my-4 text-white font-bold text-center">
                  Already have an account?
                </h1>
              </Link>
            </div>
          </form>
        </div>

        <div className="flex  justify-center items-center h-[30rem] w-[100%]">
          <form
            onSubmit={handleSubmit2}
            className="flex  justify-center items-center h-[30rem] teach-div w-[100%]"
          >
            <div className="flex flex-col justify-center items-center mt-[5%]  teach-form w-[50%] px-3 h-[100%] relative rounded-xl shadow-lg ">
              <img src={student} className="w-[15rem]" />

              <h1 className="text-2xl text-white mt-5 text-center">Sign In As Student</h1>
              <div className="w-[100%] relative flex justify-center my-5 gap-5">
                <input
                  type="text "
                  placeholder="First name"
                  className="w-[45%] rounded-md p-1 text-center"
                  name="firstName"
                  onChange={handleInputChange1}
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-[45%] rounded-md p-1 text-center"
                  name="lastName"
                  onChange={handleInputChange1}
                />
              </div>
              <div className="flex flex-col w-[100%] relative justify-center items-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-[95%] rounded-md p-1 text-center"
                  name="email"
                  onChange={handleInputChange1}
                />
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  className="w-[95%] my-5 rounded-md p-1 text-center"
                  onChange={handleInputChange1}
                />
              </div>
              {/* <Link to="/dashteach"> */}
              <button
                className="px-2 py-1 rounded-xl w-[7rem] bg-yellow-300"
                type="submit"
              >
                Sign In
              </button>
              <Link to="/logstud">
                <h1 className="my-4 text-white font-bold text-center">
                  Already have an account?
                </h1>
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className=" ">
        {show && (
          <div
            className="flex flex-col items-center justify-center rounded-xl text-center bg-red-600 text-white p-2 w-[20%] absolute top-4 left-[40vw]"
            data-aos="fade-down"
            data-aos-duration="1000"
          >
            <p>{message}</p>
          </div>
        )}
        {show1 && (
          <div
            className="flex flex-col items-center justify-center rounded-xl text-center bg-red-600 text-white p-2 w-[20%] absolute top-4 left-[40vw]"
            data-aos="fade-down"
            data-aos-duration="1000"
          >
            <p>{message1}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeachSign