import React from 'react';

function StudentTab({ students, onAdd, onEdit, onDelete }) {
  return (
    <div>
      <div className="section-header">
        <h2>Student Management</h2>
        <button className="btn-primary" onClick={onAdd}>
          <span>+</span>
          Add New Student
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Section</th>
            <th>Enrollment Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="5" className="empty-state">
                No students found. Add a new student to get started.
              </td>
            </tr>
          ) : (
            students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.section || '-'}</td>
                <td>{student.enrollmentDate || '-'}</td>
                <td>
                  <div className="actions">
                    <button className="btn-secondary" onClick={() => onEdit(student)}>
                      Edit
                    </button>
                    <button className="btn-danger" onClick={() => onDelete(student.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTab;