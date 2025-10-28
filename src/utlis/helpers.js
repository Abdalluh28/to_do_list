import { isToday, isTomorrow, format } from 'date-fns';

export function calcDate(date) {
    let dateString = ''

    if (isToday(date)) {
        dateString = 'Today';
    } else if (isTomorrow(date)) {
        dateString = 'Tomorrow';
    } else {
        dateString = format(date, 'dd MMM').toUpperCase();
    }

    return dateString;
}
