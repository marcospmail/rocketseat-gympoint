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
import { items } from '~/components/Header/navigation';

import { Container, PageTop, Data } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required(validation.required),
  email: Yup.string()
    .email(validation.email)
    .required(validation.required),
  age: Yup.number()
    .positive(validation.positive)
    .typeError(validation.typeError)
    .required(validation.required),
  weight: Yup.number()
    .positive(validation.positive)
    .typeError(validation.typeError)
    .required(validation.required),
  height: Yup.number().required(validation.required),
});

export default function StudentForm() {
  const [student, setStudent] = useState({});

  const { id } = useParams();

  useEffect(() => {
    async function loadStudent() {
      try {
        const { data } = await api.get('students', {
          params: { id },
        });

        setStudent(data);
      } catch (err) {
        toast.error(err.response.data.error);
      }
    }

    if (!isNewStudent()) {
      loadStudent();
    }
  }, []); //eslint-disable-line

  function isNewStudent() {
    return !id;
  }

  async function handleFormSubmit(data) {
    try {
      if (isNewStudent()) {
        await insertStudent(data);
      } else {
        await updateStudent(data);
      }
      history.push(items.students.route);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  async function insertStudent(data) {
    await api.post('students', data);
    toast.success('Cadastro realizado');
  }

  async function updateStudent(data) {
    await api.put(`students/${student.id}`, data);
    toast.success('Cadastro alterado');
  }

  return (
    <Container>
      <PageTop>
        <strong>
          {isNewStudent() ? 'Cadastro de aluno' : 'Edição de aluno'}
        </strong>
        <div>
          <button
            type="button"
            onClick={() => history.push(items.students.route)}
          >
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
        initialData={student}
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

StudentForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
