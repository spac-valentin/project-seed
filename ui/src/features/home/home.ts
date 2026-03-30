import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly stats = [
    { label: 'Employees', value: '2,847', icon: '👥' },
    { label: 'Departments', value: '34', icon: '🏢' },
    { label: 'Offices', value: '12', icon: '🌍' },
  ];
}
