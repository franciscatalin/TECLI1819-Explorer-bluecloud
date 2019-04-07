import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-translatable',
  templateUrl: './translatable.component.html',
  styleUrls: ['./translatable.component.css']
})
export class TranslatableComponent {

  constructor(private translate: TranslateService) {
    // Recuperamos en la variable lang el lenguaje que tengamos cargado en el localStorage
    let lang = localStorage.getItem('language');

    // Inicialmente no tendremos ningun lenguaje en el localStorage, así que la variable será null
    if (lang === 'null') {
      // La primera vez obtenemos por defecto el lenguaje del browser
      lang = this.translate.getBrowserLang();
    }
    translate.setDefaultLang(lang);
    this.changeLanguage(lang);
  }

  // Método para cambiar el lenguaje
  changeLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('language', language);
  }
}
