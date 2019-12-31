import * as Yup from 'yup';
import { Op } from 'sequelize';

import HelpOrderAnswearMails from '../jobs/HelpOrderAnswearMails';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import Queue from '../../lib/Queue';

class GymHelpOrderController {
  async index(req, res) {
    const { page } = req.query;

    let pageLimit = {};

    if (page) {
      const limit = 5;

      pageLimit = {
        offset: (page - 1) * limit,
        limit,
      }
    }

    const helpOrders = await HelpOrder.findAndCountAll({
      where: {
        answear: null,
        student_id: {
          [Op.ne]: null,
        }
      },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
      ],
      ...pageLimit,
    });

    const total = helpOrders.count;
    const lastPage = page ? page * pageLimit.limit >= total : true;

    return res.json({ total, lastPage, content: helpOrders.rows });
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
