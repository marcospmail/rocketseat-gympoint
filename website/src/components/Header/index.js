import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import { setActiveNavItem } from '~/store/modules/navitem/actions';

import { items } from './navigation';

import { Container, Content, Nav, NavItem, Profile } from './styles';

import logo from '~/assets/logo-header.png';

export default function Header() {
  const dispatch = useDispatch();
  const activeNavItem = useSelector(state => state.navitem.navItem);

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
          {items.map(navitem => (
            <NavItem
              key={navitem.name}
              active={activeNavItem === navitem.name ? 'true' : 'false'}
              to={navitem.route}
              onClick={() => dispatch(setActiveNavItem(navitem.name))}
            >
              {navitem.name}
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
