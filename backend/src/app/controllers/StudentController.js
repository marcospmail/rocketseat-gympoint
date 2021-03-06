import * as Yup from 'yup';
import { Op } from 'sequelize';

import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const { q, page } = req.query;

    let pageLimit = {};

    if (page) {
      const limit = 5;

      pageLimit = {
        offset: (page - 1) * limit,
        limit,
      };
    }

    const where = q ? { name: { [Op.iLike]: `%${q}%` } } : {};

    const students = await Student.findAndCountAll({
      where,
      ...pageLimit,
    });

    const total = students.count;
    const lastPage = page ? page * pageLimit.limit >= total : true;

    return res.json({ lastPage, total, content: students.rows });
  }

  async show(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Aluno não encontrado' });
    }

    return res.json(student);
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
      return res.status(400).json({ error: 'Validação falhou' });
    }

    const { email } = req.body;

    const student = await Student.findOne({ where: { email } });

    if (student) {
      return res.status(400).json({ error: 'O email já existe' });
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
      return res.status(400).json({ error: 'Validação falhou' });
    }

    const { id } = req.params;

    const studentExists = await Student.findByPk(id);

    if (!studentExists) {
      return res.status(400).json({ error: 'Aluno não encontrado' });
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
        return res.status(400).json({ error: 'O email já existe' });
      }
    }

    const student = await studentExists.update(req.body);

    return res.json(student);
  }

  async delete(req, res) {
    const { id } = req.params;

    const studentExists = await Student.findByPk(id);

    if (!studentExists) {
      return res.status(400).json({ error: 'Estudante não encontrado' });
    }

    studentExists.destroy();
    return res.send();
  }
}

export default new StudentController();
