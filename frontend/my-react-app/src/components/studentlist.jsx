import React from 'react';

export default function StudentList({ students = [], onDelete, onEdit }) {
  if (!students.length) return <p>No students yet</p>;

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ borderBottom: '1px solid #ccc' }}>#</th>
          <th style={{ borderBottom: '1px solid #ccc' }}>Name</th>
          <th style={{ borderBottom: '1px solid #ccc' }}>Email</th>
          <th style={{ borderBottom: '1px solid #ccc' }}>Course</th>
          <th style={{ borderBottom: '1px solid #ccc' }}>Age</th>
          <th style={{ borderBottom: '1px solid #ccc' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map(s => (
          <tr key={s.id} style={{textAlign:"center"}}>
            <td style={{ padding: 6 }}>{s.id}</td>
            <td>{s.firstName} {s.lastName}</td>
            <td>{s.email}</td>
            <td>{s.course}</td>
            <td>{s.age ?? '-'}</td>
            <td>
              <button onClick={() => onEdit(s)} style={{border:"2px solid brown",padding:"5px",borderRadius: 5}}>Edit</button>
              <button onClick={() => onDelete(s.id)} style={{border:"2px solid brown",padding:"5px",margin:"5px",borderRadius: 5}}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
