import { Component } from '@angular/core';
import { NotificationService } from './service/notification/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showToast : boolean = false
  message !: string

  error = true
  constructor(private _notificationService : NotificationService){
  }

  ngOnInit(){
    this._notificationService.status.subscribe((msg) => {
      if(msg === null){
        this.showToast = false
      }else { 
        this.showToast = true
        this.message = msg.message
        this.error = msg.error
      }
    })
  }
}
