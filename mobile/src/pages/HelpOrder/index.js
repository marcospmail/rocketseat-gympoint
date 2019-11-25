import React from 'react';
import PropTypes from 'prop-types';

import MyHeader from '~/components/MyHeader';

import {
  Container,
  Content,
  QuestionContent,
  QuestionHeader,
  QuestionDate,
  Question,
  QuestionLabel,
  AnswearLabel,
  Answear,
} from './styles';

export default function HelpOrder({ navigation }) {
  const helpOrder = navigation.getParam('item');

  return (
    <>
      <Container>
        <MyHeader />

        <Content>
          <QuestionContent>
            <QuestionHeader>
              <QuestionLabel>PERGUNTA</QuestionLabel>
              <QuestionDate>{helpOrder.formattedDate}</QuestionDate>
            </QuestionHeader>
            <Question>{helpOrder.question}</Question>

            {helpOrder.answear && (
              <>
                <AnswearLabel>RESPOSTA</AnswearLabel>
                <Answear>{helpOrder.answear}</Answear>
              </>
            )}
          </QuestionContent>
        </Content>
      </Container>
    </>
  );
}

HelpOrder.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
