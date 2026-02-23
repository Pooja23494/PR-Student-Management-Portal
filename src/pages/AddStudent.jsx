import React from 'react'

const AddStudent = ({ student, handleChange, handleSubmit, courseList, batchList }) => {
    return (
        <>
            <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Forms/</span> {student.id ? 'UPDATE' : 'ADD'} STUDENT</h4>
            <div className="row">
                {/* Basic with Icons */}
                <div className="col-xxl">
                    <div className="card mb-4">
                        <div className="card-header d-flex align-items-center justify-content-between">
                            <h5 className="mb-0"> {student.id ? 'Update' : 'Add'} Student Details</h5>
                        </div>
                        <div className="card-body">
                            <form method='post' onSubmit={handleSubmit}>
                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label" htmlFor="name">Name</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="name" name='name' onChange={handleChange} value={student.name || ''} placeholder="John Doe" aria-label="John Doe" aria-describedby="basic-icon-default-fullname2" required />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label" htmlFor="email">Email</label>
                                    <div className="col-sm-10">
                                        <div className="input-group input-group-merge">
                                            <input type="email" id="email" name='email' onChange={handleChange} value={student.email || ''} className="form-control" placeholder="john.doe" aria-label="john.doe" aria-describedby="basic-icon-default-email2" required />
                                            <span id="email2" className="input-group-text">@example.com</span>
                                        </div>
                                        <div className="form-text">You can use letters, numbers &amp; periods</div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-2 form-label" htmlFor="contact">Phone No</label>
                                    <div className="col-sm-10">
                                        <input type="text" id="contact" name='contact' onChange={handleChange} value={student.contact || ''} className="form-control phone-mask" placeholder="658 799 8941" aria-label="658 799 8941" aria-describedby="basic-icon-default-phone2" required />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label" htmlFor="course">Course</label>
                                    <div className="col-sm-10">
                                        <select
                                            id="course"
                                            name="course"
                                            className="form-select"
                                            value={student.course || ""}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Course</option>
                                            {courseList.map((course, index) => (
                                                <option key={index} value={course}>
                                                    {course}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label" htmlFor="batch">Batch</label>
                                    <div className="col-sm-10">
                                        <select
                                            id="batch"
                                            name="batch"
                                            className="form-select"
                                            value={student.batch || ""}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Batch</option>
                                            {batchList.map((batch, index) => (
                                                <option key={index} value={batch}>
                                                    {batch}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-2 form-label" htmlFor="address">Address</label>
                                    <div className="col-sm-10">
                                        <textarea id="address" name='address' onChange={handleChange} value={student.address || ''} className="form-control" placeholder="101A, Sai Apartment, India" aria-label="Hi, Do you have a moment to talk Joe?" aria-describedby="basic-icon-default-message2" required />
                                    </div>
                                </div>
                                <div className="row justify-content-end">
                                    <div className="col-sm-10">
                                        <button type="submit" className="btn btn-primary">{student.id ? 'Update' : 'Add'} Student</button>
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

export default AddStudent
