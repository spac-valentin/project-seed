package ro.vspac.domain.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import ro.vspac.domain.port.UserRepository;
import ro.vspac.domain.usecase.SearchUsersService;

@Configuration(proxyBeanMethods = false)
public class DomainConfig {

  @Bean
  SearchUsersService searchUsersService(UserRepository userRepository) {
    return new SearchUsersService(userRepository);
  }
}
