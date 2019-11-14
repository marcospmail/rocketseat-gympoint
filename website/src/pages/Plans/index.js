import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { MdAdd } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import { formatPrice } from '~/util/format';

import { Container, DataManager, Data } from './styles';

export default function Plans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    searchPlans();
  }, []);

  async function searchPlans() {
    try {
      const { data } = await api.get('plans');

      setPlans(
        data.map(plan => ({
          ...plan,
          durationFormatted: `${plan.duration} ${
            plan.duration > 1 ? 'Meses' : 'Mês'
            }`,
          priceFormatted: formatPrice(plan.price),
        }))
      );
    } catch (err) {
      toast.error('Ocorreu um erro ao buscar as matrículas');
    }
  }

  async function handleDeletePlan({ id, name }) {
    if (window.confirm(`Tem certeza que deseja deletar o plano ${name} ?`))  //eslint-disable-line
      try {
        await api.delete(`/plans/${id}`);
        setPlans(plans.filter(plan => plan.id !== id));
        toast.success('Plano removido');
      } catch (err) {
        const { error } = err.response.data;
        toast.error(error);
      }
  }

  return (
    <Container>
      <DataManager>
        <strong>Gerenciando planos</strong>
        <button type="button" onClick={() => history.push('/plans/new')}>
          <MdAdd color="#fff" size={20} />
          <span>CADASTRAR</span>
        </button>
      </DataManager>

      <Data>
        <thead>
          <tr>
            <th>TÍTULO</th>
            <th>DURAÇÃO</th>
            <th>VALOR P/ MÊS</th>
            <th aria-label="Título da coluna vazia" />
          </tr>
        </thead>
        <tbody>
          {plans.map(plan => (
            <tr key={plan.id}>
              <td>{plan.title}</td>
              <td>{plan.durationFormatted}</td>
              <td>{plan.priceFormatted}</td>
              <td>
                <button
                  type="button"
                  onClick={() => history.push(`/plans/${plan.id}/edit`)}
                >
                  editar
                </button>
                <button type="button" onClick={() => handleDeletePlan(plan)}>
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
