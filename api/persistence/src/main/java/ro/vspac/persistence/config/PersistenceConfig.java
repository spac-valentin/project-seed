package ro.vspac.persistence.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.simple.JdbcClient;
import ro.vspac.domain.port.UserRepository;
import ro.vspac.persistence.UserJdbcRepository;

@Configuration(proxyBeanMethods = false)
public class PersistenceConfig {

  @Bean
  UserRepository userJdbcRepository(JdbcClient jdbcClient) {
    return new UserJdbcRepository(jdbcClient);
  }
}
