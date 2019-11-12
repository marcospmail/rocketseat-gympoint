import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import CurrencyInput from '~/components/CurrencyInput';

import history from '~/services/history';
import api from '~/services/api';

import { validationMessages } from '~/util/ValidationMessages';

import { Container, PageTop, Data } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required(validationMessages.required),
  email: Yup.string()
    .email(validationMessages.email)
    .required(validationMessages.required),
  age: Yup.number()
    .positive(validationMessages.positive)
    .typeError(validationMessages.typeError)
    .required(validationMessages.required),
  weight: Yup.number()
    .positive(validationMessages.positive)
    .typeError(validationMessages.typeError)
    .required(validationMessages.required),
  height: Yup.number().required(validationMessages.required),
});

export default function UserEdit() {
  const [user, setUser] = useState({});

  const { id } = useParams();

  useEffect(() => {
    async function loadUser() {
      try {
        const { data } = await api.get('students', {
          params: { id },
        });

        setUser(data);
      } catch (err) {
        toast.error('Ocorreu um erro ao carregar a página');
      }
    }

    loadUser();
  }, []); //eslint-disable-line

  async function handleFormSubmit(data) {
    try {
      const response = await api.put(`students/${user.id}`, data);
      setUser(response.data);
      toast.success('Informações alteradas');
    } catch (err) {
      toast.error('Ocorreu um erro ao alterar as informações');
    }
  }

  return (
    <Container>
      <PageTop>
        <strong>Edição de aluno</strong>
        <div>
          <button type="button" onClick={() => history.push('/users')}>
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
        initialData={user}
        onSubmit={handleFormSubmit}
      >
        <label>NOME COMPLETO</label>
        <Input name="name" placeholder="John Doe" />

        <label>ENDEREÇO DE E-MAIL</label>
        <Input name="email" type="email" placeholder="exemplo@email.com" />

        <div>
          <div>
            <label>IDADE</label>
            <Input name="age" type="number" />
          </div>
          <div>
            <label>PESO (em kg) </label>
            <CurrencyInput name="weight" />
          </div>
          <div>
            <label>ALTURA</label>
            <CurrencyInput name="height" />
          </div>
        </div>
      </Data>
    </Container>
  );
}

UserEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
