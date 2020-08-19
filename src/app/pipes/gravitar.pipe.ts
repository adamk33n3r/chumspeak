import { Pipe, PipeTransform } from '@angular/core';
// import { createHash } from 'crypto';
import { createHash } from './md5';

@Pipe({
  name: 'gravitar'
})
export class GravitarPipe implements PipeTransform {

  transform(email: string, args?: any): any {
    // const hash = createHash('md5').update(email).digest('hex').toString();
    const hash = createHash(email);
    return `https://www.gravatar.com/avatar/${hash}?d=monsterid`;
  }

}
