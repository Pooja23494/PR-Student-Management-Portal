import React, { useEffect, useState } from "react";

const Dashboard = () => {

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("student")) || [];
    const storedAttendance = JSON.parse(localStorage.getItem("attendance")) || [];
    setStudents(storedData);
    setAttendance(storedAttendance);
  }, []);

  const totalStudents = students.length;

  const totalResults = students.filter(
    (std) => std.tests && std.tests.length > 0
  ).length;

  const totalAttendance = attendance.length;

  const recentStudents = students.slice(-4).reverse();

  return (
    <div className="container-fluid">
      <div className="row">

        {/* ==== STAT CARDS ==== */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6>Total Students</h6>
              <h3 className="fw-bold">{totalStudents}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6>Attendance Records</h6>
              <h3 className="fw-bold">{totalAttendance}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6>Results Available</h6>
              <h3 className="fw-bold">{totalResults}</h3>
            </div>
          </div>
        </div>

        {/* ==== STUDENT CHART ==== */}
        <div className="col-lg-8 mb-4">
          <div className="card shadow-sm border-0">
            <div className="card-header fw-semibold">
              Student Performance Overview
            </div>
            <div className="card-body text-center">
              <img
                src="./student_grades.png"
                alt="Student Management Chart"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>

        {/* ==== RECENT ADMISSIONS ==== */}
        <div className="col-lg-4 mb-4">
          <div className="card shadow-sm border-0">
            <div className="card-header fw-semibold">
              Recent Students
            </div>
            <div className="card-body">
              <ul className="list-unstyled mb-0">
                {recentStudents.length > 0 ? (
                  recentStudents.map((std) => (
                    <li key={std.id} className="mb-2">
                      • {std.name} - {std.course}
                    </li>
                  ))
                ) : (
                  <li>No Students Added Yet</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* ==== SYSTEM ACTIVITY ==== */}
        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm border-0">
            <div className="card-header fw-semibold">
              System Summary
            </div>
            <div className="card-body">
              <p>Total Students: <strong>{totalStudents}</strong></p>
              <p>Students with Results: <strong>{totalResults}</strong></p>
              <p>Attendance Records: <strong>{totalAttendance}</strong></p>
            </div>
          </div>
        </div>

        {/* ==== PROJECT INFO ==== */}
        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm border-0">
            <div className="card-header fw-semibold">
              Student Management Portal
            </div>
            <div className="card-body">
              <p>This dashboard is connected with:</p>
              <ul>
                <li>Student CRUD Module</li>
                <li>Attendance Module</li>
                <li>Test & Result Module</li>
                <li>LocalStorage Database</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;