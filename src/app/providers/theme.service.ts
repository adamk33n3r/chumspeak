import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {
    console.log('THEME SERVICE');
    document.body.classList.add('chumspeak-light-theme');
  }

  public toggleTheme() {
    if (document.body.classList.contains('chumspeak-light-theme')) {
      document.body.classList.remove('chumspeak-light-theme');
      document.body.classList.add('chumspeak-dark-theme');
    } else if (document.body.classList.contains('chumspeak-dark-theme')) {
      document.body.classList.remove('chumspeak-dark-theme');
      document.body.classList.add('chumspeak-light-theme');
    }
  }
}
