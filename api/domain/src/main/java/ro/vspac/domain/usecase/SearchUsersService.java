package ro.vspac.domain.usecase;

import java.util.List;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import ro.vspac.domain.model.User;
import ro.vspac.domain.port.SearchUsersUseCase;
import ro.vspac.domain.port.UserRepository;

@RequiredArgsConstructor
public class SearchUsersService implements SearchUsersUseCase {

  @NonNull private final UserRepository userRepository;

  @Override
  public List<User> search(String query) {
    return userRepository.search(query);
  }
}
