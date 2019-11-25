import styled from 'styled-components/native';

import MyButton from '~/components/MyButton';

export const Container = styled.SafeAreaView`
  background: #f2f2f2;
  flex: 1;
`;

export const Content = styled.View`
  padding: 20px;
`;

export const QuestionInput = styled.TextInput.attrs({
  multiline: true,
})`
  height: 300px;
  background: #fff;
  border: 1px solid #ddd;
  display: flex;
  padding: 20px;
  font-size: 16px;
  line-height: 19px;
  text-align-vertical: top;
`;

export const SubmitQuestion = styled(MyButton)`
  margin-top: 20px;
`;
