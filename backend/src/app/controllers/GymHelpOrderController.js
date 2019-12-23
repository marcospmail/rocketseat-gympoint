import * as Yup from 'yup';
import { Op } from 'sequelize';

import HelpOrderAnswearMails from '../jobs/HelpOrderAnswearMails';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import Queue from '../../lib/Queue';

class GymHelpOrderController {
  async index(req, res) {
    const include = [
      {
        model: Student,
        as: 'student',
        attributes: ['id', 'name'],
      },
    ];

    const { page } = req.query;

    if (page) {
      const limit = 5;

      const plansCount = await HelpOrder.count({
        where: {
          answear: null,
          student_id: {
            [Op.ne]: null,
          },
        },
      });
      const lastPage = page * limit >= plansCount;

      const helpOrders = await HelpOrder.findAll({
        where: {
          answear: null,
          student_id: {
            [Op.ne]: null,
          },
        },
        limit,
        offset: (page - 1) * limit,
        include,
      });
      return res.json({ lastPage, content: helpOrders });
    }

    const helpOrders = await HelpOrder.findAll({
      include,
    });
    return res.json(helpOrders);
  }

  async update(req, res) {
    const validateSchema = requestBody => {
      const schema = Yup.object().shape({
        answear: Yup.string().required(),
      });

      return schema.isValid(requestBody);
    };

    if (!(await validateSchema(req.body))) {
      return res.status(400).json({ error: 'Validação falhou' });
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
      return res
        .status(400)
        .json({ error: 'Pedido de auxílio não encontrado' });
    }

    if (helpOrder.answear) {
      return res.status(400).json({ error: 'Pedido de auxílio já respondido' });
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

  async delete(req, res) {
    const helpOrder = await HelpOrder.findByPk(req.params.help_order_id);

    if (!helpOrder) {
      return res
        .status(400)
        .json({ error: 'Pedido de auxílio não encontrado' });
    }

    helpOrder.destroy();

    return res.send();
  }
}

export default new GymHelpOrderController();
