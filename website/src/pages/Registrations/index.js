import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { MdAdd } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import { Container, DataHeader, Data, NoData } from './styles';

export default function Registrations() {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    fetchRegistrations();
  }, []); //eslint-disable-line

  function formatDate(date) {
    return format(parseISO(date), "d 'de' MMMM 'de' yyyy", {
      locale: pt,
    });
  }

  async function fetchRegistrations() {
    try {
      const { data } = await api.get('registrations');

      const newData = data.map(reg => ({
        ...reg,
        start_date: formatDate(reg.start_date),
        end_date: formatDate(reg.end_date),
      }));

      setRegistrations(newData);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  async function handleDeleteRegistration({ id, name }) {
    if (window.confirm(`Tem certeza que deseja deletar a matrícula ${name} ?`))  //eslint-disable-line
      try {
        await api.delete(`/registrations/${id}`);
        setRegistrations(
          registrations.filter(registration => registration.id !== id)
        );
        toast.success('Matrícula removida');
      } catch (err) {
        const { error } = err.response.data;
        toast.error(error);
      }
  }

  return (
    <Container>
      <DataHeader>
        <strong>Gerenciando matrículas</strong>
        <button
          type="button"
          onClick={() => history.push('/registrations/new')}
        >
          <MdAdd color="#fff" size={20} />
          <span>CADASTRAR</span>
        </button>
      </DataHeader>

      {registrations.length ? (
        <Data>
          <thead>
            <tr>
              <th>ALUNO</th>
              <th>PLANO</th>
              <th>INÍCIO</th>
              <th>TÉRMINO</th>
              <th>ATIVO</th>
              <th aria-label="Título da coluna vazia" />
            </tr>
          </thead>
          <tbody>
            {registrations.map(registration => (
              <tr key={registration.id}>
                <td>{registration.student.name}</td>
                <td>{registration.plan.title}</td>
                <td>{registration.start_date}</td>
                <td>{registration.end_date}</td>
                <td>{registration.active ? 'Sim' : 'Não'}</td>
                <td>
                  <button
                    type="button"
                    onClick={() =>
                      history.push(`/registrations/${registration.id}/edit`)
                    }
                  >
                    editar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteRegistration(registration)}
                  >
                    apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Data>
      ) : (
        <NoData>
          <span>Nenhuma matrícula encontrada</span>
        </NoData>
      )}
    </Container>
  );
}
