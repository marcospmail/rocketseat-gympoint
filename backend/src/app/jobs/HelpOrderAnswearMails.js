import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class HelpOrderAnswearMails {
  get key() {
    return 'HelpOrderAnswearMail';
  }

  async handle({ data }) {
    const { helpOrder } = data;

    const answearDate = format(
      parseISO(helpOrder.answear_at),
      "dd/MM/yyyy' às 'HH:mm",
      {
        locale: pt,
      }
    );

    const questionDate = format(
      parseISO(helpOrder.createdAt),
      "dd/MM/yyyy' às 'HH:mm",
      {
        locale: pt,
      }
    );

    await Mail.sendMail({
      to: `${helpOrder.student.name} <${helpOrder.student.email}>`,
      subject: 'Pergunta respondida - GYMPoint',
      template: 'help_order_answear',
      context: {
        student_name: helpOrder.student.name,
        question: helpOrder.question,
        question_date: questionDate,
        answear: helpOrder.answear,
        answear_date: answearDate,
      },
    });
  }
}

export default new HelpOrderAnswearMails();
