import * as Yup from 'yup';

import Plan from '../models/Plan';
import User from '../models/User';

class SessionController {
  async index(req, res) {
    const loggedUser = await User.findByPk(req.userId);

    if (!loggedUser) {
      return res.status(400).json({ error: 'Token inválido' });
    }

    const { id } = req.query;

    if (id) {
      const plan = await Plan.findByPk(id);
      return res.json(plan);
    }

    const plans = await Plan.findAll();

    return res.json(plans);
  }

  async store(req, res) {
    const validateSchema = requestBody => {
      const schema = Yup.object().shape({
        title: Yup.string().required(),
        price: Yup.number()
          .required()
          .positive(),
        duration: Yup.number()
          .required()
          .integer()
          .positive(),
      });

      return schema.isValid(requestBody);
    };

    if (!(await validateSchema(req.body))) {
      return res.status(400).json({ error: 'Validação falhou' });
    }

    const loggedUser = await User.findByPk(req.userId);

    if (!loggedUser) {
      return res.status(400).json({ error: 'Token inválido' });
    }

    const { title, duration, price } = req.body;

    const planAlreadyExists = await Plan.findOne({ where: { title } });

    if (planAlreadyExists) {
      return res.status(400).json({ error: 'O plano já existe' });
    }

    const plan = await Plan.create({ title, duration, price });

    return res.json(plan);
  }

  async update(req, res) {
    const validateSchema = requestBody => {
      const schema = Yup.object().shape({
        title: Yup.string(),
        price: Yup.number().positive(),
        duration: Yup.number()
          .integer()
          .positive(),
      });

      return schema.isValid(requestBody);
    };

    if (!(await validateSchema(req.body))) {
      return res.status(400).json({ error: 'Validação falhou' });
    }

    const loggedUser = await User.findByPk(req.userId);

    if (!loggedUser) {
      return res.status(400).json({ error: 'Token inválido' });
    }

    const plan = await Plan.findByPk(req.params.id);
    if (!plan) {
      return res.status(400).json({ error: 'Plano não encontrado' });
    }

    const updatedPlan = await plan.update(req.body);

    return res.json(updatedPlan);
  }

  async delete(req, res) {
    const loggedUser = await User.findByPk(req.userId);

    if (!loggedUser) {
      return res.status(400).json({ error: 'Token inválido' });
    }

    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: 'Plano não encontrado' });
    }

    await plan.destroy();

    return res.send();
  }
}

export default new SessionController();
