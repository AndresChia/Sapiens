import { Pipe, PipeTransform } from '@angular/core';
import { estudiante } from "../interface/interfaces";
@Pipe({
  name: 'filtroEstudiantesChecked',
  pure: false
})
export class FiltroEstudiantesCheckedPipe implements PipeTransform {

  transform(value: estudiante[]): estudiante[] {

    return value.filter(
      est => est.check === true);
  }

}
