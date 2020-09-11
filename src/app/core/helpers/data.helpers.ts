export function parseDateFromUrl(date: string): Date {
  if (date) {
    const arrWriteDate = date.split('-');

    return new Date(
      Date.parse(`${arrWriteDate[1]} ${arrWriteDate[0]} ${arrWriteDate[2]}`),
    );
  } else {
    throw new Error('Error parse date from URL');
  }
}

export function parseDate(datePickerValue: string): string {
  if (datePickerValue) {
    const date = new Date(datePickerValue);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();

    if (+day < 10) {
      day = '0' + day;
    }

    if (+month < 10) {
      month = '0' + month;
    }

    return `${day}-${month}-${year}`;
  } else {
    throw new Error('Error parse date');
  }
}
