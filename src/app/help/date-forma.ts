export class DateTimeHelp {

  public static ChangeDate(input: string, includetime: boolean): string {


    if (input.length < 1) {
      return '';
    }
    const xxxx = (Date.parse(input));

    const newday = new Date(xxxx);

    console.log(newday);
    //
    if (includetime === false) {
      return  newday.getFullYear() + '-' + (newday.getMonth() + 1) + '-' + newday.getDate ();
    } else {
      // tslint:disable-next-line:max-line-length
      return  newday.getFullYear() + '-' + (newday.getMonth() + 1) + '-' + newday.getDate () + ' ' + newday.getHours() + ':' + newday.getMinutes();
    }
  }

}
