package ro.vspac.persistence;

import java.util.List;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.simple.JdbcClient;
import ro.vspac.domain.model.User;
import ro.vspac.domain.port.UserRepository;

@RequiredArgsConstructor
public class UserJdbcRepository implements UserRepository {

  @NonNull private final JdbcClient jdbcClient;

  @Override
  public List<User> search(String query) {
    String pattern = "%" + query + "%";
    return jdbcClient
        .sql(
            """
            SELECT id, first_name, last_name, email, date_of_birth, department, role
            FROM users
            WHERE first_name ILIKE :pattern
               OR last_name ILIKE :pattern
               OR email ILIKE :pattern
            ORDER BY last_name, first_name
            """)
        .param("pattern", pattern)
        .query(
            (rs, rowNum) ->
                new User(
                    rs.getLong("id"),
                    rs.getString("first_name"),
                    rs.getString("last_name"),
                    rs.getString("email"),
                    rs.getDate("date_of_birth").toLocalDate(),
                    rs.getString("department"),
                    rs.getString("role")))
        .list();
  }
}
