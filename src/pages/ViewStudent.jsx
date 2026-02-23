import React from 'react'

const ViewStudent = ({ list, handleDelete, handleEdit }) => {
    return (
        <>
            <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Tables /</span> View Students</h4>
            <div className="card">
                <h5 className="card-header">Student Details</h5>
                <div className='table-responsive'>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>#.</th>
                                <th>Student Name</th>
                                <th>Email Address</th>
                                <th>Phone Number</th>
                                <th>Course</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                            {
                                list.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center text-muted py-4">
                                            No students available.
                                        </td>
                                    </tr>
                                ) : (
                                    list.map((value, index) => (
                                        <tr key={value.id}>
                                            <td>{index + 1}</td>
                                            <td>{value.name}</td>
                                            <td>{value.email}</td>
                                            <td>{value.contact}</td>
                                            <td>{value.course}</td>
                                            <td>
                                                <div className="dropdown">
                                                    <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                        <i className="bx bx-dots-vertical-rounded" />
                                                    </button>
                                                    <div className="dropdown-menu">
                                                        <button
                                                            className="dropdown-item"
                                                            type="button"
                                                            onClick={() => handleEdit(value.id)}
                                                        >
                                                            <i className="bx bx-edit-alt me-1" /> Edit
                                                        </button>

                                                        <button
                                                            className="dropdown-item"
                                                            type="button"
                                                            onClick={() => {
                                                                const confirmDelete = window.confirm(
                                                                    "Are you sure you want to delete this student?"
                                                                );
                                                                if (confirmDelete) {
                                                                    handleDelete(value.id);
                                                                }
                                                            }}
                                                        >
                                                            <i className="bx bx-trash me-1" /> Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
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

export default ViewStudent
