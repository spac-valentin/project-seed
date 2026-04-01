module ro.vspac.persistence {
  requires ro.vspac.domain;
  requires static lombok;

  requires spring.beans;
  requires spring.context;
  requires spring.core;
  requires java.sql;
  requires spring.jdbc;
  requires spring.tx;

  exports ro.vspac.persistence.config;

  opens ro.vspac.persistence.config to
      spring.beans,
      spring.context,
      spring.core;
}
