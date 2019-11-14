import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { MdAdd } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import { Container, DataManager, Data } from './styles';

export default function HelpOrders() {
  const [helpOrders, setHelpOrders] = useState([]);

  useEffect(() => {
    searchHelpOrders();
  }, []);

  async function searchHelpOrders() {
    try {
      const { data } = await api.get('help-orders');
      setHelpOrders(data);
    } catch (err) {
      toast.error('Ocorreu um erro ao buscar os pedidos de auxílio');
    }
  }

  async function handleDeleteHelpOrder({ id }) {
    if (window.confirm(`Tem certeza que deseja deletar o pedido de auxílio ?`))  //eslint-disable-line
      try {
        await api.delete(`/help-orders/${id}`);

        setHelpOrders(helpOrders.filter(helpOrder => helpOrder.id !== id));

        toast.success('Pedido de auxílio removido');
      } catch (err) {
        const { error } = err.response.data;
        toast.error(error);
      }
  }

  return (
    <Container>
      <DataManager>
        <strong>Pedidos de Auxílio</strong>
        <button type="button" onClick={() => history.push('/help-orders/new')}>
          <MdAdd color="#fff" size={20} />
          <span>CADASTRAR</span>
        </button>
      </DataManager>

      <Data>
        <thead>
          <tr>
            <th>ALUNO</th>
            <th aria-label="Título da coluna vazia" />
          </tr>
        </thead>
        <tbody>
          {helpOrders.map(helpOrder => (
            <tr key={helpOrder.id}>
              <td>{helpOrder.student.name}</td>
              <td>
                <button
                  type="button"
                  onClick={() =>
                    history.push(`/help-orders/${helpOrder.id}/edit`)
                  }
                >
                  editar
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteHelpOrder(helpOrder)}
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
