import React from 'react';

function SectionTab({ sections, students, onAdd, onEdit, onDelete }) {
  const getSectionStudentCount = (sectionName) => {
    return students.filter(s => s.section === sectionName).length;
  };

  return (
    <div>
      <div className="section-header">
        <h2>Section Management</h2>
        <button className="btn-primary" onClick={onAdd}>
          <span>+</span>
          Add New Section
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Total Students</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sections.map(section => (
            <tr key={section.id}>
              <td>{section.name}</td>
              <td>{section.description}</td>
              <td>{getSectionStudentCount(section.name)}</td>
              <td>
                <div className="actions">
                  <button className="btn-secondary" onClick={() => onEdit(section)}>
                    Edit
                  </button>
                  <button className="btn-danger" onClick={() => onDelete(section.id)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SectionTab;