export function preparingDateFromUrl(date: string): any {
  if (date) {
    const arrWriteDate = date.split('-');

    return new Date(
      Date.parse(`${arrWriteDate[1]} ${arrWriteDate[0]} ${arrWriteDate[2]}`),
    );
  }
}
