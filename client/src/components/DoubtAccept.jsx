import React, { useState, useEffect, useContext } from 'react';
import { useNavigate , useParams } from 'react-router-dom';
import axios from 'axios';
import Lottie from 'react-lottie-player';
import avail from "../assets/available.json"
import { useDemoContext } from '../contexts/DemoContext';
const DoubtAccept = () => {
  const {teacherId,name} = useParams();

  const [subject, setSubject] = useState('');
  const [filteredDoubts, setFilteredDoubts] = useState([]);
  const [check,setCheck] = useState(false);
  const navigate = useNavigate();

  const [doubti,setDoubt] = useState('');
  const handleDoubt = (e)=>{
    setDoubt(e.target.getAttribute('value'));
    console.log(doubti);
  }

  const [toggle,setToggle] = useState(false);
  const handleToggle = ()=>{
    setToggle(!toggle);
  }

  const modBoth = (e)=>{
    handleDoubt(e);
    handleToggle();
  }
  

  const handleInfo = async(studentId,studName)=>{
    try {
      const response = await axios.post(`http://localhost:3000/info-post`, {
        myId: teacherId,
        senderId: studentId,
        senderName: studName
      });
      const response2 = await axios.post(`http://localhost:3000/info-post`, {
        myId: studentId,
        senderId:teacherId ,
        senderName: name
      });
    } catch (err) {
      console.log(err);
    }
  }
  const handleInfo2 = async(studentId,studName)=>{
    try {
      
      const response = await axios.post(`http://localhost:3000/info-post`, {
        myId: studentId,
        senderId:teacherId ,
        senderName: name
      });
    } catch (err) {
      console.log(err);
    }
  }

  const handleAcceptDoubt = async (doubtId ,studentId,studName) => {
    try {
      await axios.put(`http://localhost:3000/teacher/accepted`,{doubtId});
      
      // console.log('Doubt accepted successfully');
      navigate(`/chatTeach/${teacherId}/${name}/${studentId}/${studName}`)
    } catch (error) {
      alert("doubt already accepted")
      console.error("doubt already accepted");
      console.log(error);
    }
  };

  const getFilteredDoubts = async () => {
    try {
      const url = `http://localhost:3000/teacher/get-doubts/${teacherId}`;
        const response = await axios.get(url);
        const data = response.data;
        console.log('filtering');

        setFilteredDoubts(data);
    } catch (error) {
      console.error("Error getting filtered doubts:", error);
    }
  };  

  useEffect(() => {
    // console.log(teacherId);
    // console.log(selectedClass);
    if (teacherId) {
      // Fetch filtered doubts when the component mounts
      getFilteredDoubts();
    }
    console.log(filteredDoubts);
  }, [teacherId]); 

  return (
    <div className="flex  min-h-[100vh] h-auto">
      <div className="flex flex-col  items-center w-[100%] bg-blue-900 text-white pt-10 accept relative">
        <div className="doubt-accept">
          {filteredDoubts.length > 0 ? (
            <div className="flex flex-col items-center justify-center doubt-accept">
              <div className="text-6xl">WELCOME</div>
              <h1 className="text-3xl mt-12">
                Take up the doubts of students and help them to achieve their
                dreams
              </h1>
              <div className="bg-[#0A2472] p-3 rounded-xl flex items-center justify-center mt-10 relative pb-5">
                <table className=" mt-2 table w-[70vw] ">
                  <thead>
                    <tr>
                      {/* <th>ID</th> */}
                      <th>Name</th>
                      <th>Class</th>
                      <th>Subject</th>
                      <th>Doubt</th>
                      <th>Check</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDoubts.map((doubt, index) => (
                      <tr key={index}>
                        <td>{doubt.studName}</td>
                        {/* <td>{doubt.studentName}</td> */}
                        <td>{doubt.studentClass}</td>
                        <td>{doubt.subject}</td>
                        <td>
                          <button
                            className=" p-1"
                            value={doubt.doubtText}
                            onClick={modBoth}
                          >
                            View
                          </button>
                        </td>
                        <td>
                          {/* {doubt.status === "Pending" && ( */}
                          <>
                            <button
                              onClick={() => {
                                handleAcceptDoubt(
                                  doubt._id,
                                  doubt.studentId,
                                  doubt.studName
                                ),
                                  handleInfo(doubt.studentId, doubt.studName),
                                  handleInfo2(doubt.studentId, doubt.studName);
                              }}
                            >
                              Accept
                            </button>
                          </>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Lottie play animationData={avail} className="w-[90%]" />
              <div className="text-5xl font-bold nodoubt">No Doubts Available</div>
            </div>
          )}
        </div>
      </div>
      {toggle && (
        <div className="modal z-10 absolute flex flex-col justify-center items-center  w-[100vw] h-[100vh]">
          <div
            onClick={handleToggle}
            className="overlay bg-[rgba(49,49,49,0.8)] absolute flex flex-col justify-center items-center w-[100vw] h-[100vh] "
          >
            <div className="bg-white flex flex-col items-center justify-center text-center opacity-100 w-[30%] p-2">
              <div className="content font-bold ">{doubti}</div>
              <button onClick={handleToggle}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoubtAccept