import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import Users from '~/pages/Users';
import UserEdit from '~/pages/UserEdit';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/users" component={Users} isPrivate exact />
      <Route path="/users/:id/edit" component={UserEdit} isPrivate />
    </Switch>
  );
}
