package ro.vspac.rest;

import java.util.List;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ro.vspac.domain.port.SearchUsersUseCase;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {

  @NonNull private final SearchUsersUseCase searchUsersUseCase;
  @NonNull private final UserMapper userMapper;

  @GetMapping
  List<UserDto> search(@RequestParam String query) {
    return searchUsersUseCase.search(query).stream().map(userMapper::toDto).toList();
  }
}
