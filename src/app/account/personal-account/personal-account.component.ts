import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../login/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-account',
  templateUrl: './personal-account.component.html',
  styleUrls: ['./personal-account.component.scss'],
})
export class PersonalAccountComponent implements OnInit {

  constructor(
    private _router: Router,
    private _authService: AuthService,
  ) { }

  public ngOnInit(): void {
  }

  public logout(): void {
    this._authService.logout();
    this._router.navigate(['/', 'login']);
  }

}
