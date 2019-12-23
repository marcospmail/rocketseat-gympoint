import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';
import Students from '~/pages/Students';
import StudentForm from '~/pages/StudentForm';
import Plans from '~/pages/Plans';
import PlanForm from '~/pages/PlanForm';
import Registrations from '~/pages/Registrations';
import RegistrationsForm from '~/pages/RegistrationForm';
import HelpOrders from '~/pages/HelpOrders';

import { items } from '~/routes/navigation';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route
        path={items.students.route}
        component={Students}
        navItem={items.students.name}
        isPrivate
        exact
      />
      <Route
        path={`${items.students.route}/new`}
        component={StudentForm}
        navItem={items.students.name}
        isPrivate
      />
      <Route
        path={`${items.students.route}/:id/edit`}
        component={StudentForm}
        navItem={items.students.name}
        isPrivate
      />

      <Route
        path={items.plans.route}
        component={Plans}
        navItem={items.plans.name}
        isPrivate
        exact
      />
      <Route
        path={`${items.plans.route}/new`}
        component={PlanForm}
        navItem={items.plans.name}
        isPrivate
      />
      <Route
        path={`${items.plans.route}/:id/edit`}
        component={PlanForm}
        navItem={items.plans.name}
        isPrivate
      />

      <Route
        path={items.registrations.route}
        component={Registrations}
        navItem={items.registrations.name}
        isPrivate
        exact
      />
      <Route
        path={`${items.registrations.route}/new`}
        component={RegistrationsForm}
        navItem={items.registrations.name}
        isPrivate
      />
      <Route
        path={`${items.registrations.route}/:id/edit`}
        component={RegistrationsForm}
        navItem={items.registrations.name}
        isPrivate
      />

      <Route
        path={items.helpOrders.route}
        component={HelpOrders}
        navItem={items.helpOrders.name}
        isPrivate
        exact
      />
    </Switch>
  );
}
