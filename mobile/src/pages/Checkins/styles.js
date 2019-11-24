import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background: #f2f2f2;
  flex: 1;
`;

export const Content = styled.View`
  padding: 20px;
`;

export const Header = styled.View`
  background: #fff;
  height: 44px;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const HeaderImage = styled.Image`
  width: 36px;
  height: 18px;
`;

export const HeaderText = styled.Text`
  font-size: 14px;
  line-height: 16px;
  font-weight: bold;
  color: #ee4e62;
  margin-left: 8px;
`;

export const CheckinList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 10px;
`;

export const Checkin = styled.View`
  height: 46px;
  padding: 0 20px;
  margin-top: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background: #fff;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CheckinNumber = styled.Text`
  color: #444444;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
`;

export const CheckinDate = styled.Text`
  color: #666;
  font-size: 14px;
  line-height: 16px;
`;
