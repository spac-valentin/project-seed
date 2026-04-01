package ro.vspac.rest;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ro.vspac.domain.model.User;

@Mapper
public interface UserMapper {

  @Mapping(
      target = "dateOfBirth",
      expression =
          "java(user.dateOfBirth().format(java.time.format.DateTimeFormatter.ISO_LOCAL_DATE))")
  @Mapping(
      target = "avatarInitials",
      expression =
          "java(String.valueOf(user.firstName().charAt(0)) + user.lastName().charAt(0))")
  UserDto toDto(User user);
}
