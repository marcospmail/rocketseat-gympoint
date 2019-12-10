import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import StudentHelpOrderController from './app/controllers/StudentHelpOrderController';
import GymHelpOrderController from './app/controllers/GymHelpOrderController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/', (req, res) => res.send('worked!'));

routes.post('/sessions', SessionController.store);

routes.get('/students/:student_id/checkins', CheckinController.index);
routes.post('/students/:student_id/checkins', CheckinController.store);

routes.get('/help-orders', GymHelpOrderController.index);
routes.put(
  '/help-orders/:help_order_id/answear',
  GymHelpOrderController.update
);
routes.delete('/help-orders/:help_order_id', GymHelpOrderController.delete);

routes.post(
  '/students/:student_id/help-orders',
  StudentHelpOrderController.store
);
routes.get(
  '/students/:student_id/help-orders',
  StudentHelpOrderController.index
);

routes.get('/students', StudentController.index);

routes.use(authMiddleware);

routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.post('/registrations', RegistrationController.store);
routes.get('/registrations', RegistrationController.index);
routes.put('/registrations/:registration_id', RegistrationController.update);
routes.delete('/registrations/:registration_id', RegistrationController.delete);

export default routes;
