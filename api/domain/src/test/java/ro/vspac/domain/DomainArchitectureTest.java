package ro.vspac.domain;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.junit.AnalyzeClasses;
import com.tngtech.archunit.junit.ArchTest;
import com.tngtech.archunit.lang.ArchRule;

@AnalyzeClasses(packages = "ro.vspac.domain")
class DomainArchitectureTest {

  @ArchTest
  static final ArchRule model_has_no_outbound_domain_dependencies =
      noClasses()
          .that()
          .resideInAPackage("ro.vspac.domain.model..")
          .should()
          .dependOnClassesThat()
          .resideInAnyPackage(
              "ro.vspac.domain.port..",
              "ro.vspac.domain.usecase..",
              "ro.vspac.domain.config..");

  @ArchTest
  static final ArchRule ports_do_not_depend_on_usecase_or_config =
      noClasses()
          .that()
          .resideInAPackage("ro.vspac.domain.port..")
          .should()
          .dependOnClassesThat()
          .resideInAnyPackage("ro.vspac.domain.usecase..", "ro.vspac.domain.config..");

  @ArchTest
  static final ArchRule use_cases_do_not_depend_on_config =
      noClasses()
          .that()
          .resideInAPackage("ro.vspac.domain.usecase..")
          .should()
          .dependOnClassesThat()
          .resideInAPackage("ro.vspac.domain.config..");

  @ArchTest
  static final ArchRule only_config_may_use_spring =
      noClasses()
          .that()
          .resideOutsideOfPackage("ro.vspac.domain.config..")
          .should()
          .dependOnClassesThat()
          .resideInAPackage("org.springframework..");

  @ArchTest
  static final ArchRule domain_does_not_depend_on_adapters =
      noClasses()
          .that()
          .resideInAPackage("ro.vspac.domain..")
          .should()
          .dependOnClassesThat()
          .resideInAnyPackage("ro.vspac.rest..", "ro.vspac.persistence..");

  @ArchTest
  static final ArchRule domain_does_not_use_spring_web_data_or_jdbc =
      noClasses()
          .that()
          .resideInAPackage("ro.vspac.domain..")
          .should()
          .dependOnClassesThat()
          .resideInAnyPackage(
              "org.springframework.web..",
              "org.springframework.data..",
              "org.springframework.jdbc..");

  @ArchTest
  static final ArchRule domain_does_not_use_jakarta_persistence_or_javax_servlet =
      noClasses()
          .that()
          .resideInAPackage("ro.vspac.domain..")
          .should()
          .dependOnClassesThat()
          .resideInAnyPackage("jakarta.persistence..", "javax.servlet..");
}
