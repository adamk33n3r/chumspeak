import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {
    console.log('THEME SERVICE');
    document.body.classList.add('chumchat-light-theme');
  }

  public toggleTheme() {
    if (document.body.classList.contains('chumchat-light-theme')) {
      document.body.classList.remove('chumchat-light-theme');
      document.body.classList.add('chumchat-dark-theme');
    } else if (document.body.classList.contains('chumchat-dark-theme')) {
      document.body.classList.remove('chumchat-dark-theme');
      document.body.classList.add('chumchat-light-theme');
    }
  }
}
