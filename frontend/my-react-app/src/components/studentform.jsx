import React, { useEffect, useState } from 'react';

const empty = { firstName: '', lastName: '', email: '', course: '', age: '' };

export default function StudentForm({ onCreate, editing, onUpdate, onCancel }) {
  const [form, setForm] = useState(empty);

  useEffect(() => {
    if (editing) {
      setForm({
        firstName: editing.firstName || '',
        lastName: editing.lastName || '',
        email: editing.email || '',
        course: editing.course || '',
        age: editing.age || '',
      });
    } else {
      setForm(empty);
    }
  }, [editing]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function validate() {
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim()) {
      alert('Please fill first name, last name and email');
      return false;
    }
    return true;
  }

  function submit(e) {
    e.preventDefault();
    if (!validate()) return;
    const payload = { ...form, age: form.age ? Number(form.age) : null };
    if (editing) onUpdate(editing.id, payload);
    else onCreate(payload);
    setForm(empty);
  }

  return (
    <form onSubmit={submit} style={{ marginBottom: 20, padding: 12, border: '1px solid #ddd', borderRadius: 8 }}>
      <h3 style={{textAlign:"center"}}>{editing ? 'Edit Student' : 'Add Student'}st</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6,margin:"10px",padding:"10px"}}>
        <input name="firstName" placeholder="First name" value={form.firstName} onChange={handleChange}  style={{margin:"10px",padding:"10px"}}/>
        <input name="lastName" placeholder="Last name" value={form.lastName} onChange={handleChange} style={{margin:"10px",padding:"10px"}} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange}  style={{margin:"10px",padding:"10px"}}/>
        <input name="course" placeholder="Course" value={form.course} onChange={handleChange}  style={{margin:"10px",padding:"10px"}}/>
        <input name="age" placeholder="Age" value={form.age} onChange={handleChange}  style={{margin:"10px",padding:"10px"}}/>
      </div>
      <div style={{ marginTop: 10 }}>
        <button type="submit" style={{padding:"5px", borderRadius: 5}}>{editing ? 'Update' : 'Add'}</button>
        {editing && <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>Cancel</button>}
      </div>
    </form>
  );
}
