import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { MdAdd, MdSearch } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import { Container, DataManager, Data } from './styles';

export default function Students() {
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

  async function handleDeleteStudent({ id, name }) {
    if (window.confirm(`Tem certeza que deseja deletar o usuário ${name} ?`))  //eslint-disable-line
      try {
        await api.delete(`/students/${id}`);
        setStudents(students.filter(student => student.id !== id));
        toast.success('Aluno removido');
      } catch (err) {
        const { error } = err.response.data;
        toast.error(error);
      }
  }

  return (
    <Container>
      <DataManager>
        <strong>Gerenciando alunos</strong>
        <button type="button" onClick={() => history.push('/students/new')}>
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
            <th aria-label="Empty header column" />
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td>
                <button
                  type="button"
                  onClick={() => history.push(`/students/${student.id}/edit`)}
                >
                  editar
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteStudent(student)}
                >
                  apagar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Data>
    </Container>
  );
}
