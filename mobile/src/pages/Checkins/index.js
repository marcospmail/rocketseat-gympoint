import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import MyHeader from '~/components/MyHeader';
import MyButton from '~/components/MyButton';

import api from '~/services/api';

import {
  Container,
  Content,
  CheckinList,
  Checkin,
  CheckinNumber,
  CheckinDate,
} from './styles';

export default function Checkins() {
  const [checkins, setCheckins] = useState([]);
  const student = useSelector(state => state.student.student);

  async function fetchCheckins() {
    const { data } = await api.get(`students/${student.id}/checkins`);

    setCheckins(
      data.map(checkin => ({
        ...checkin,
        formattedDate: formatRelative(
          parseISO(checkin.created_at),
          new Date(),
          {
            locale: pt,
            addSuffix: true,
          }
        ),
      }))
    );
  }

  useEffect(() => {
    fetchCheckins();
  }, []);

  async function handleCreateCheckin() {
    try {
      await api.post(`/students/${student.id}/checkins`);
      fetchCheckins();
    } catch (err) {
      Alert.alert('Erro', 'Ocorreu uma falha ao registrar o checkin');
    }
  }

  return (
    <>
      <Container>
        <MyHeader />

        <Content>
          <MyButton onPress={handleCreateCheckin}>Novo check-in</MyButton>

          <CheckinList
            data={checkins}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Checkin>
                <CheckinNumber>{`Checkin #${item.id}`}</CheckinNumber>
                <CheckinDate>{item.formattedDate}</CheckinDate>
              </Checkin>
            )}
          />
        </Content>
      </Container>
    </>
  );
}

const tabBarIcon = ({ tintColor }) => (
  <Icon name="event" size={20} color={tintColor} />
);

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Checkins.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon,
};
