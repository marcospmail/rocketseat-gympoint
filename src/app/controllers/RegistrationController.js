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
      return res.status(400).json({ error: 'validation failed' });
    }

    const loggedUser = await User.findByPk(req.userId);

    if (!loggedUser) {
      return res.status(400).json({ error: 'invalid user token' });
    }

    const { student_id, plan_id, date } = req.body;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'invalid student' });
    }

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ error: 'invalid plan' });
    }

    const parsedDate = parseISO(date);

    const registrationAlreadyExists = await Registration.findOne({
      where: {
        student_id,
        start_date: {
          [Op.lte]: parsedDate,
        },
        end_date: {
          [Op.gte]: parsedDate,
        },
      },
    });

    if (registrationAlreadyExists) {
      return res
        .status(400)
        .json({ error: 'student already has a active registration' });
    }

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
      return res.status(400).json({ error: 'validation failed' });
    }

    const loggedUser = await User.findByPk(req.userId);

    if (!loggedUser) {
      return res.status(400).json({ error: 'invalid user token' });
    }

    const { registration_id } = req.params;

    if (!registration_id) {
      return res.status(400).json({ error: 'invalid registration' });
    }

    const registration = await Registration.findByPk(registration_id);

    if (!registration) {
      return res.status(400).json({ error: 'invalid registration' });
    }

    const { student_id, plan_id, date } = req.body;

    if (student_id) {
      if (student_id === registration.student_id) {
        return res.status(400).json({ error: 'cant change to same student' });
      }

      const student = await Student.findByPk(student_id);

      if (!student) {
        return res.status(400).json({ error: 'invalid student' });
      }

      registration.student_id = student_id;
    }

    if (plan_id) {
      if (plan_id === registration.plan_id) {
        return res.status(400).json({ error: 'cant change to same plan' });
      }

      const plan = await Plan.findByPk(plan_id);

      if (!plan) {
        return res.status(400).json({ error: 'invalid plan' });
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

      const registrationAlreadyExists = await Registration.findOne({
        where: {
          id: {
            [Op.not]: registration.id,
          },
          student_id: registration.student_id,
          start_date: {
            [Op.lte]: parsedDate,
          },
          end_date: {
            [Op.gte]: parsedDate,
          },
        },
      });

      if (registrationAlreadyExists) {
        return res.status(400).json({
          error:
            'student already has a active registration in the informed date',
        });
      }

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

    // TODO implement a different email when admin changes student plan?
    // await Queue.add(WelcomeMail.key, {
    //   registration,
    //   student,
    //   plan,
    // });

    return res.json(registration);
  }

  async index(req, res) {
    const { page } = req.query;

    if (!page) {
      return res.status(400).json({ error: 'missing page' });
    }

    const loggedUser = await User.findByPk(req.userId);

    if (!loggedUser) {
      return res.status(400).json({ error: 'invalid user token' });
    }

    const registrations = await Registration.findAll({
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(registrations);
  }

  async delete(req, res) {
    const { registration_id } = req.params;

    const loggedUser = await User.findByPk(req.userId);

    if (!loggedUser) {
      return res.status(400).json({ error: 'invalid user token' });
    }

    const registrationExists = await Registration.findByPk(registration_id);

    if (!registrationExists) {
      return res.status(400).json({ error: 'invalid registration' });
    }

    registration.destroy();

    return res.send();
  }
}

export default new RegistrationController();
