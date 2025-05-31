import { format } from 'date-fns';

const dateFormat = (d) => {
  return new Date(d).toLocaleDateString();
};

const dateFormat2 = (date) => {
    const d = new Date(date)
  return format(d, 'eeee, MMMM do, yyyy, h:mm a');
};

export { dateFormat, dateFormat2 };
