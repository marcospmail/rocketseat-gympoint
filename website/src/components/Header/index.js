import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, Nav, NavItem, Profile } from './styles';

import logo from '~/assets/logo-header.png';

const menuItems = [
  { name: 'ALUNOS', route: '/students' },
  { name: 'PLANOS', route: '/plans' },
  { name: 'MATRICULAS', route: '/registrations' },
  { name: 'PEDIDOS DE AUXÍLIO', route: '/help-orders' },
];

export default function Header() {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

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
          {menuItems.map(menuItem => (
            <NavItem
              key={menuItem.name}
              active={active === menuItem.name ? 'true' : 'false'}
              to={menuItem.route}
              onClick={() => setActive(menuItem.name)}
            >
              {menuItem.name}
            </NavItem>
          ))}
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
