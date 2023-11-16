import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  status: BehaviorSubject<{message : string , error : boolean} | null> = 
  new BehaviorSubject<{message : string , error : boolean} | null>(null)

  showToast(message: string, error : boolean) {
    this.status.next({message, error})

    window.setTimeout(() => {
      this.status.next(null)
    }, 3000)
  }
}
