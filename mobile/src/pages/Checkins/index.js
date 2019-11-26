import React, { useState, useEffect } from 'react';
import { View, Alert, ActivityIndicator } from 'react-native';
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
  const [page, setPage] = useState(1);
  const [scrollMomentum, setScrollMomentum] = useState(false);
  const [showLoadingMoreIndicator, setShowLoadingMoreIndicator] = useState(
    false
  );
  const [noMoreData, setNoMoreData] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [checkins, setCheckins] = useState([]);
  const student = useSelector(state => state.student.student);

  async function fetchCheckins(newPage) {
    const { data } = await api.get(
      `students/${student.id}/checkins?page=${newPage}`
    );

    if (!data.length) {
      setNoMoreData(true);
    } else {
      setNoMoreData(false);

      const newData = data.map(checkin => ({
        ...checkin,
        formattedDate: formatRelative(
          parseISO(checkin.created_at),
          new Date(),
          {
            locale: pt,
            addSuffix: true,
          }
        ),
      }));
      if (newPage === 1) {
        setCheckins(newData);
      } else {
        setCheckins([...checkins, ...newData]);
      }
    }

    setLoadingMore(false);
    setRefreshing(false);
    setShowLoadingMoreIndicator(false);

    setPage(newPage);
  }

  useEffect(() => {
    fetchCheckins(page);
  }, []);

  async function handleCreateCheckin() {
    try {
      await api.post(`/students/${student.id}/checkins`);
      fetchCheckins();
    } catch (err) {
      Alert.alert('Erro', 'Ocorreu uma falha ao registrar o checkin');
    }
  }

  async function handleLoadMore() {
    if (scrollMomentum) {
      setScrollMomentum(false);
      setLoadingMore(true);
      const newPage = page + 1;
      await fetchCheckins(newPage);
    }
  }

  async function onRefresh() {
    setRefreshing(true);
    fetchCheckins(1);
  }

  function renderFooter() {
    return (
      showLoadingMoreIndicator && (
        <View style={{ marginTop: 10 }}>
          <ActivityIndicator size={22} />
        </View>
      )
    );
  }

  return (
    <>
      <Container>
        <MyHeader />

        <Content>
          <MyButton onPress={handleCreateCheckin}>Novo check-in</MyButton>

          <CheckinList
            onRefresh={onRefresh}
            refreshing={refreshing}
            onEndReachedThreshold={0.1}
            onEndReached={() => {
              if (!loadingMore && !refreshing) {
                handleLoadMore();
              }
            }}
            onMomentumScrollBegin={() => {
              setScrollMomentum(true);
              if (!noMoreData) {
                setShowLoadingMoreIndicator(true);
              }
            }}
            data={checkins}
            keyExtractor={item => String(item.id)}
            ListFooterComponent={renderFooter}
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
