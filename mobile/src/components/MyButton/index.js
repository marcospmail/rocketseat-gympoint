import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { TButton, TButtonText } from './styles';

export default function MyButton({ children, loading, ...rest }) {
  return (
    <TButton {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color="#FFF" />
      ) : (
        <TButtonText>{children}</TButtonText>
      )}
    </TButton>
  );
}

MyButton.defaultProps = {
  loading: false,
};

MyButton.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};
