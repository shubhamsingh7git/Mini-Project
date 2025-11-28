import React, { useState, useEffect } from 'react';

function ResultTab({ results, students, onAdd, onEdit, onDelete }) {
  const [filteredResults, setFilteredResults] = useState(results);
  const [studentFilter, setStudentFilter] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');

  useEffect(() => {
    filterResults();
  }, [results, studentFilter, subjectFilter]);

  const filterResults = () => {
    let filtered = results;

    if (studentFilter) {
      filtered = filtered.filter(r => r.studentId === parseInt(studentFilter));
    }

    if (subjectFilter) {
      filtered = filtered.filter(r => r.subject === subjectFilter);
    }

    setFilteredResults(filtered);
  };

  const getStudentName = (studentId) => {
    const student = students.find(s => s.id === studentId);
    return student ? student.name : 'Unknown';
  };

  const getGradeClass = (grade) => {
    const gradeMap = {
      'A+': 'grade-a-plus',
      'A': 'grade-a',
      'B': 'grade-b',
      'C': 'grade-c',
      'D': 'grade-d',
      'F': 'grade-f'
    };
    return gradeMap[grade] || '';
  };

  const uniqueStudents = [...new Set(results.map(r => r.studentId))];
  const uniqueSubjects = [...new Set(results.map(r => r.subject))];

  return (
    <div>
      <div className="section-header">
        <h2>Result Management</h2>
        <button className="btn-primary" onClick={onAdd}>
          <span>+</span>
          Add New Result
        </button>
      </div>

      <div className="filters">
        <div className="filter-group">
          <select 
            value={studentFilter} 
            onChange={(e) => setStudentFilter(e.target.value)}
          >
            <option value="">All Students</option>
            {uniqueStudents.map(id => (
              <option key={id} value={id}>{getStudentName(id)}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <select 
            value={subjectFilter} 
            onChange={(e) => setSubjectFilter(e.target.value)}
          >
            <option value="">All Subjects</option>
            {uniqueSubjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Subject</th>
            <th>Marks</th>
            <th>Grade</th>
            <th>Exam Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredResults.length === 0 ? (
            <tr>
              <td colSpan="6" className="empty-state">
                No results found. Add a new result to get started.
              </td>
            </tr>
          ) : (
            filteredResults.map(result => (
              <tr key={result.id}>
                <td>{getStudentName(result.studentId)}</td>
                <td>{result.subject}</td>
                <td>{result.marks}</td>
                <td>
                  <span className={`grade-badge ${getGradeClass(result.grade)}`}>
                    {result.grade}
                  </span>
                </td>
                <td>{result.examDate || '-'}</td>
                <td>
                  <div className="actions">
                    <button className="btn-secondary" onClick={() => onEdit(result)}>
                      Edit
                    </button>
                    <button className="btn-danger" onClick={() => onDelete(result.id)}>
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

export default ResultTab;