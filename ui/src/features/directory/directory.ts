import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UsersService, User } from '../../core/services/users/users.service';

const AVATAR_COLORS = [
  'bg-indigo-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-teal-500',
  'bg-orange-500',
  'bg-sky-500',
];

@Component({
  selector: 'app-directory',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './directory.html',
  styleUrl: './directory.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Directory {
  private readonly usersService = inject(UsersService);

  protected readonly searchControl = new FormControl('', { nonNullable: true });

  protected readonly query = toSignal(
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ),
    { initialValue: '' },
  );

  protected readonly usersResource = rxResource<User[], string | undefined>({
    params: () => this.query() || undefined,
    stream: ({ params: q }) => this.usersService.search(q ?? ''),
  });

  protected readonly isRefreshing = computed(
    () => this.usersResource.status() === 'reloading',
  );

  protected readonly isLoading = computed(
    () => this.usersResource.status() === 'loading',
  );

  protected readonly isIdle = computed(
    () => this.usersResource.status() === 'idle',
  );

  protected readonly isError = computed(
    () => this.usersResource.status() === 'error',
  );

  protected readonly isResolved = computed(
    () => this.usersResource.status() === 'resolved',
  );

  protected readonly hasResults = computed(
    () => (this.usersResource.value()?.length ?? 0) > 0,
  );

  protected readonly resultCount = computed(
    () => this.usersResource.value()?.length ?? 0,
  );

  protected avatarColor(id: number): string {
    return AVATAR_COLORS[id % AVATAR_COLORS.length];
  }
}
