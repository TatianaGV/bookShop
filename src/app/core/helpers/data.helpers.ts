export function preparingDateFromUrl(date: string): Date {
  if (date) {
    const arrWriteDate = date.split('-');

    return new Date(
      Date.parse(`${arrWriteDate[1]} ${arrWriteDate[0]} ${arrWriteDate[2]}`),
    );
  }
}

export function parseDate(datePickerValue: string): string {
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
}

export function getDateFromUrl(date: string): Date {
  if (date) {
    const arrDate = date.split('-');
    date = `${arrDate[1]}-${arrDate[0]}-${arrDate[2]}`;
    const msecDate = Date.parse(date);

    return new Date(msecDate);
  }
}
