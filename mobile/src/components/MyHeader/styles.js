import styled from 'styled-components';

export const Header = styled.View`
  background: #fff;
  height: 44px;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const HeaderImage = styled.Image`
  width: 36px;
  height: 18px;
`;

export const HeaderText = styled.Text`
  font-size: 14px;
  line-height: 16px;
  font-weight: bold;
  color: #ee4e62;
  margin-left: 8px;
`;
