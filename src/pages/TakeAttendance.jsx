import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';

const TakeAttendance = ({ list, attendance, setAttendance }) => {
    const [selectedDate, setSelectedDate] = useState("");
    const [records, setrecords] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [searchParams] = useSearchParams();
    const [selectedBatch, setSelectedBatch] = useState("");
    const Navigate = useNavigate();
    const batchList = [...new Set(list.map(std => std.batch))];
    const filteredStudents = list.filter(
        std => std.batch === selectedBatch
    );

    useEffect(() => {
        const dateFromURL = searchParams.get("date");
        const batchFromURL = searchParams.get("batch");

        if (dateFromURL && batchFromURL) {
            setSelectedBatch(batchFromURL);
            setSelectedDate(dateFromURL);

            const oldEntry = attendance.find(
                item =>
                    item.date === dateFromURL &&
                    item.batch === batchFromURL
            );

            if (oldEntry) {
                const loaded = {};
                oldEntry.records.forEach((data) => {
                    loaded[data.studentId] = data.status;
                });

                setrecords(loaded);
                setIsEdit(true);
            }
        }
    }, [searchParams]);

    const handleStatus = (id, status) => {
        setrecords((prev) => ({
            ...prev,
            [id]: status,
        }));
    };
    const handleDate = (date) => {
        setSelectedDate(date);

        const oldEntry = attendance.find(
            item => item.date === date && item.batch === selectedBatch
        );

        if (oldEntry) {
            const loaded = {};
            oldEntry.records.forEach((data) => {
                loaded[data.studentId] = data.status;
            });

            setrecords(loaded);
            setIsEdit(true);
        } else {
            setrecords({});
            setIsEdit(false);
        }
    };
    const handleSave = (e) => {
        e.preventDefault();

        if (!selectedDate || !selectedBatch) {
            alert("Please select batch and date!");
            return;
        }

        const formatted = filteredStudents.map((std) => ({
            studentId: std.id,
            status: records[std.id] || "Absent",
        }));

        if (isEdit) {
            const updated = attendance.map((item) => {
                if (
                    item.date === selectedDate &&
                    item.batch === selectedBatch
                ) {
                    return { ...item, records: formatted };
                }
                return item;
            });

            setAttendance(updated);
            alert("Attendance updated Successfully.");
            Navigate(`/dashboard/viewAttendance?batch=${selectedBatch}`, { replace: true });
            return;
        } else {
            const alreadyExists = attendance.find(
                (item) =>
                    item.date === selectedDate &&
                    item.batch === selectedBatch
            );

            if (alreadyExists) {
                alert("Attendance already exists for this batch and date.");
                return;
            }

            const newEntry = {
                date: selectedDate,
                batch: selectedBatch,
                records: formatted,
            };

            setAttendance([...attendance, newEntry]);
            alert("Attendance Saved Successfully.");
        }

        setrecords({});
        setIsEdit(false);
        setSelectedDate("");
        setSelectedBatch("");
    };
    return (
        <>
            <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Forms/</span>{isEdit ? "UPDATE" : "TAKE"} ATTENDANCE</h4>
            <div className="row">
                {/* Basic with Icons */}
                <div className="col-xxl">
                    <div className="card mb-4">
                        <div className="card-header d-flex align-items-center justify-content-between">
                            <h5 className="mb-0"> Student Attendance</h5>
                        </div>
                        <div className="card-body">
                            <form method='post' onSubmit={handleSave}>
                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label" htmlFor='batch'>Select Batch</label>
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
                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label" htmlFor="date">Select Date</label>
                                    <div className="col-sm-10">
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={selectedDate}
                                            onChange={(e) => handleDate(e.target.value)}
                                            disabled={!selectedBatch}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className='table-responsive'>
                                        <table className='table'>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Present</th>
                                                    <th>Absent</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {!selectedBatch ? (
                                                    <tr>
                                                        <td colSpan="4" className="text-center">
                                                            Please select a batch first.
                                                        </td>
                                                    </tr>
                                                ) : filteredStudents.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="4" className="text-center">
                                                            No students available in this batch.
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    filteredStudents.map((std, index) => (
                                                        <tr key={std.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{std.name}</td>
                                                            <td>
                                                                <input
                                                                    type="radio"
                                                                    name={`status-${std.id}`}
                                                                    checked={records[std.id] === "Present"}
                                                                    onChange={() => handleStatus(std.id, "Present")}
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="radio"
                                                                    name={`status-${std.id}`}
                                                                    checked={records[std.id] === "Absent"}
                                                                    onChange={() => handleStatus(std.id, "Absent")}
                                                                />
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="row justify-content-end">
                                    <div className="col-sm-10">
                                        <button type="submit" className="btn btn-primary">{isEdit ? "Update" : "Save"} Attendance</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TakeAttendance
