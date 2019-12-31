import React, { useState, useEffect } from 'react';
import { View, Alert, ActivityIndicator, RefreshControl } from 'react-native';
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
  NoData,
  NoDataText,
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
  const [totalRowCount, setTotalRowCount] = useState(0);
  const student = useSelector(state => state.student.student);

  useEffect(() => {
    fetchCheckins(page);
  }, []);

  useEffect(() => {
    if (refreshing) {
      fetchCheckins(1);
    }
  }, [refreshing]);

  function removeDuplicates(list, attribute) {
    return list.filter(
      (item, pos) =>
        list.map(checkin => checkin[attribute]).indexOf(item[attribute]) === pos
    );
  }

  function formatDateRelative(date) {
    return formatRelative(parseISO(date), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }

  async function fetchCheckins(newPage) {
    const { data } = await api.get(`students/${student.id}/checkins`, {
      params: { page: newPage },
    });

    setTotalRowCount(data.total);
    setNoMoreData(data.lastPage);

    const newData = data.content.map(checkin => ({
      ...checkin,
      formattedDate: formatDateRelative(checkin.created_at),
    }));

    if (newPage === 1) {
      setCheckins(newData);
    } else {
      const newCheckins = [...checkins, ...newData];
      setCheckins(removeDuplicates(newCheckins, 'id'));
    }

    setPage(newPage);

    setLoadingMore(false);
    setRefreshing(false);
    setShowLoadingMoreIndicator(false);
  }

  async function handleCreateCheckin() {
    try {
      const { data } = await api.post(`/students/${student.id}/checkins`);

      const newCheckins = [
        { ...data, formattedDate: formatDateRelative(data.created_at) },
        ...checkins,
      ];

      setCheckins(newCheckins);
      setTotalRowCount(totalRowCount + 1);
    } catch (err) {
      Alert.alert('Erro', err.response.data.error);
    }
  }

  async function handleLoadMore() {
    setScrollMomentum(false);
    setLoadingMore(true);
    const newPage = page + 1;
    await fetchCheckins(newPage);
  }

  async function onRefresh() {
    setRefreshing(true);
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
          <MyButton onPress={handleCreateCheckin}>Novo check-in</MyButton>

          {checkins.length ? (
            <CheckinList
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
              data={checkins}
              keyExtractor={item => String(item.id)}
              ListFooterComponent={showLoadingMoreIndicator && renderFooter}
              renderItem={({ item, index }) => (
                <Checkin>
                  <CheckinNumber>{`Checkin #${totalRowCount -
                    index}`}</CheckinNumber>
                  <CheckinDate>{item.formattedDate}</CheckinDate>
                </Checkin>
              )}
            />
          ) : (
            <NoData
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              <NoDataText>Nada encontrado</NoDataText>
            </NoData>
          )}
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
