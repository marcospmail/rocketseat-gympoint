import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { MdAdd } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import { formatPrice } from '~/util/format';

import { Container, DataHeader, Data, NoData, Paginator } from './styles';

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [lastPage, setLastPage] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPlans(1);
  }, []); //eslint-disable-line

  async function fetchPlans(currentPage) {
    try {
      const { data } = await api.get('plans', {
        params: { page: currentPage },
      });

      setLastPage(data.lastPage);
      setPage(currentPage);
      setPlans(
        data.content.map(plan => ({
          ...plan,
          durationFormatted: `${plan.duration} ${
            plan.duration > 1 ? 'Meses' : 'Mês'
          }`,
          priceFormatted: formatPrice(plan.price),
        }))
      );
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  async function handleDeletePlan({ id }) {
    if (window.confirm(`Tem certeza que deseja deletar o plano?`))  //eslint-disable-line
      try {
        await api.delete(`/plans/${id}`);

        const newPlans = plans.filter(plan => plan.id !== id);

        let newPage = newPlans.length ? page : page - 1;
        if (newPage === 0) {
          newPage = 1;
        }

        fetchPlans(newPage);

        toast.success('Plano removido');
      } catch (err) {
        const { error } = err.response.data;
        toast.error(error);
      }
  }

  function handlePreviousPageChange() {
    const currentPage = page - 1;
    fetchPlans(currentPage);
  }

  function handleNextPageChange() {
    const currentPage = page + 1;
    fetchPlans(currentPage);
  }

  return (
    <Container>
      <DataHeader>
        <strong>Gerenciando planos</strong>
        <button type="button" onClick={() => history.push('/plans/new')}>
          <MdAdd color="#fff" size={20} />
          <span>CADASTRAR</span>
        </button>
      </DataHeader>

      {plans.length ? (
        <>
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
                    <button
                      type="button"
                      onClick={() => handleDeletePlan(plan)}
                    >
                      apagar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Data>

          <Paginator
            lastPage={lastPage}
            firstPage={page === 1}
            handlePreviousPageChange={handlePreviousPageChange}
            handleNextPageChange={handleNextPageChange}
          />
        </>
      ) : (
        <NoData>
          <span>Nenhum plano encontrado</span>
        </NoData>
      )}
    </Container>
  );
}
