import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

function formatDate(date) {
  return format(parseISO(date), "'dia' dd 'de' MMMM' de ' yyyy", {
    locale: pt,
  });
}

export default formatDate;
