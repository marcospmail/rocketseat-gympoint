import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, Nav, NavItem, Profile } from './styles';

import logo from '~/assets/logo-header.png';

export default function Header() {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GoBarber" />
        </nav>

        <Nav>
          <NavItem active>
            <Link to="/students">ALUNOS</Link>
          </NavItem>

          <NavItem>PLANOS</NavItem>
          <NavItem>MATRÍCULAS</NavItem>
          <NavItem>PEDIDOS DE AUXÍLIO</NavItem>
        </Nav>

        <aside>
          <Profile>
            <strong>Diego Fernandes</strong>
            <button type="button" onClick={handleSignOut}>
              sair do sistema
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
