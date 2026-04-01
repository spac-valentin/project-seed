import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  department: string;
  role: string;
  avatarInitials: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly http = inject(HttpClient);

  search(query: string): Observable<User[]> {
    return this.http.get<User[]>('/api/users', { params: { query } });
  }
}
