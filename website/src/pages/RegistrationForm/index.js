import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format, parseISO, addMonths } from 'date-fns';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Input } from '@rocketseat/unform';

// import * as Yup from 'yup';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import MyDatePicker from '~/components/DatePicker';

import CurrencyInput from '~/components/CurrencyInput';

import history from '~/services/history';
import api from '~/services/api';

// import { validation } from '~/util/messages';

import {
  Container,
  PageTop,
  Data,
  SecondRowForm,
  StudentPicker,
} from './styles';

// const schema = Yup.object().shape({
//   studentName: Yup.string().required(validation.required),
//   planTitle: Yup.string().required(validation.required),
//   startDate: Yup.date()
//     .typeError(validation.typeError)
//     .required(validation.required),
// });

// const schema = Yup.object().shape({
//   start_date: Yup.string().required(validation.required),
// });

export default function RegistrationForm() {
  const [registration, setRegistration] = useState({});
  const [students, setStudents] = useState({});

  const { id } = useParams();

  useEffect(() => {
    function fetchStudents() {
      return api.get('students');
    }

    function fetchRegistration() {
      return api.get('registrations', {
        params: { id },
      });
    }
    // +

    // setValue(parseISO(data.start_date));
    //   } catch (err) {
    //     toast.error('Ocorreu um erro ao carregar a página');
    //   }
    // }

    async function pageLoad() {
      if (!isNewRegistration()) {
        const fetchStudentsPromise = fetchStudents();
        const fetchRegistrationPromise = fetchRegistration();

        const studentsData = (await fetchStudentsPromise).data;
        const registrationData = (await fetchRegistrationPromise).data;

        setStudents(studentsData);
        setRegistration({
          ...registrationData,
          start_date: parseISO(registrationData.start_date),
          end_date: parseISO(registrationData.end_date),
        });
      } else {
        const { data } = await fetchStudents();
        setStudents(data);
      }
    }

    pageLoad();
  }, []); //eslint-disable-line

  function isNewRegistration() {
    return !id;
  }

  async function handleFormSubmit(data) {
    try {
      if (isNewRegistration()) {
        await insertRegistration(data);
      } else {
        await updateRegistration(data);
      }
      // history.push('/registrations');
    } catch (err) {
      toast.error('Ocorreu um erro ao alterar as informações');
    }
  }

  async function insertRegistration(data) {
    await api.post('registrations', data);
    toast.success('Cadastro realizado');
  }

  async function updateRegistration(data) {
    console.tron.log(data);

    await api.put(`registrations/${registration.id}`, data);
    toast.success('Cadastro alterado');
  }

  function handleStartDateChange(newDate) {
    setRegistration({
      ...registration,
      start_date: newDate,
      end_date: addMonths(newDate, registration.plan.duration),
    });
  }

  return (
    <Container>
      <PageTop>
        <strong>
          {isNewRegistration()
            ? 'Cadastro de matrícula'
            : 'Edição de matrícula'}
        </strong>
        <div>
          <button type="button" onClick={() => history.push('/registrations')}>
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
        // schema={schema}
        initialData={registration}
        onSubmit={handleFormSubmit}
      >
        <label>ALUNO</label>
        <StudentPicker
          options={students}
          getOptionLabel={std => std.name}
          getOptionValue={std => std.id}
        />
        {/* <Input name="student.name" /> */}

        <SecondRowForm>
          <div>
            <label>PLANO</label>
            <Input name="plan.title" />
          </div>
          <div>
            <label>DATA DE INÍCIO</label>
            <MyDatePicker name="start_date" onChange={handleStartDateChange} />
          </div>
          <div>
            <label>DATA DE TÉRMINO</label>
            <MyDatePicker name="end_date" disabled />
          </div>
          <div>
            <label>PRECO TOTAL</label>
            <CurrencyInput name="price" prefix="R$ " disabled />
          </div>
        </SecondRowForm>
      </Data>
    </Container>
  );
}

RegistrationForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
