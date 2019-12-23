import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  aside {
    justify-self: flex-end;
    display: flex;
    align-items: center;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  margin-right: 20px;
  padding-right: 20px;
  border-right: 1px solid #eee;

  img {
    width: 45px;
  }

  span {
    color: #ee4d64;
    font-weight: bold;
    font-size: 15px;
    line-height: 18px;
    margin-left: 12px;
  }
`;

export const Nav = styled.nav`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const NavItem = styled(Link)`
  text-decoration: none;
  color: ${props => (props.active === 'true' ? '#444444' : '#999999')};
  font-size: 15px;
  display: inline;
  font-weight: bold;
  padding-right: 20px;
  transition: color 0.2s;

  ${props =>
    props.active === 'false' &&
    css`
      &:hover {
        color: ${darken(0.1, '#999999')};
      }
    `}

  & + li {
    padding: 0 20px;
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  strong {
    color: #666666;
    font-weight: bold;
  }

  button {
    line-height: 16px;
    margin-top: 4px;
    font-size: 14px;
    color: #de3b3b;
    background: none;
    border: 0;
  }
`;
