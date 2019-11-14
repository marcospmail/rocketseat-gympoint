import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { parseISO, addMonths } from 'date-fns';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

// import * as Yup from 'yup';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import MyDatePicker from '~/components/MyDatePicker';
import MyCurrencyInput from '~/components/MyCurrencyInput';

import history from '~/services/history';
import api from '~/services/api';

// import { validation } from '~/util/messages';

import {
  Container,
  PageTop,
  Data,
  SecondRowForm,
  StudentPicker,
  PlanPicker,
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
  const [plans, setPlans] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    async function pageLoad() {
      if (!isNewRegistration()) {
        const fetchPlansPromise = fetchPlans();
        const fetchRegistrationPromise = fetchRegistration();

        const plansData = (await fetchPlansPromise).data;
        const registrationData = (await fetchRegistrationPromise).data;

        setPlans(plansData);

        setRegistration({
          ...registrationData,
          start_date: parseISO(registrationData.start_date),
          end_date: parseISO(registrationData.end_date),
        });
      } else {
        const { data } = await fetchPlans();
        setPlans(data);
      }
    }

    pageLoad();
  }, []); //eslint-disable-line

  function fetchStudents() {
    return api.get('students');
  }

  function fetchPlans() {
    return api.get('plans');
  }

  function fetchRegistration() {
    return api.get('registrations', {
      params: { id },
    });
  }

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
      history.push('/registrations');
    } catch (err) {
      toast.error('Ocorreu um erro ao alterar as informações');
    }
  }

  async function insertRegistration(data) {
    await api.post('registrations', data);
    toast.success('Cadastro realizado');
  }

  async function updateRegistration(data) {
    data = {
      ...data,
      student_id: data.student.id,
      plan_id: data.plan.id,
      date: data.start_date,
    };
    delete data.student;
    delete data.plan;
    delete data.start_date;

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

  const filterColors = (data, inputValue) => {
    return data.filter(i =>
      i.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadStudentOptions = async inputValue => {
    async function loadStudents() {
      const { data } = await fetchStudents();
      return data;
    }
    const data = await loadStudents();

    return new Promise(resolve => {
      resolve(filterColors(data, inputValue));
    });
  };

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
        <StudentPicker name="student" loadOptions={loadStudentOptions} />

        <SecondRowForm>
          <div>
            <label>PLANO</label>
            <PlanPicker name="plan" options={plans} />
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
            <MyCurrencyInput name="price" prefix="R$ " disabled />
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
