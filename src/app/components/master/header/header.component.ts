import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component'
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends TranslatableComponent implements OnInit {

  constructor(private translateService: TranslateService,
    private messageService: MessageService,
    private authservice: AuthService) {
    super(translateService);
  }

  changeLanguage(language: string) {
    super.changeLanguage(language);
  }

  ngOnInit() {
  }

  logout() {
    this.authservice.logout()
      .then(_ => {
        this.messageService.notifyMessage('messages.auth.logout', 'alert alert-success');
      })
      .catch(error => {
        this.messageService.notifyMessage('errorMessages.auth.logout.failed', 'alert alert-danger');
        console.log(error);
      });
    }


}
