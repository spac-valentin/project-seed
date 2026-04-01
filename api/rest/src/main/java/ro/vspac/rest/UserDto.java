package ro.vspac.rest;

import lombok.Builder;
import lombok.NonNull;

@Builder(toBuilder = true)
public record UserDto(
    long id,
    @NonNull String firstName,
    @NonNull String lastName,
    @NonNull String email,
    @NonNull String dateOfBirth,
    @NonNull String department,
    @NonNull String role,
    @NonNull String avatarInitials) {}
