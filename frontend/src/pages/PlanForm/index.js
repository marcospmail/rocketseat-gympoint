import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import CurrencyInput from '~/components/MyCurrencyInput';

import history from '~/services/history';
import api from '~/services/api';

import { validation } from '~/util/messages';

import { Container, PageTop, Data } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required(validation.required),
  duration: Yup.number()
    .positive(validation.positive)
    .typeError(validation.typeError)
    .required(validation.required),
  price: Yup.number()
    .positive(validation.positive)
    .typeError(validation.typeError)
    .required(validation.required),
});

export default function PlanForm() {
  const [plan, setPlan] = useState({});

  const { id } = useParams();

  useEffect(() => {
    async function loadPlan() {
      try {
        const { data } = await api.get('plans', {
          params: { id },
        });

        setPlan({
          ...data,
          total: data.duration * data.price,
        });
      } catch (err) {
        toast.error(err.response.data.error);
      }
    }

    if (!isNewPlan()) {
      loadPlan();
    }
  }, []); //eslint-disable-line

  function isNewPlan() {
    return !id;
  }

  async function handleFormSubmit(data) {
    try {
      if (isNewPlan()) {
        await insertPlan(data);
      } else {
        await updatePlan(data);
      }
      history.push('/plans');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  async function insertPlan(data) {
    await api.post('plans', data);
    toast.success('Cadastro realizado');
  }

  async function updatePlan(data) {
    await api.put(`plans/${plan.id}`, data);
    toast.success('Cadastro alterado');
  }

  function handleDurationChange(newDuration) {
    setPlan({
      ...plan,
      duration: newDuration,
      total: plan.price * newDuration,
    });
  }

  function handlePriceChange(newPrice) {
    setPlan({
      ...plan,
      price: newPrice,
      total: plan.duration * newPrice,
    });
  }

  return (
    <Container>
      <PageTop>
        <strong>{isNewPlan() ? 'Cadastro de plano' : 'Edição de plano'}</strong>
        <div>
          <button type="button" onClick={() => history.push('/plans')}>
            <MdKeyboardArrowLeft size={20} color="#fff" />
            <span>VOLTAR</span>
          </button>
          <button type="submit" form="Form">
            <MdCheck size={20} color="#fff" />
            <span>SALVAR</span>
          </button>
        </div>
      </PageTop>

      <Data
        id="Form"
        schema={schema}
        initialData={plan}
        onSubmit={handleFormSubmit}
      >
        <label>TÍTULO DO PLANO</label>
        <Input name="title" />

        <div>
          <div>
            <label>DURAÇÃO (em meses)</label>
            <Input
              name="duration"
              type="number"
              onChange={e => handleDurationChange(e.target.value)}
            />
          </div>
          <div>
            <label>PREÇO MENSAL</label>
            <CurrencyInput
              name="price"
              prefix="R$ "
              onChange={handlePriceChange}
            />
          </div>
          <div>
            <label>PRECO TOTAL</label>
            <CurrencyInput name="total" prefix="R$ " disabled />
          </div>
        </div>
      </Data>
    </Container>
  );
}

PlanForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
