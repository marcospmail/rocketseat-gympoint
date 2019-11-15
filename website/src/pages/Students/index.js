import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { MdAdd, MdSearch } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import { Container, DataHeader, Data, NoData, Paginator } from './styles';

export default function Students() {
  const [studentName, setStudentName] = useState();
  const [students, setStudents] = useState([]);
  const [lastPage, setLastPage] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fecthStudents(1);
  }, []); //eslint-disable-line

  async function fecthStudents(currentPage) {
    try {
      const { data } = await api.get('students', {
        params: { q: studentName, page: currentPage },
      });

      setPage(currentPage);
      setLastPage(data.lastPage);
      setStudents(data.content);
    } catch (err) {
      toast.error(err.response.data.error);
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

  function handlePreviousPageChange() {
    const currentPage = page - 1;
    fecthStudents(currentPage);
  }

  function handleNextPageChange() {
    const currentPage = page + 1;
    fecthStudents(currentPage);
  }

  return (
    <Container>
      <DataHeader>
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
            onKeyDown={event => event.key === 'Enter' && fecthStudents(1)}
            onChange={handleStudentNameChange}
          />
        </span>
      </DataHeader>

      {students.length ? (
        <>
          <Data>
            <thead>
              <tr>
                <th>NOME</th>
                <th>E-MAIL</th>
                <th>IDADE</th>
                <th aria-label="Título da coluna vazia" />
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
                      onClick={() =>
                        history.push(`/students/${student.id}/edit`)
                      }
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

          <Paginator>
            <button
              type="button"
              disabled={page === 1}
              onClick={() => {
                handlePreviousPageChange();
              }}
            >
              Anterior
            </button>
            <button
              disabled={lastPage}
              type="button"
              onClick={() => {
                handleNextPageChange();
              }}
            >
              Próxima
            </button>
          </Paginator>
        </>
      ) : (
          <NoData>
            <span>Nenhum aluno encontrado</span>
          </NoData>
        )}
    </Container>
  );
}
