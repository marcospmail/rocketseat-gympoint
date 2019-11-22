import styled from 'styled-components/native';

import MyButton from '~/components/MyButton';
import MyInput from '~/components/MyInput';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
`;

export const Logo = styled.Image`
  height: 80px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 20px;
`;

export const FormInput = styled(MyInput).attrs({})`
  height: 45px;
`;

export const SubmitButton = styled(MyButton)`
  height: 4px;
  margin-top: 20px;
`;
