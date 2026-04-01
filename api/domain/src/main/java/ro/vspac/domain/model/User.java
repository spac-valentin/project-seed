package ro.vspac.domain.model;

import java.time.LocalDate;
import lombok.Builder;
import lombok.NonNull;

@Builder(toBuilder = true)
public record User(
    long id,
    @NonNull String firstName,
    @NonNull String lastName,
    @NonNull String email,
    @NonNull LocalDate dateOfBirth,
    @NonNull String department,
    @NonNull String role) {}
