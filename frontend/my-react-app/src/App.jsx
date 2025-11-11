import React, { useEffect, useState } from 'react';
import api from './api';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';

export default function App() {
  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchStudents = async () => {
    try {
      const res = await api.get('/students');
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      alert('Could not fetch students');
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const onCreate = async (data) => {
    try {
      await api.post('/students', data);
      fetchStudents();
    } catch (err) {
      console.error(err);
      alert('Failed to create student. Make sure email is unique.');
    }
  };

  const onUpdate = async (id, data) => {
    try {
      await api.put(`/students/${id}`, data);
      setEditing(null);
      fetchStudents();
    } catch (err) {
      console.error(err);
      alert('Failed to update student.');
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm('Delete this student?')) return;
    try {
      await api.delete(`/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.error(err);
      alert('Failed to delete');
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '10px auto',border:"5px solid #c20a50ff",borderRadius:"10px",boxShadow:"5px 5px 5px #f84109ff" }}>
      <h1 style={{textAlign:"center"}}>Students List</h1>
      <StudentForm onCreate={onCreate} editing={editing} onUpdate={onUpdate} onCancel={() => setEditing(null)} />
      <StudentList students={students} onDelete={onDelete} onEdit={(s) => setEditing(s)} />
    </div>
  );
}
