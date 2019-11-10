import React from 'react';
import { useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions'

import { Container, Content, Navigation, NavigationScreen, Profile } from './styles';

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

          <Navigation >
            <NavigationScreen active={true}>
              ALUNOS
            </NavigationScreen>

            <NavigationScreen>
              PLANOS
          </NavigationScreen>

            <NavigationScreen>
              MATRÍCULAS
          </NavigationScreen>

          <NavigationScreen>
              PEDIDOS DE AUXÍLIO
          </NavigationScreen>
          
          </Navigation>

        <aside>
          <Profile>
              <strong>Diego Fernandes</strong>
              <button onClick={handleSignOut}>sair do sistema</button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
