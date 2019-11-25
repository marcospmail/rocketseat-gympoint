import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';

import api from '~/services/api';

import MyHeader from '~/components/MyHeader';

import { Container, Content, QuestionInput, SubmitQuestion } from './styles';

export default function HelpOrderAsk({ navigation }) {
  const student = useSelector(state => state.student.student);
  const [question, setQuestion] = useState('');
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);

  useEffect(() => setSubmitBtnDisabled(!question.length), [question]);

  async function handleSubmitQuestion() {
    try {
      await api.post(`/students/${student.id}/help-orders`, {
        question,
      });
      Alert.alert('Sucesso', 'Seu pedido de auxílio foi registrado', [
        {
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (err) {
      Alert.alert(
        'Erro',
        'Ocorreu uma falha ao registrar seu pedido de auxílio'
      );
    }
  }

  return (
    <>
      <Container>
        <MyHeader />

        <Content>
          <QuestionInput
            placeholder="Inclua seu pedido de auxílio"
            value={question}
            onChangeText={setQuestion}
          />
          <SubmitQuestion
            onPress={handleSubmitQuestion}
            disabled={submitBtnDisabled}
          >
            Enviar pedido
          </SubmitQuestion>
        </Content>
      </Container>
    </>
  );
}

HelpOrderAsk.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
