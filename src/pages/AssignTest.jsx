import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom";

const AssignTest = ({ list, setList }) => {

    const [testData, setTestData] = useState({});
    const location = useLocation();
    const navigate = useNavigate();
    const [editingIndex, setEditingIndex] = useState(null);

    const queryParams = new URLSearchParams(location.search);
    const studentId = queryParams.get("studentId");
    const testIndex = queryParams.get("testIndex");

    useEffect(() => {

        if (studentId !== null && testIndex !== null) {

            const selectedStudent = list.find(
                (std) => std.id == studentId
            );

            if (selectedStudent && selectedStudent.tests) {

                const selectedTest = selectedStudent.tests[testIndex];

                if (selectedTest) {
                    setTestData({
                        studentId: Number(studentId),
                        batch: selectedStudent.batch,
                        mark1: selectedTest.mark1,
                        mark2: selectedTest.mark2,
                        mark3: selectedTest.mark3
                    });

                    setEditingIndex(Number(testIndex));
                }
            }
        }

    }, [studentId, testIndex, list]);

    const handleStudentChange = (e) => {
        const studentId = Number(e.target.value)

        const selectedStudent = list.find(
            (std) => std.id === studentId
        )

        setTestData({
            ...testData,
            studentId: studentId,
            batch: selectedStudent ? selectedStudent.batch : ""
        })
    }

    const handleChange = (e) => {
        setTestData({
            ...testData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const total =
            Number(testData.mark1) +
            Number(testData.mark2) +
            Number(testData.mark3);

        const percentage = total.toFixed(2);

        const updatedList = list.map((student) => {

            if (Number(student.id) === Number(testData.studentId)) {

                if (editingIndex !== null) {
                    const updatedTests = student.tests.map((test, i) =>
                        i === editingIndex
                            ? {
                                mark1: Number(testData.mark1),
                                mark2: Number(testData.mark2),
                                mark3: Number(testData.mark3),
                                total,
                                percentage
                            }
                            : test
                    );

                    return { ...student, tests: updatedTests };
                }
                return {
                    ...student,
                    tests: [
                        ...(student.tests || []),
                        {
                            mark1: Number(testData.mark1),
                            mark2: Number(testData.mark2),
                            mark3: Number(testData.mark3),
                            total,
                            percentage
                        }
                    ]
                };
            }

            return student;
        });

        setList(updatedList);
        localStorage.setItem("student", JSON.stringify(updatedList));

        alert(editingIndex !== null
            ? "Test Updated Successfully"
            : "Test Assigned Successfully"
        );

        setTestData({});
        setEditingIndex(null);

        navigate(`/dashboard/viewresult?batch=${testData.batch}`);
    };

    const total =
        Number(testData.mark1 || 0) +
        Number(testData.mark2 || 0) +
        Number(testData.mark3 || 0);

    const percentage =
        total > 0 ? total.toFixed(2) : 0;

    return (
        <>
            <h4 className="fw-bold py-3 mb-4">
                <span className="text-muted fw-light">Forms /</span>
                {editingIndex !== null ? " Update Test" : " Assign Test"}
            </h4>

            <div className="card p-4">
                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label">Select Student</label>
                        <select
                            className="form-select"
                            value={testData.studentId || ''}
                            onChange={handleStudentChange}
                            required
                        >
                            <option value="">Select Student</option>
                            {list.map((std) => (
                                <option key={std.id} value={std.id}>
                                    {std.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Batch</label>
                        <input
                            type="text"
                            className="form-control"
                            value={testData.batch || ''}
                            readOnly
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Mock Round</label>
                        <input
                            type="number"
                            name="mark1"
                            max={20}
                            value={testData.mark1 || ''}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                        <div className="form-text">You can give marks out of 20</div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Theory Exam</label>
                        <input
                            type="number"
                            name="mark2"
                            max={30}
                            value={testData.mark2 || ''}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                        <div className="form-text">You can give marks out of 30</div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Practical Exam</label>
                        <input
                            type="number"
                            name="mark3"
                            max={50}
                            value={testData.mark3 || ''}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                        <div className="form-text">You can give marks out of 50</div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Total (Out of 100)</label>
                        <input
                            type="text"
                            className="form-control"
                            value={total}
                            readOnly
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Percentage</label>
                        <input
                            type="text"
                            className="form-control"
                            value={percentage + "%"}
                            readOnly
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        {editingIndex !== null ? "Update Test" : "Assign Test"}
                    </button>

                </form>
            </div>
        </>
    )
}

export default AssignTest;
