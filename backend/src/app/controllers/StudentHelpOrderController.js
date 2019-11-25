import * as Yup from 'yup';

import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';

class StudentHelpOrderController {
  async index(req, res) {
    const { student_id } = req.params;
    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Estudante não encontrado' });
    }

    const helpOrders = await HelpOrder.findAll({ where: { student_id } });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const validateSchema = requestBody => {
      const schema = Yup.object().shape({
        question: Yup.string().required(),
      });

      return schema.isValid(requestBody);
    };

    if (!(await validateSchema(req.body))) {
      return res.status(400).json({ error: 'Validação falhou' });
    }

    const { student_id } = req.params;
    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Estudante não encontrado' });
    }

    const helpOrder = await HelpOrder.create({
      student_id,
      question: req.body.question,
    });

    return res.json(helpOrder);
  }
}

export default new StudentHelpOrderController();
