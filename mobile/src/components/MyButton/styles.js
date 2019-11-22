import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View``;

export const TButton = styled(RectButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 46px;
  background: #ee4e62;

  margin-top: 20px;
  border-radius: 4px;
`;

export const TButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
