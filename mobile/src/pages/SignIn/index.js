import React from 'react';
import logo from '~/assets/logo.png';

import { Container, Form, FormInput, SubmitButton, Logo } from './styles';

export default function SignIn() {
  return (
    <Container>
      <Logo source={logo} />

      <Form>
        <FormInput placeholder="Informe seu ID de cadastro" />

        <SubmitButton onPress={() => {}}>Entrar no sistema</SubmitButton>
      </Form>
    </Container>
  );
}
