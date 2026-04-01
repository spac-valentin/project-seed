package ro.vspac.domain.port;

import java.util.List;
import ro.vspac.domain.model.User;

public interface UserRepository {
  List<User> search(String query);
}
