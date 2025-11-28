import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import TabNavigation from './components/TabNavigation';
import StudentTab from './components/StudentTab';
import SectionTab from './components/SectionTab';
import ResultTab from './components/ResultTab';
import Modal from './components/Modal';
import Notification from './components/Notification';

function App() {
  const [activeTab, setActiveTab] = useState('students');
  const [students, setStudents] = useState([]);
  const [sections, setSections] = useState([
    { id: 1, name: 'Section A', description: 'Morning batch students' },
    { id: 2, name: 'Section B', description: 'Afternoon batch students' },
    { id: 3, name: 'Section C', description: 'Evening batch students' }
  ]);
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  const handleStudentSubmit = (formData) => {
    if (editingItem) {
      setStudents(students.map(s => s.id === editingItem.id ? { ...formData, id: editingItem.id } : s));
      showNotification('Student updated successfully!', 'success');
    } else {
      setStudents([...students, { ...formData, id: Date.now() }]);
      showNotification('Student added successfully!', 'success');
    }
    closeModal();
  };

  const handleSectionSubmit = (formData) => {
    if (editingItem) {
      setSections(sections.map(s => s.id === editingItem.id ? { ...formData, id: editingItem.id } : s));
      showNotification('Section updated successfully!', 'success');
    } else {
      setSections([...sections, { ...formData, id: Date.now() }]);
      showNotification('Section added successfully!', 'success');
    }
    closeModal();
  };

  const handleResultSubmit = (formData) => {
    const marks = parseInt(formData.marks);
    const grade = calculateGrade(marks);
    
    if (editingItem) {
      setResults(results.map(r => r.id === editingItem.id ? { ...formData, grade, id: editingItem.id } : r));
      showNotification('Result updated successfully!', 'success');
    } else {
      setResults([...results, { ...formData, grade, id: Date.now() }]);
      showNotification('Result added successfully!', 'success');
    }
    closeModal();
  };

  const deleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(s => s.id !== id));
      setResults(results.filter(r => r.studentId !== id));
      showNotification('Student deleted successfully!', 'success');
    }
  };

  const deleteSection = (id) => {
    if (window.confirm('Are you sure you want to delete this section?')) {
      setSections(sections.filter(s => s.id !== id));
      showNotification('Section deleted successfully!', 'success');
    }
  };

  const deleteResult = (id) => {
    if (window.confirm('Are you sure you want to delete this result?')) {
      setResults(results.filter(r => r.id !== id));
      showNotification('Result deleted successfully!', 'success');
    }
  };

  const calculateGrade = (marks) => {
    if (marks >= 90) return 'A+';
    if (marks >= 80) return 'A';
    if (marks >= 70) return 'B';
    if (marks >= 60) return 'C';
    if (marks >= 50) return 'D';
    return 'F';
  };

  return (
    <div className="App">
      <div className="container">
        <Header />
        
        <div className="card">
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="content">
            {activeTab === 'students' && (
              <StudentTab 
                students={students}
                sections={sections}
                onAdd={() => openModal('student')}
                onEdit={(student) => openModal('student', student)}
                onDelete={deleteStudent}
              />
            )}
            
            {activeTab === 'sections' && (
              <SectionTab 
                sections={sections}
                students={students}
                onAdd={() => openModal('section')}
                onEdit={(section) => openModal('section', section)}
                onDelete={deleteSection}
              />
            )}
            
            {activeTab === 'results' && (
              <ResultTab 
                results={results}
                students={students}
                onAdd={() => openModal('result')}
                onEdit={(result) => openModal('result', result)}
                onDelete={deleteResult}
              />
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <Modal
          type={modalType}
          item={editingItem}
          students={students}
          sections={sections}
          onClose={closeModal}
          onSubmitStudent={handleStudentSubmit}
          onSubmitSection={handleSectionSubmit}
          onSubmitResult={handleResultSubmit}
        />
      )}

      <Notification 
        show={notification.show}
        message={notification.message}
        type={notification.type}
      />
    </div>
  );
}

export default App;