import styled from 'styled-components/native';

export const Container = styled.View``;

export const TButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => (props.disabled ? '#ddd' : '#ee4e62')};
  border-radius: 4px;
  height: 46px;
`;

export const TButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
