import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import MyButton from '~/components/MyButton';

import api from '~/services/api';

import logo from '~/assets/logo.png';

import {
  Container,
  Content,
  Header,
  HeaderImage,
  HeaderText,
  CheckinList,
  Checkin,
  CheckinNumber,
  CheckinDate,
} from './styles';

export default function Checkins() {
  const [checkins, setCheckins] = useState([]);
  const student = useSelector(state => state.student.student);

  useEffect(() => {
    async function fetchCheckins() {
      const { data } = await api.get(`students/${student.id}/checkins`);

      console.tron.log(data);

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

    fetchCheckins();
  }, []);

  return (
    <>
      <Container>
        <Header>
          <HeaderImage source={logo} />
          <HeaderText>GYMPOINT</HeaderText>
        </Header>

        <Content>
          <MyButton>Novo check-in</MyButton>

          <CheckinList
            data={checkins}
            keyExtractor={item => Number(item.id)}
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
