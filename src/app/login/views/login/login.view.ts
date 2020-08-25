import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  templateUrl: './login.view.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginView implements OnInit {

  public email: string;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
  ) { }

  public ngOnInit(): void {
    this.email = this._activatedRoute.snapshot.queryParamMap.get('email');
  }

  public navigateToAccount(): void {
    this._router.navigate(['/', 'account']).then();
  }

}
