import { Pipe, PipeTransform } from '@angular/core';
import { createHash } from 'crypto';

@Pipe({
  name: 'gravitar'
})
export class GravitarPipe implements PipeTransform {

  transform(email: string, args?: any): any {
    const hash = createHash('md5').update(email).digest('hex').toString();
    return `https://www.gravatar.com/avatar/${hash}?d=monsterid`;
  }

}
