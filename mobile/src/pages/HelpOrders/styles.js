import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background: #f2f2f2;
  flex: 1;
`;

export const Content = styled.View`
  padding: 20px;
  flex: 1;
`;

export const HelpOrderList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 10px;
`;

export const HelpOrder = styled.TouchableOpacity`
  padding: 20px;
  margin-top: 10px;
  border-radius: 4px;
  background: #fff;
  border: 1px solid #ddd;
`;

export const HelpOrderHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const HelpOrderAnswered = styled.Text`
  color: ${props => (props.answered ? '#42CB59' : '#999999')};
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  margin-left: 8px;
`;

export const HelpOrderDate = styled.Text`
  flex: 1;
  text-align: right;
  color: #666;
  font-size: 14px;
  line-height: 16px;
`;

export const HelpOrderQuestion = styled.Text`
  margin-top: 16px;
  line-height: 16px;
  font-size: 14px;
`;

export const NoData = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
})``;

export const NoDataText = styled.Text`
  font-weight: bold;
  color: #999999;
`;
