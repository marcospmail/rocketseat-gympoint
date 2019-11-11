import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import history from '~/services/history';
import api from '~/services/api';

import CurrencyInput from '~/components/CurrencyInput';

import { Container, PageTop, Data } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório'),
  email: Yup.string()
    .email('Email inválido')
    .required('Campo obrigatório'),
  age: Yup.number()
    .typeError('Número inválido')
    .required('Campo obrigatório'),
  weight: Yup.number()
    .typeError('Número inválido')
    .required('Campo obrigatório'),
  // height: Yup.number()
  //   .typeError('Número inválido')
  //   .required('Campo obrigatório'),
});

export default function UserEdit() {
  const { id } = useParams();

  const [user, setUser] = useState({});

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await api.get('students', {
          params: { id },
        });

        setUser(response.data);
      } catch (err) {
        toast.error('Ocorreu um erro ao carregar a página');
      }
    }

    loadUser();
  }, []);

  async function handleFormSubmit(data) {
    try {
      console.tron.log(data);

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

        <table>
          <thead>
            <tr>
              <th>
                <label>IDADE</label>
              </th>
              <th>
                <label>PESO (em kg)</label>
              </th>
              <th>
                <label>ALTURA</label>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Input name="age" type="number" />
              </td>
              <td>
                <Input name="weight" type="number" />
              </td>
              <td>
                {/* <Input name="height" /> */}
                <CurrencyInput name="height" />
              </td>
            </tr>
          </tbody>
        </table>
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
