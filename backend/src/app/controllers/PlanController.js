import * as Yup from 'yup';

import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const { page, id } = req.query;

    if (id) {
      const plan = await Plan.findByPk(id);
      return res.json(plan);
    }

    let pageLimit = {};

    if (page) {
      const limit = 5;

      pageLimit = {
        offset: (page - 1) * limit,
        limit,
      };
    }

    const plans = await Plan.findAndCountAll({
      ...pageLimit
    });

    const total = plans.count;
    const lastPage = page ? page * pageLimit.limit >= total : true;

    return res.json({ total, lastPage, content: plans.rows });
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

    const plan = await Plan.findByPk(req.params.id);
    if (!plan) {
      return res.status(400).json({ error: 'Plano não encontrado' });
    }

    const updatedPlan = await plan.update(req.body);

    return res.json(updatedPlan);
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: 'Plano não encontrado' });
    }

    await plan.destroy();

    return res.send();
  }
}

export default new PlanController();
