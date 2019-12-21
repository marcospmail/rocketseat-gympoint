import * as Yup from 'yup';
import { Op } from 'sequelize';
import { startOfHour, addMonths, parseISO } from 'date-fns';
import Registration from '../models/Registration';
import User from '../models/User';
import Plan from '../models/Plan';
import Student from '../models/Student';
import Queue from '../../lib/Queue';
import WelcomeMail from '../jobs/WelcomeMails';

class RegistrationController {
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

      registration.plan_id = plan_id;
      registration.start_date = date;
      registration.end_date = endDate;
      registration.price = registrationPrice;
    }

    registration.save();

    return res.json(registration);
  }

  async index(req, res) {
    const { id, page } = req.query;

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

    if (id) {
      const registration = await Registration.findByPk(id, { include });
      return res.json(registration);
    }

    if (page) {
      const limit = 5;

      const registrationsCount = await Registration.count();

      const lastPage = page * limit >= registrationsCount;

      const queryLimitOffset = {
        limit,
        offset: (page - 1) * limit,
      };

      const registrations = await Registration.findAll({
        include,
        ...queryLimitOffset,
      });

      return res.json({ lastPage, content: registrations });
    }

    const registrations = await Registration.findAll();

    return res.json(registrations);
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
