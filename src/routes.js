import { Router } from 'express';

import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/students', (req, res) => res.json({ ok: true }));

export default routes;
