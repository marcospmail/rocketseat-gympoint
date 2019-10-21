import * as Yup from 'yup';

import Student from '../models/Student';

class StudentController {
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
      return res.status(400).json({ error: 'invalid id' });
    }

    const { email } = req.body;

    if (email) {
      const emailAlreadyExists = await Student.findOne({ where: { email } });

      if (emailAlreadyExists) {
        return res.status(400).json({ error: 'email already exists' });
      }
    }

    const student = await studentExists.update(req.body);

    return res.json({ student });
  }
}

export default new StudentController();
