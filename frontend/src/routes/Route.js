import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import DefaultLayout from '~/pages/_layouts/default';
import { items } from '~/routes/navigation';

import { setActiveNavItem } from '~/store/modules/navitem/actions';

export default function RouteWrapper({
  component: Component,
  navItem,
  isPrivate,
  ...rest
}) {
  const dispatch = useDispatch();
  const signed = useSelector(state => state.auth.signed);

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    const firstNavItem = items[Object.keys(items)[0]].route;
    return <Redirect to={firstNavItem} />;
  }

  const Layout = signed ? DefaultLayout : null;

  return (
    <Route
      {...rest}
      render={props => {
        if (navItem) dispatch(setActiveNavItem(navItem));

        if (Layout) {
          return (
            <Layout>
              <Component {...props} />
            </Layout>
          );
        }
        return <Component {...props} />;
      }}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  navItem: PropTypes.string,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
  navItem: null,
};
