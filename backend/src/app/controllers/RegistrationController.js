import * as Yup from 'yup';
import { startOfHour, addMonths, parseISO } from 'date-fns';
import Registration from '../models/Registration';
import Plan from '../models/Plan';
import Student from '../models/Student';
import Queue from '../../lib/Queue';
import WelcomeMail from '../jobs/WelcomeMails';

class RegistrationController {
  async index(req, res) {
    const { page } = req.query;

    const include = [
      {
        model: Student,
        as: 'student',
        attributes: ['id', 'name'],
      },
      {
        model: Plan,
        as: 'plan',
        attributes: ['id', 'title', 'duration'],
      },
    ];

    let pageLimit = {};

    if (page) {
      const limit = 5;

      pageLimit = {
        offset: (page - 1) * limit,
        limit,
      };
    }

    const registrations = await Registration.findAndCountAll({
      include,
      ...pageLimit,
    });

    const total = registrations.count;
    const lastPage = page ? page * pageLimit.limit >= total : true;

    return res.json({ total, lastPage, content: registrations.rows });
  }

  async show(req, res) {
    const { id } = req.params;

    const include = [
      {
        model: Student,
        as: 'student',
        attributes: ['id', 'name'],
      },
      {
        model: Plan,
        as: 'plan',
        attributes: ['id', 'title', 'duration'],
      },
    ];

    const registration = await Registration.findByPk(id, { include });
    return res.json(registration);
  }

  async store(req, res) {
    const validateSchema = requestBody => {
      const schema = Yup.object().shape({
        plan_id: Yup.number()
          .required()
          .integer()
          .positive(),
        student_id: Yup.number()
          .required()
          .positive(),
        date: Yup.date().required(),
      });

      return schema.isValid(requestBody);
    };

    if (!(await validateSchema(req.body))) {
      return res.status(400).json({ error: 'Validação falhou' });
    }

    const { student_id, plan_id, date } = req.body;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Aluno não encontrado' });
    }

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ error: 'Plano não encontrado' });
    }

    const parsedDate = parseISO(date);

    const { price, duration } = plan;
    const startDate = startOfHour(parsedDate);

    const endDate = addMonths(startDate, duration);
    const registrationPrice = duration * price;

    const registration = await Registration.create({
      student_id: student.id,
      plan_id: plan.id,
      start_date: startDate,
      end_date: endDate,
      price: registrationPrice,
    });

    await Queue.add(WelcomeMail.key, {
      registration,
      student,
      plan,
    });

    return res.json(registration);
  }

  async update(req, res) {
    const validateSchema = requestBody => {
      const schema = Yup.object().shape({
        plan_id: Yup.number().positive(),
        student_id: Yup.number().positive(),
        date: Yup.date(),
      });

      return schema.isValid(requestBody);
    };

    if (!(await validateSchema(req.body))) {
      return res.status(400).json({ error: 'Validação falhou' });
    }

    const { registration_id } = req.params;

    const registration = await Registration.findByPk(registration_id);

    if (!registration) {
      return res.status(400).json({ error: 'Matrícula não encontrada' });
    }

    const { student_id, plan_id, date } = req.body;

    if (student_id) {
      const student = await Student.findByPk(student_id);

      if (!student) {
        return res.status(400).json({ error: 'Aluno não encontrado' });
      }

      registration.student_id = student_id;
    }

    if (plan_id) {
      const plan = await Plan.findByPk(plan_id);

      if (!plan) {
        return res.status(400).json({ error: 'Plano não encontrado' });
      }

      const { price, duration } = plan;

      const endDate = addMonths(registration.start_date, duration);
      const registrationPrice = duration * price;

      registration.plan_id = plan_id;
      registration.end_date = endDate;
      registration.price = registrationPrice;
    }

    if (date) {
      const parsedDate = parseISO(date);

      const plan = await Plan.findByPk(registration.plan_id);

      const { price, duration } = plan;

      const endDate = addMonths(parsedDate, duration);
      const registrationPrice = duration * price;

      registration.start_date = date;
      registration.end_date = endDate;
      registration.price = registrationPrice;
    }

    registration.save();

    return res.json(registration);
  }

  async delete(req, res) {
    const { registration_id } = req.params;

    const registration = await Registration.findByPk(registration_id);

    if (!registration) {
      return res.status(400).json({ error: 'Matrícula não encontrada' });
    }

    await registration.destroy();

    return res.send();
  }
}

export default new RegistrationController();
