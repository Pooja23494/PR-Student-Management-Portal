import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AddStudent from './pages/AddStudent';
import ViewStudent from './pages/ViewStudent';
import TakeAttendance from './pages/TakeAttendance';
import ViewAttendance from './pages/ViewAttendance';
import Login from './pages/Login';

const App = () => {
  const [student, setStudent] = useState({});
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const Navigate = useNavigate();

  const [attendance, setAttendance] = useState(
    JSON.parse(localStorage.getItem("attendance")) || []
  );

  useEffect(() => {
    localStorage.setItem("attendance", JSON.stringify(attendance));
  }, [attendance]);

  const filteredList = list.filter((student) =>
    student.name?.toLowerCase().includes(search.toLowerCase()) ||
    student.course?.toLowerCase().includes(search.toLowerCase()) ||
    student.email?.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    let oldList = JSON.parse(localStorage.getItem('student')) || [];
    setList(oldList);
  }, []);

  useEffect(() => {
    localStorage.setItem("student", JSON.stringify(list));
  }, [list]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let newList = [];

    if (student.id) {
      newList = list.map((std) => {
        if (std.id === student.id) {
          return student;
        }
        return std;
      }
      );
      alert("Student data updated Successfully")
      Navigate('/dashboard/viewstudent');
    } else {
      newList = [...list, { ...student, id: Date.now() }];
      alert("New Student data added Successfully")
    }
    setList(newList);
    localStorage.setItem('student', JSON.stringify(newList));
    setStudent({});
  };


  const handleDelete = (id) => {

    const updatedStudents = list.filter(
      (std) => std.id !== id
    );

    const updatedAttendance = attendance.map((entry) => {
      const filteredRecords = entry.records.filter(
        (record) => record.studentId !== id
      );

      return { ...entry, records: filteredRecords };
    });

    const cleanedAttendance = updatedAttendance.filter(
      (entry) => entry.records.length > 0
    );

    setList(updatedStudents);
    setAttendance(cleanedAttendance);

    localStorage.setItem('student', JSON.stringify(updatedStudents));
    localStorage.setItem('attendance', JSON.stringify(cleanedAttendance));
  }

  const handleEdit = (id) => {
    let data = list.find(std => std.id == id);
    setStudent(data);
    Navigate('/dashboard/addstudent');
  }
  const courseList = [
    "Frontend Development",
    "Backend Development",
    "Full Stack Development"
  ];

  const batchList = [
    "HTML5 & CSS3",
    "JAVASCRIPT",
    "DSA",
    "BOOTSTRAP",
    "REACT JS",
    "NODE JS"
  ];
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/dashboard" element={<Layout search={search} setSearch={setSearch} />}>
          <Route path='/dashboard' element={<Dashboard list={list} />} />
          <Route path="addstudent" element={<AddStudent student={student} handleChange={handleChange} handleSubmit={handleSubmit} courseList={courseList} batchList={batchList} />} />
          <Route path="viewstudent" element={<ViewStudent list={filteredList} handleDelete={handleDelete} handleEdit={handleEdit} />} />
          <Route path='takeattendance' element={<TakeAttendance list={list} attendance={attendance} setAttendance={setAttendance} />} />
          <Route path='viewattendance' element={<ViewAttendance list={list} attendance={attendance} />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
