package ro.vspac.rest.config;

import org.mapstruct.factory.Mappers;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import ro.vspac.rest.UserMapper;

@Configuration(proxyBeanMethods = false)
public class MappersConfig {

  @Bean
  UserMapper userMapper() {
    return Mappers.getMapper(UserMapper.class);
  }
}
