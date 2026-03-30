import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AuthService} from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.html',
  styleUrl: './auth.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Auth {
  private readonly authService = inject(AuthService);

  ngOnInit() {
    if(this.authService.login("admin", "admin")) {
      console.warn("SUCCESS!!!")
    }
  }
}
