import React , {useState} from 'react'
import Navbar from './Navbar'
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'
import teacher from "../images/teacher.png"
const LogTeach = () => {

    const [form,setForm] = useState({
        email:"",
        password:""
    })
    const [show,setShow] = useState(false)

    const [message ,setErrorMessage] = useState("")
    const handleInputChange = (e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    }
    const navigate = useNavigate();
    const handleLogin = async (e)=>{
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:3000/teacher/login',form);
            const { message,insertedId,name,token } = response.data;
            sessionStorage.setItem('token',token)
            sessionStorage.setItem('id',insertedId)
            sessionStorage.setItem('name',name)
            setErrorMessage(message);
            console.log("Succesful");
            navigate(`/dashteach/${insertedId}/${name}`);
            
            
        }
        catch(err){
          console.error(err);
  
          if (err.response) {
            console.error('Server responded with:', err.response.data);
            console.error('Status code:', err.response.status);
    
            // Set error message based on the response status
            if (err.response.status === 404) {
              setErrorMessage('User not found');
              setShow(true)
            } else if (err.response.status === 401) {
              setErrorMessage('Wrong password');
              setShow(true)
            } else {
              setErrorMessage('Error during login');
              setShow(true)
            }
          } else if (err.request) {
            setErrorMessage('No response received from the server');
            setShow(true)
          } else {
            setErrorMessage('Error during request setup');
            setShow(true)
          }
        }
    }
    setTimeout(()=>{
      setShow(false);
    },8000)

  return (
    <div className='login'>
      <Navbar />
      <div className="flex justify-center items-center ">
        <div className="flex items-center justify-center my-auto  w-[60%] login-form">
          <form
            onSubmit={handleLogin}
            className="flex  justify-center items-center h-[30rem] teach-div w-[100%]"
          >
            <div className="flex flex-col justify-center items-center mt-[5%]  teach-form w-[50%] px-3 h-[100%] relative rounded-xl shadow-lg log-in">
              <img src={teacher} className="w-[8rem]" />
              <h1 className="text-2xl text-white mt-3 text-center">
                Log In As Teacher
              </h1>

              <div className="flex flex-col w-[100%] relative justify-center items-center mt-5">
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
                Log In
              </button>
              <Link to="/teachsign">
                <h1 className="my-4 text-white font-bold text-center">
                  Don't have an account? Sign Up
                </h1>
              </Link>
            </div>
          </form>
        </div>
        <div>
          {show && (
            <div
              className="flex flex-col items-center justify-center rounded-xl text-center bg-red-600 text-white p-2 w-[20%] absolute top-4 left-[40vw]"
              data-aos="fade-down"
              data-aos-duration="1000"
            >
              <p>{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LogTeach