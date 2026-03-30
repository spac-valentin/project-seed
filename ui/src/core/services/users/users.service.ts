import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  department: string;
  role: string;
  avatarInitials: string;
}

const MOCK_USERS: User[] = [
  {
    id: 1,
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@company.com',
    dateOfBirth: new Date('1990-03-15'),
    department: 'Engineering',
    role: 'Senior Software Engineer',
    avatarInitials: 'AJ',
  },
  {
    id: 2,
    firstName: 'Bob',
    lastName: 'Martinez',
    email: 'bob.martinez@company.com',
    dateOfBirth: new Date('1985-07-22'),
    department: 'Product',
    role: 'Product Manager',
    avatarInitials: 'BM',
  },
  {
    id: 3,
    firstName: 'Carol',
    lastName: 'Williams',
    email: 'carol.williams@company.com',
    dateOfBirth: new Date('1992-11-08'),
    department: 'Design',
    role: 'UX Designer',
    avatarInitials: 'CW',
  },
  {
    id: 4,
    firstName: 'David',
    lastName: 'Chen',
    email: 'david.chen@company.com',
    dateOfBirth: new Date('1988-05-30'),
    department: 'Engineering',
    role: 'Tech Lead',
    avatarInitials: 'DC',
  },
  {
    id: 5,
    firstName: 'Emma',
    lastName: 'Thompson',
    email: 'emma.thompson@company.com',
    dateOfBirth: new Date('1994-09-12'),
    department: 'Marketing',
    role: 'Marketing Specialist',
    avatarInitials: 'ET',
  },
  {
    id: 6,
    firstName: 'Frank',
    lastName: 'Garcia',
    email: 'frank.garcia@company.com',
    dateOfBirth: new Date('1980-02-17'),
    department: 'Sales',
    role: 'Sales Director',
    avatarInitials: 'FG',
  },
  {
    id: 7,
    firstName: 'Grace',
    lastName: 'Lee',
    email: 'grace.lee@company.com',
    dateOfBirth: new Date('1991-06-04'),
    department: 'HR',
    role: 'HR Business Partner',
    avatarInitials: 'GL',
  },
  {
    id: 8,
    firstName: 'Henry',
    lastName: 'Brown',
    email: 'henry.brown@company.com',
    dateOfBirth: new Date('1987-12-28'),
    department: 'Finance',
    role: 'Financial Analyst',
    avatarInitials: 'HB',
  },
  {
    id: 9,
    firstName: 'Isabella',
    lastName: 'Davis',
    email: 'isabella.davis@company.com',
    dateOfBirth: new Date('1995-04-19'),
    department: 'Engineering',
    role: 'Frontend Engineer',
    avatarInitials: 'ID',
  },
  {
    id: 10,
    firstName: 'James',
    lastName: 'Wilson',
    email: 'james.wilson@company.com',
    dateOfBirth: new Date('1983-08-07'),
    department: 'Operations',
    role: 'Operations Manager',
    avatarInitials: 'JW',
  },
  {
    id: 11,
    firstName: 'Katherine',
    lastName: 'Taylor',
    email: 'katherine.taylor@company.com',
    dateOfBirth: new Date('1993-01-25'),
    department: 'Legal',
    role: 'Legal Counsel',
    avatarInitials: 'KT',
  },
  {
    id: 12,
    firstName: 'Liam',
    lastName: 'Anderson',
    email: 'liam.anderson@company.com',
    dateOfBirth: new Date('1989-10-11'),
    department: 'Engineering',
    role: 'Backend Engineer',
    avatarInitials: 'LA',
  },
  {
    id: 13,
    firstName: 'Mia',
    lastName: 'White',
    email: 'mia.white@company.com',
    dateOfBirth: new Date('1996-03-02'),
    department: 'Design',
    role: 'Visual Designer',
    avatarInitials: 'MW',
  },
  {
    id: 14,
    firstName: 'Noah',
    lastName: 'Harris',
    email: 'noah.harris@company.com',
    dateOfBirth: new Date('1986-07-14'),
    department: 'Data',
    role: 'Data Scientist',
    avatarInitials: 'NH',
  },
  {
    id: 15,
    firstName: 'Olivia',
    lastName: 'Jackson',
    email: 'olivia.jackson@company.com',
    dateOfBirth: new Date('1991-05-23'),
    department: 'Marketing',
    role: 'Content Strategist',
    avatarInitials: 'OJ',
  },
  {
    id: 16,
    firstName: 'Peter',
    lastName: 'Robinson',
    email: 'peter.robinson@company.com',
    dateOfBirth: new Date('1984-11-30'),
    department: 'Sales',
    role: 'Account Executive',
    avatarInitials: 'PR',
  },
  {
    id: 17,
    firstName: 'Quinn',
    lastName: 'Clark',
    email: 'quinn.clark@company.com',
    dateOfBirth: new Date('1997-08-16'),
    department: 'HR',
    role: 'Recruiter',
    avatarInitials: 'QC',
  },
  {
    id: 18,
    firstName: 'Rachel',
    lastName: 'Lewis',
    email: 'rachel.lewis@company.com',
    dateOfBirth: new Date('1990-02-09'),
    department: 'Finance',
    role: 'Controller',
    avatarInitials: 'RL',
  },
  {
    id: 19,
    firstName: 'Samuel',
    lastName: 'Walker',
    email: 'samuel.walker@company.com',
    dateOfBirth: new Date('1982-09-18'),
    department: 'Engineering',
    role: 'DevOps Engineer',
    avatarInitials: 'SW',
  },
  {
    id: 20,
    firstName: 'Taylor',
    lastName: 'Hall',
    email: 'taylor.hall@company.com',
    dateOfBirth: new Date('1993-12-05'),
    department: 'Product',
    role: 'Product Analyst',
    avatarInitials: 'TH',
  },
];

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  search(query: string): Observable<User[]> {
    const lower = query.toLowerCase();
    return of(MOCK_USERS).pipe(
      map((users) =>
        users.filter(
          (u) =>
            u.firstName.toLowerCase().includes(lower) ||
            u.lastName.toLowerCase().includes(lower) ||
            u.email.toLowerCase().includes(lower),
        ),
      ),
      delay(2000),
    );
  }
}
