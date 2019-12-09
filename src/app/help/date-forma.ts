export class DateTimeHelp {

  public static ChangeDate(input: string): string {


    if (input.length < 1) {
      return '';
    }
    const xxxx = (Date.parse(input));

    const newday = new Date(xxxx);

    console.log(newday);
    //
    return  newday.getFullYear() + '-' + (newday.getMonth() + 1) + '-' + newday.getDate ();
  }

}
