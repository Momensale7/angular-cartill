import { AuthService } from './../../services/auth.service';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HasTokenService } from '../../services/has-token.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  isUserHasToken!: boolean;

  authService = inject(AuthService);

  constructor(private _hasToken: HasTokenService) {
    this._hasToken.hasToken.subscribe((res) => {
      this.isUserHasToken = res;
    })
  }

}
