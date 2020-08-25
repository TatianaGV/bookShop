import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthService } from '../../../login/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  constructor(
    private _authService: AuthService,
  ) { }

  public get logged$(): Observable<boolean> {
    return this._authService.isLoggedIn();
  }

  public ngOnInit(): void {
  }

}
