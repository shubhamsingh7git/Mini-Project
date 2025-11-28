import React, { useState, useEffect } from 'react';

function Modal({ type, item, students, sections, onClose, onSubmitStudent, onSubmitSection, onSubmitResult }) {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({});
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === 'student') {
      if (!formData.name || !formData.email) {
        setError('Please fill in all required fields');
        return;
      }
      onSubmitStudent(formData);
    } else if (type === 'section') {
      if (!formData.name) {
        setError('Please fill in all required fields');
        return;
      }
      onSubmitSection(formData);
    } else if (type === 'result') {
      if (!formData.studentId || !formData.subject || !formData.marks) {
        setError('Please fill in all required fields');
        return;
      }
      const marks = parseInt(formData.marks);
      if (marks < 0 || marks > 100) {
        setError('Marks must be between 0 and 100');
        return;
      }
      onSubmitResult({ ...formData, studentId: parseInt(formData.studentId), marks });
    }
  };

  const getTitle = () => {
    if (type === 'student') return item ? 'Edit Student' : 'Add New Student';
    if (type === 'section') return item ? 'Edit Section' : 'Add New Section';
    if (type === 'result') return item ? 'Edit Result' : 'Add New Result';
    return '';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{getTitle()}</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {type === 'student' && (
              <>
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Section</label>
                  <select
                    name="section"
                    value={formData.section || ''}
                    onChange={handleChange}
                  >
                    <option value="">Select Section</option>
                    {sections.map(s => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Enrollment Date</label>
                  <input
                    type="date"
                    name="enrollmentDate"
                    value={formData.enrollmentDate || ''}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            {type === 'section' && (
              <>
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description || ''}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            {type === 'result' && (
              <>
                <div className="form-group">
                  <label>Student *</label>
                  <select
                    name="studentId"
                    value={formData.studentId || ''}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Student</option>
                    {students.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Marks (0-100) *</label>
                  <input
                    type="number"
                    name="marks"
                    min="0"
                    max="100"
                    value={formData.marks || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Exam Date</label>
                  <input
                    type="date"
                    name="examDate"
                    value={formData.examDate || ''}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            {error && <div className="error-text">{error}</div>}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {item ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;