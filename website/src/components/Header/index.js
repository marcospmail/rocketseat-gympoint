import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import { items } from '~/routes/navigation';

import { Container, Content, Logo, Nav, NavItem, Profile } from './styles';

import logo from '~/assets/logo-header.png';

export default function Header() {
  const dispatch = useDispatch();
  const activeNavItem = useSelector(state => state.navitem.navItem);
  const { profile } = useSelector(state => state.user);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <Logo>
          <img src={logo} alt="GYMPoint" />
        </Logo>

        <Nav>
          {Object.keys(items).map(key => {
            const item = items[key];

            return (
              <NavItem
                key={item.name}
                active={activeNavItem === item.name ? 'true' : 'false'}
                to={item.route}
              >
                {item.name}
              </NavItem>
            );
          })}
        </Nav>

        <aside>
          <Profile>
            <strong>{profile.name}</strong>
            <button type="button" onClick={handleSignOut}>
              sair do sistema
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
