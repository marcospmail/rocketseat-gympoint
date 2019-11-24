import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import logo from '~/assets/logo.png';

import { signInRequest } from '~/store/modules/auth/actions';

import { Container, Form, FormInput, SubmitButton, Logo } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();
  const [studentId, setStudentId] = useState();

  function handleSubmit() {
    dispatch(signInRequest(studentId));
  }

  return (
    <Container>
      <Logo source={logo} />

      <Form>
        <FormInput
          placeholder="Informe seu ID de cadastro"
          onChange={setStudentId}
          customValue={studentId}
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
        />

        <SubmitButton onPress={handleSubmit}>Entrar no sistema</SubmitButton>
      </Form>
    </Container>
  );
}
