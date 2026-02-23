import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';

const ViewAttendance = ({ list, attendance }) => {
    const [selectedBatch, setSelectedBatch] = useState("");
    const Navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const batchFromURL = searchParams.get("batch");

        if (batchFromURL) {
            setSelectedBatch(batchFromURL);
        }
    }, [searchParams, attendance]);

    const batchList = [...new Set(attendance.map(item => item.batch))];

    const handleEdit = (date, batch) => {
        Navigate(`/dashboard/takeattendance?date=${date}&batch=${batch}`);
    };
    const filteredAttendance = selectedBatch
        ? attendance.filter(item => item.batch === selectedBatch)
        : [];

    const groupedAttendance = filteredAttendance.reduce((acc, entry) => {
        if (!acc[entry.batch]) {
            acc[entry.batch] = [];
        }
        acc[entry.batch].push(entry);
        return acc;
    }, {});
    return (
        <>
            <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Tables /</span> Attendance Records</h4>
            <div className="card">
                <h5 className="card-header">Student Attendance Details</h5>
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

                {
                    !selectedBatch ? (
                        <div className="text-center p-5">
                            <h6 className="text-muted">
                                Please select a batch to view attendance
                            </h6>
                        </div>
                    ) : filteredAttendance.length === 0 ? (
                        <div className="text-center p-5">
                            <h6 className="text-muted">
                                No attendance records for this batch
                            </h6>
                        </div>
                    ) : (
                        Object.keys(groupedAttendance).map((batchName) => (
                            <div key={batchName} className="card mb-4 p-3">

                                <h4 className="text-primary mb-3">
                                    Batch: {batchName}
                                </h4>

                                {
                                    groupedAttendance[batchName].map((entry, index) => (
                                        <div key={index} className="card mb-3 p-3">

                                            <h5>Date: {entry.date}</h5>

                                            <button
                                                className="btn btn-secondary mb-3"
                                                onClick={() =>
                                                    handleEdit(entry.date, entry.batch)
                                                }
                                            >
                                                Edit Attendance
                                            </button>

                                            <div className="table-responsive">
                                                <table className="table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Student Name</th>
                                                            <th>Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {entry.records?.length > 0 ? (
                                                            entry.records.map((value, i) => {
                                                                const std = list.find(
                                                                    (s) =>
                                                                        s.id == value.studentId &&
                                                                        s.batch === entry.batch
                                                                );

                                                                return (
                                                                    <tr key={value.studentId}>
                                                                        <td>{i + 1}</td>
                                                                        <td>{std?.name}</td>
                                                                        <td>
                                                                            <span
                                                                                className={`badge ${value.status === "Present"
                                                                                    ? "bg-success"
                                                                                    : "bg-danger"
                                                                                    }`}
                                                                            >
                                                                                {value.status}
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })
                                                        ) : (
                                                            <tr>
                                                                <td colSpan="3" className="text-center text-muted">
                                                                    No records found
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>
                                    ))
                                }

                            </div>
                        ))
                    )
                }
            </div>
            <hr className="my-5" />
        </>
    )
}

export default ViewAttendance
