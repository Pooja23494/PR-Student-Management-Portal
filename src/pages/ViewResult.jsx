import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';

const ViewResult = ({ list, setList }) => {

    const [selectedBatch, setSelectedBatch] = useState("");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
    const batchFromURL = searchParams.get("batch");

    if (batchFromURL) {
        setSelectedBatch(batchFromURL);
    }
}, [searchParams]);

    const handleDeleteTest = (studentId, testIndex) => {
        const updatedList = list.map((std) => {
            if (std.id === studentId) {
                const updatedTest = std.tests.filter((_, index) => index !== testIndex);
                return { ...std, tests: updatedTest };
            }
            return std;
        });
        setList(updatedList);
        localStorage.setItem('student', JSON.stringify(updatedList));
    }
    const batchList = [...new Set(list.map(student => student.batch))];
    const filteredStudents = list.filter(student =>
        student.batch === selectedBatch &&
        student.tests &&
        student.tests.length > 0
    );
    return (
        <>
            <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Tables /</span> View Students Result</h4>
            <div className="card">
                <h5 className="card-header">All Students Result</h5>
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label ps-5" htmlFor='batch'>Select Batch</label>
                    <div className="col-sm-10">
                        <select
                            className="form-select"
                            value={selectedBatch || ''}
                            onChange={(e) => setSelectedBatch(e.target.value)}
                            required
                        >
                            <option value="">Select Batch</option>
                            {batchList.map((batch, index) => (
                                <option key={index} value={batch}>
                                    {batch}
                                </option>
                            ))}
                        </select>
                        {!selectedBatch && <p>Please select batch first</p>}
                    </div>
                </div>
                <div className='table-responsive'>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>#.</th>
                                <th>Student Name</th>
                                <th>Batch</th>
                                <th>Mock Round</th>
                                <th>Theory Exam</th>
                                <th>Practical Exam</th>
                                <th>Total Marks</th>
                                <th>Percentage</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                            {
                                !selectedBatch ? (
                                    <tr>
                                        <td colSpan="9" className="text-center text-muted p-4">
                                            Please select a batch to view results
                                        </td>
                                    </tr>
                                ) : filteredStudents.length === 0 ? (
                                    <tr>
                                        <td colSpan="9" className="text-center text-muted p-4">
                                            No test results available for this batch
                                        </td>
                                    </tr>
                                ) : (
                                    filteredStudents.map((student) =>
                                        student.tests.map((test, index) => (
                                            <tr key={`${student.id}-${index}`}>
                                                <td>{index + 1}</td>
                                                <td>{student.name}</td>
                                                <td>{student.batch}</td>
                                                <td>{test.mark1}</td>
                                                <td>{test.mark2}</td>
                                                <td>{test.mark3}</td>
                                                <td>{test.total}</td>
                                                <td>{test.percentage}%</td>
                                                <td>
                                                    <div className="dropdown">
                                                        <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                            <i className="bx bx-dots-vertical-rounded" />
                                                        </button>
                                                        <div className="dropdown-menu">
                                                            <button
                                                                className="dropdown-item"
                                                                type="button"
                                                                onClick={() =>
                                                                    navigate(`/dashboard/assigntest?studentId=${student.id}&testIndex=${index}`)
                                                                }
                                                            >
                                                                Edit
                                                            </button>

                                                            <button
                                                                className="dropdown-item"
                                                                type="button"
                                                                onClick={() => {
                                                                    if (window.confirm("Delete this test result?")) {
                                                                        handleDeleteTest(student.id, index);
                                                                    }
                                                                }}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <hr className="my-5" />
        </>
    )
}

export default ViewResult
