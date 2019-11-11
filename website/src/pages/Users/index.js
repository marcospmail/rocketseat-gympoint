import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { MdAdd, MdSearch } from 'react-icons/md';

import api from '~/services/api';

import { Container, DataManager, Data } from './styles';

export default function Users() {
  const [studentName, setStudentName] = useState();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    handleSearchStudents();
  }, []); //eslint-disable-line

  async function handleSearchStudents() {
    try {
      const response = await api.get('students', {
        params: { q: studentName },
      });

      setStudents(response.data);
    } catch (err) {
      toast.error('Ocorreu um erro ao buscar os estudantes');
    }
  }

  function handleStudentNameChange(e) {
    setStudentName(e.target.value);
  }

  return (
    <Container>
      <DataManager>
        <strong>Gerenciando alunos</strong>
        <button type="button">
          <MdAdd color="#fff" size={20} />
          <span>CADASTRAR</span>
        </button>
        <span>
          <MdSearch color="#999999" size={16} />
          <input
            name="studentName"
            placeholder="Buscar aluno"
            onKeyDown={event => event.key === 'Enter' && handleSearchStudents()}
            onChange={handleStudentNameChange}
          />
        </span>
      </DataManager>

      <Data>
        <thead>
          <tr>
            <th>NOME</th>
            <th>E-MAIL</th>
            <th>IDADE</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td>
                <Link
                  to={`/users/${student.id}/edit`}
                  params={{ testvalue: 'hello' }}
                >
                  editar
                </Link>
                <Link to="/">apagar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Data>
    </Container>
  );
}
