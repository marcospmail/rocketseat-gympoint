import * as Yup from 'yup';

import HelpOrderAnswearMails from '../jobs/HelpOrderAnswearMails';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import Queue from '../../lib/Queue';

class GymHelpOrderController {
  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({ where: { answear: null } });
    return res.json(helpOrders);
  }

  async update(req, res) {
    const validateSchema = requestBody => {
      const schema = Yup.object().shape({
        answear: Yup.string()
          .required()
          .min(3),
      });

      return schema.isValid(requestBody);
    };

    if (!(await validateSchema(req.body))) {
      return res.status(400).json({ error: 'validation failed' });
    }

    const { help_order_id } = req.params;
    const helpOrder = await HelpOrder.findByPk(help_order_id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    if (!helpOrder) {
      return res.status(400).json({ error: 'question not found' });
    }

    if (helpOrder.answear) {
      return res.status(400).json({ error: 'question already answeared' });
    }

    const { answear } = req.body;

    helpOrder.answear = answear;
    helpOrder.answear_at = new Date();
    helpOrder.save();

    await Queue.add(HelpOrderAnswearMails.key, {
      helpOrder,
    });

    return res.json(helpOrder);
  }
}

export default new GymHelpOrderController();
