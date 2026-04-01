package ro.vspac.domain.port;

import java.util.List;
import ro.vspac.domain.model.User;

public interface SearchUsersUseCase {
  List<User> search(String query);
}
