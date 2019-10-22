import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class WelcomeMail {
  get key() {
    return 'WelcomeMail';
  }

  async handle({ data }) {
    const { registration, student, plan } = data;

    const startDate = format(
      parseISO(registration.start_date),
      "'dia' dd 'de' MMMM' de ' yyyy",
      {
        locale: pt,
      }
    );

    const endDate = format(
      parseISO(registration.end_date),
      "'dia' dd 'de' MMMM' de ' yyyy",
      {
        locale: pt,
      }
    );

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matrícula plano - GYMPoint',
      template: 'welcome',
      context: {
        student_name: student.name,
        plan_title: plan.title,
        plan_start_date: startDate,
        plan_end_date: endDate,
        plan_total_price: registration.price,
      },
    });
  }
}

export default new WelcomeMail();
