import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { MdAdd } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import { Container, DataManager, Data } from './styles';

export default function Registrations() {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    fetchRegistrations();
  }, []); //eslint-disable-line

  async function fetchRegistrations() {
    try {
      const response = await api.get('registrations');
      setRegistrations(response.data);
    } catch (err) {
      toast.error('Ocorreu um erro ao buscar as matrículas');
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
      <DataManager>
        <strong>Gerenciando matrículas</strong>
        <button
          type="button"
          onClick={() => history.push('/registrations/new')}
        >
          <MdAdd color="#fff" size={20} />
          <span>CADASTRAR</span>
        </button>
      </DataManager>

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
          {registrations.map(registration => (
            <tr key={registration.id}>
              <td>{registration.name}</td>
              <td>{registration.email}</td>
              <td>{registration.age}</td>
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
    </Container>
  );
}
