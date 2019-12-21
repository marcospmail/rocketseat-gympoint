import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { formatPrice } from '../../util/PriceFormat';
import Mail from '../../lib/Mail';

class WelcomeMail {
  get key() {
    return 'WelcomeMail';
  }

  async handle({ data }) {
    const { registration, student, plan } = data;

    const formatDate = date =>
      format(parseISO(date), "'dia' dd 'de' MMMM' de ' yyyy", {
        locale: pt,
      });

    const startDate = formatDate(registration.start_date);
    const endDate = formatDate(registration.end_date);

    const price = formatPrice(registration.price);

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matrícula plano - GYMPoint',
      template: 'welcome',
      context: {
        student_name: student.name,
        plan_title: plan.title,
        plan_start_date: startDate,
        plan_end_date: endDate,
        plan_total_price: price,
      },
    });
  }
}

export default new WelcomeMail();
