import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
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
  const [page, setPage] = useState(1);
  const [scrollMomentum, setScrollMomentum] = useState(false);
  const [showLoadingMoreIndicator, setShowLoadingMoreIndicator] = useState(
    false
  );
  const [noMoreData, setNoMoreData] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [helpOrders, setHelpOrders] = useState([]);
  const student = useSelector(state => state.student.student);

  async function fetchHelpOrders(newPage) {
    const { data } = await api.get(
      `students/${student.id}/help-orders?page=${newPage}`
    );

    if (!data.content.length) {
      setNoMoreData(true);
    } else {
      setNoMoreData(false);

      const newData = data.content.map(helpOrder => ({
        ...helpOrder,
        formattedDate: formatRelative(
          parseISO(helpOrder.created_at),
          new Date(),
          {
            locale: pt,
            addSuffix: true,
          }
        ),
      }));

      if (newPage === 1) {
        setHelpOrders(newData);
      } else {
        setHelpOrders([...helpOrders, ...newData]);
      }

      setPage(newPage);
    }
    setLoadingMore(false);
    setRefreshing(false);
    setShowLoadingMoreIndicator(false);
  }

  useEffect(() => {
    fetchHelpOrders(1);
  }, [isFocused]);

  async function handleLoadMore() {
    setScrollMomentum(false);
    setLoadingMore(true);
    const newPage = page + 1;
    await fetchHelpOrders(newPage);
  }

  async function onRefresh() {
    setRefreshing(true);
    fetchHelpOrders(1);
  }

  function renderFooter() {
    return (
      <View style={{ marginTop: 10 }}>
        <ActivityIndicator size={22} />
      </View>
    );
  }

  return (
    <>
      <Container>
        <MyHeader />

        <Content>
          <MyButton onPress={() => navigation.navigate('HelpOrderAsk')}>
            Novo pedido de auxílio
          </MyButton>

          <HelpOrderList
            onRefresh={onRefresh}
            refreshing={refreshing}
            onEndReachedThreshold={0.1}
            onEndReached={() => {
              if (
                !loadingMore &&
                !refreshing &&
                scrollMomentum &&
                !noMoreData
              ) {
                handleLoadMore();
              }
            }}
            onMomentumScrollBegin={() => {
              setScrollMomentum(true);
              if (!noMoreData) {
                setShowLoadingMoreIndicator(true);
              }
            }}
            data={helpOrders}
            keyExtractor={item => String(item.id)}
            ListFooterComponent={showLoadingMoreIndicator && renderFooter}
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
