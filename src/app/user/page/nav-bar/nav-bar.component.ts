import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  userLogin : boolean
  constructor(
  ){
    this.userLogin = localStorage.getItem('userJwt') ? true : false
  }

  logOut(){
    localStorage.removeItem('userJwt')
    window.location.reload()
  }
}
