import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background: #f2f2f2;
  flex: 1;
`;

export const Content = styled.ScrollView`
  padding: 20px;
`;

export const QuestionContent = styled.View`
  padding: 20px;
  margin-top: 10px;
  margin-bottom: 50px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background: #fff;
`;

export const QuestionHeader = styled.View`
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

export const QuestionLabel = styled.Text`
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
`;

export const QuestionDate = styled.Text`
  flex: 1;
  text-align: right;
  color: #666;
  font-size: 14px;
  line-height: 16px;
`;

export const Question = styled.Text`
  margin-top: 16px;
  line-height: 26px;
  font-size: 14px;
`;

export const AnswearLabel = styled.Text`
  margin-top: 20px;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
`;

export const Answear = styled.Text`
  margin-top: 16px;
  line-height: 26px;
  font-size: 14px;
`;
