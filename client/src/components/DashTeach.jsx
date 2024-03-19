import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
var ValuePiece = /** @type {Date | null} */ (null);
var Value = /** @type {ValuePiece | [ValuePiece, ValuePiece]} */ (null);
import Navbar from './Navbar'
import teacher from "../images/teacher.png"
import Table from './Table';
import Nav2 from './Nav2';
const DashTeach = () => {
    const [value, onChange] = useState(new Date());
    const [tables, setTable] = useState(true);
    const [table1, setTable1] = useState(false);
    const [color, setColor] = useState('black');
    const [color2, setColor2] = useState('black');
    const handleColorChange = () => {
        const randomColor = "white";
        setColor(randomColor);
      };
      const handleColorChange2 = () => {
        const randomColor = "white";
        setColor2(randomColor);
      };
    const data = [
        { name: "Anom", age: "blah blah", gender: "6:30pm" , review:"badd "},
        { name: "Megha", age: 19, gender: "6:30pm" , review:"badd"},
        { name: "Subham", age: 25, gender: "6:30pm" , review:"very good "},
    ]
    const data2 = [
        { name: "Anom", topic: "blah blah",time: "6:30pm" , availability:"badd "},
        { name: "Megha", topic: 19, time: "6:30pm" , availability:"badd"},
        { name: "Subham", topic: 25, time: "6:30pm" , availability:"very good "},
    ]
    const handleCombinedClick = () => {
        handleColorChange();
        toggle();
      };
      const handleCombinedClick2 = () => {
        handleColorChange2();
        toggle2();
      };
    const toggle = ()=>{
        setTable(true);
        setTable1(false);
    }
    const toggle2 = ()=>{
      setTable(false);
      setTable1(true);
    }
  return (
    <div className="dash h-[110vh]">
      <Nav2 className="nav3" />
      <div className="flex">
        <div className="ml-10">
          <div className="w-[60%] relative flex justify-around items-center  rounded-xl p-2 user mt-10 ml-36 pl-[4.5rem
          ]">
            <div className="w-[66%]">
              <h1 className="text-4xl font-bold">Welcome back , User!</h1>
              <h2 className=" text-xl mt-4 font-medium">
                Fuel the Future with Curiosity: Embrace Questions and Ignite
                Lifelong Learning.
              </h2>
            </div>
            <div className="w-[40%] relative flex justify-around items-center">
              <img src={teacher} className="w-[50%]" />
            </div>
          </div>
          <div className="flex gap-4 p-2 rounded-xl justify-around doubts w-[50%] h-[20%] items-center mt-[5%] ml-[13%]">
            <h1 className="text-5xl text-white">Total Doubts Taken :</h1>
            <h1 className="text-5xl text-white">8</h1>
          </div>
          <div className="">
            <div className="mt-10  w-[72%] ml-[9.8rem]">
              <div className="flex gap-5 ">
                <h1
                  className="font-bold text-2xl rounded-md p-2 bg-red-300 cursor-pointer"
                  style={{ color }}
                  onClick={handleCombinedClick}
                >
                  Previous Sessions
                </h1>
                <h1
                  className="font-bold text-2xl rounded-md p-2 bg-red-300 cursor-pointer"
                  style={{ color2 }}
                  onClick={handleCombinedClick2}
                >
                  Available Sessions
                </h1>
              </div>
            </div>
            <div>
              {tables && (
                <table>
                  <tr>
                    <th>Student Name</th>
                    <th>Doubt</th>
                    <th>Time Posted</th>
                    <th>Review</th>
                    {/* <th>Not Available</th> */}
                  </tr>
                  {data.map((val, key) => {
                    return (
                      <tr key={key}>
                        <td>{val.name}</td>
                        <td>{val.age}</td>
                        <td>{val.gender}</td>
                        <td>{val.review}</td>
                        <td>{val.available}</td>
                      </tr>
                    );
                  })}
                </table>
              )}

              {table1 && (
                <table className="">
                  <tr>
                    <th>Student Name</th>
                    <th>Doubt</th>
                    <th>Time Posted</th>
                    <th>Review</th>
                    {/* <th>Not Available</th> */}
                  </tr>
                  {data2.map((val, key) => {
                    return (
                      <tr key={key}>
                        <td>{val.name}</td>
                        <td>{val.age}</td>
                        <td>{val.gender}</td>
                        <td>{val.review}</td>
                        <td>{val.available}</td>
                      </tr>
                    );
                  })}
                </table>
              )}
            </div>
          </div>
        </div>
        <div className="w-[30%] pt-10">
          <div className="Sample__container ">
            <main className="Sample__container__content w-[90%] rounded-xl">
              <Calendar
                onChange={onChange}
                showWeekNumbers
                value={value}
                className="rounded-xl"
              />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashTeach