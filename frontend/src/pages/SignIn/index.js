import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import { Wrapper, Content, Logo } from './styles';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function Signin() {
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Wrapper>
      <Content>
        <Logo>
          <img src={logo} alt="GYMPoint" />
          <span>GYMPOINT</span>
        </Logo>

        <Form schema={schema} onSubmit={handleSubmit}>
          <strong>SEU E-MAIL</strong>
          <Input name="email" type="email" placeholder="Seu e-mail" />

          <strong>SUA SENHA</strong>
          <Input
            name="password"
            type="password"
            placeholder="Sua senha secreta"
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Aguarde...' : 'Entrar no sistema'}
          </button>
        </Form>
      </Content>
    </Wrapper>
  );
}
