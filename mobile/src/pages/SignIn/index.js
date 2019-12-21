import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import logo from '~/assets/logo.png';

import { signInRequest } from '~/store/modules/auth/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  Logo,
  LogoText,
} from './styles';

export default function SignIn() {
  const dispatch = useDispatch();
  const [studentId, setStudentId] = useState('');

  function handleSubmit() {
    if (!studentId) {
      Alert.alert('Aviso', 'Necessário informar o ID do estudante');
      return;
    }

    dispatch(signInRequest(studentId));
  }

  return (
    <Container>
      <Logo source={logo} />
      <LogoText>GYMPOINT</LogoText>

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
