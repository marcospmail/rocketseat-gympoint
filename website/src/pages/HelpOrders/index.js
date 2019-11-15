import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Form, Textarea } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '~/services/api';

import { validation } from '~/util/messages';

import { Container, DataHeader, Data, NoData, AnswearModal } from './styles';

const schema = Yup.object().shape({
  answear: Yup.string().required(validation.required),
});

export default function HelpOrders() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [selectedHelpOrder, setSelectedHelOrder] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchHelpOrders();
  }, []);

  async function fetchHelpOrders() {
    try {
      const { data } = await api.get('help-orders');
      setHelpOrders(data);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  function openModal() {
    setModalVisible(true);
  }

  function handleAnswearClick(helpOrder) {
    setSelectedHelOrder(helpOrder);
    openModal();
  }

  async function handleSubmit(data) {
    try {
      await api.put(`help-orders/${selectedHelpOrder.id}/answear`, data);

      toast.success('Resposta salva');
      fetchHelpOrders();

      setModalVisible(false);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <Container>
      <AnswearModal
        isOpen={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <span>
          <strong>PERGUNTA DO ALUNO</strong>
        </span>
        <span>{selectedHelpOrder && selectedHelpOrder.question}</span>
        <span>
          <strong>SUA RESPOSTA</strong>
        </span>
        <Form schema={schema} onSubmit={handleSubmit}>
          <Textarea
            name="answear"
            type="text"
            placeholder="Sua resposta aqui..."
            onChange={e =>
              setSelectedHelOrder({
                ...selectedHelpOrder,
                answear: e.target.value,
              })
            }
          />
          <button type="submit">Responder aluno</button>
        </Form>
      </AnswearModal>

      <DataHeader>
        <strong>Pedidos de Auxílio</strong>
      </DataHeader>

      {helpOrders.length ? (
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
                    onClick={() => handleAnswearClick(helpOrder)}
                  >
                    responder
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Data>
      ) : (
        <NoData>
          <span>Nenhum pedido de auxílio encontrado</span>
        </NoData>
      )}
    </Container>
  );
}
