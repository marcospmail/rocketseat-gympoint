import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View``;

export const TButton = styled(RectButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ee4e62;
  border-radius: 4px;
  height: 46px;
`;

export const TButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
