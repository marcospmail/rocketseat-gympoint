import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import Students from '~/pages/Students';
import StudentForm from '~/pages/StudentForm';
import Plans from '~/pages/Plans';
import PlanForm from '~/pages/PlanForm';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" component={Students} isPrivate exact />
      <Route path="/students/new" component={StudentForm} isPrivate />
      <Route path="/students/:id/edit" component={StudentForm} isPrivate />

      <Route path="/plans" component={Plans} isPrivate exact />
      <Route path="/plans/new" component={PlanForm} isPrivate />
      <Route path="/plans/:id/edit" component={PlanForm} isPrivate />
    </Switch>
  );
}
