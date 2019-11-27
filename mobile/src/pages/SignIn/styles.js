import styled from 'styled-components/native';

import MyButton from '~/components/MyButton';
import MyNumericInput from '~/components/MyNumericInput';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 25px;
`;

export const Logo = styled.Image`
  width: 123px;
  height: 80px;
`;

export const LogoText = styled.Text`
  color: #ee4d64;
  font-size: 24px;
  line-height: 28px;
  font-weight: bold;
  margin-top: 10px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 20px;
`;

export const FormInput = styled(MyNumericInput)`
  height: 45px;
`;

export const SubmitButton = styled(MyButton)`
  height: 46px;
  margin-top: 20px;
`;
