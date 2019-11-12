import * as Yup from 'yup';
import { Op } from 'sequelize';

import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const { id, q } = req.query;

    if (id) {
      const student = await Student.findByPk(id);
      return res.json(student);
    }

    if (q) {
      const students = await Student.findAll({
        where: { name: { [Op.iLike]: `%${q}%` } },
      });

      return res.json(students);
    }

    const students = await Student.findAll();
    return res.json(students);
  }

  async store(req, res) {
    const validateSchema = requestBody => {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string()
          .required()
          .email(),
        age: Yup.number()
          .required()
          .positive()
          .integer(),
        weight: Yup.number()
          .required()
          .positive(),
        height: Yup.number()
          .required()
          .positive(),
      });

      return schema.isValid(requestBody);
    };

    if (!(await validateSchema(req.body))) {
      return res.status(400).json({ error: 'validation failed' });
    }

    const { email } = req.body;

    const student = await Student.findOne({ where: { email } });

    if (student) {
      return res.status(400).json({ error: 'email already exists' });
    }

    const createdStudent = await Student.create(req.body);

    return res.json({ createdStudent });
  }

  async update(req, res) {
    const validateSchema = requestBody => {
      const schema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email(),
        age: Yup.number()
          .positive()
          .integer(),
        weight: Yup.number().positive(),
        height: Yup.number().positive(),
      });

      return schema.isValid(requestBody);
    };

    if (!(await validateSchema(req.body))) {
      return res.status(400).json({ error: 'validation failed' });
    }

    const { id } = req.params;

    const studentExists = await Student.findByPk(id);

    if (!studentExists) {
      return res.status(400).json({ error: 'student not found' });
    }

    const { email } = req.body;

    if (email) {
      const emailAlreadyExists = await Student.findOne({
        where: {
          email,
          id: {
            [Op.not]: id,
          },
        },
      });

      if (emailAlreadyExists) {
        return res.status(400).json({ error: 'email already exists' });
      }
    }

    const student = await studentExists.update(req.body);

    return res.json(student);
  }

  async delete(req, res) {
    const { id } = req.params;

    const studentExists = await Student.findByPk(id);

    if (!studentExists) {
      return res.status(400).json({ error: 'student not found' });
    }

    studentExists.destroy();
    return res.send();
  }
}

export default new StudentController();
