import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tmsweightconvert'
})
export class TmsweightconvertPipe implements PipeTransform {

  transform(value: number, inputsymbole: string): string {

     if (inputsymbole.toLocaleLowerCase() === 'g') {

      const result =  (value / 1000 / 1000);

      // return result;
      return  result.toFixed(3);


    } else {
      return  '未知';
    }
  }

}




@Pipe({
  name: 'tmsvolumeconvert'
})
export class TmsVolumeconvertPipe implements PipeTransform {

  transform(value: number, inputsymbole: string): string {

    if (inputsymbole.toLocaleLowerCase() === 'cm') {

      const result =  (value / 1000 / 1000);
      return  result.toFixed(3);
      // return result;

    } else {
      return  '未知';
    }
  }

}


@Pipe({
  name: 'numberformat'
})
export class TmsNumberFormatPipe implements PipeTransform {

  transform(value: number, fractionDigits: number): string {

    return  value.toFixed(fractionDigits);
  }

}
