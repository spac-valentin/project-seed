package ro.vspac.rest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Import;
import ro.vspac.domain.config.DomainConfig;
import ro.vspac.persistence.config.PersistenceConfig;
import ro.vspac.rest.config.MappersConfig;
import ro.vspac.rest.config.WebConfig;

@SpringBootConfiguration
@EnableAutoConfiguration
@Import({DomainConfig.class, PersistenceConfig.class, MappersConfig.class, WebConfig.class, UserController.class})
public class Application {

  static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }
}
