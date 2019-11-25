import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
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
  HelpOrderList,
  HelpOrder,
  HelpOrderHeader,
  HelpOrderAnswered,
  HelpOrderDate,
  HelpOrderQuestion,
} from './styles';

function HelpOrders({ navigation, isFocused }) {
  const [helpOrders, setHelpOrders] = useState([]);
  const student = useSelector(state => state.student.student);

  useEffect(() => {
    async function fetchCheckins() {
      const { data } = await api.get(`students/${student.id}/help-orders`);

      setHelpOrders(
        data.map(helpOrder => ({
          ...helpOrder,
          formattedDate: formatRelative(
            parseISO(helpOrder.createdAt),
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
  }, [isFocused]);

  return (
    <>
      <Container>
        <MyHeader />

        <Content>
          <MyButton onPress={() => navigation.navigate('HelpOrderAsk')}>
            Novo pedido de auxílio
          </MyButton>

          <HelpOrderList
            data={helpOrders}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <HelpOrder
                onPress={() =>
                  navigation.navigate('HelpOrderQuestion', { item })
                }
              >
                <HelpOrderHeader>
                  <Icon
                    name="check-circle"
                    color={item.answear ? '#42CB59' : '#999999'}
                    size={16}
                  />
                  <HelpOrderAnswered answered={item.answear}>
                    {item.answear ? 'Respondido' : 'Sem resposta'}
                  </HelpOrderAnswered>
                  <HelpOrderDate>{item.formattedDate}</HelpOrderDate>
                </HelpOrderHeader>
                <HelpOrderQuestion>{item.question}</HelpOrderQuestion>
              </HelpOrder>
            )}
          />
        </Content>
      </Container>
    </>
  );
}

HelpOrders.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(HelpOrders);
