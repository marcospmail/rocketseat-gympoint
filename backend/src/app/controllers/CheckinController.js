import { startOfWeek, endOfWeek, subDays, addDays, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Op } from 'sequelize';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Aluno não encontrado' });
    }

    const checkins = await Checkin.findAll({
      where: { student_id },
      attributes: ['id', 'created_at'],
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Aluno não encontrado' });
    }

    const today = new Date();
    const sevenDaysAgo = subDays(today, 7);

    const weekCheckins = await Checkin.findAll({
      where: {
        student_id,
        created_at: {
          [Op.between]: [sevenDaysAgo, today],
        },
      },
    });

    if (weekCheckins.length >= 5) {
      const firstCheckinOfLastFiveCheckins = await Checkin.findOne({
        where: { student_id },
        offset: 4,
        order: [['created_at', 'DESC']],
      });

      const nextAvailableCheckin = addDays(
        firstCheckinOfLastFiveCheckins.createdAt,
        7
      );

      const formattedNextAvailableCheckin = format(
        nextAvailableCheckin,
        'dd/MM/yyyy HH:mm',
        {
          locale: pt,
        }
      );

      return res.status(400).json({
        error: `5 checkins per week limit reached, next available checkin is after ${formattedNextAvailableCheckin}`,
      });
    }

    const checkin = await Checkin.create({
      student_id,
    });

    return res.json(checkin);
  }
}

export default new CheckinController();
