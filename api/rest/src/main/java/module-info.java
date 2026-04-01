module ro.vspac.rest {
  requires ro.vspac.domain;
  requires static lombok;
  requires ro.vspac.persistence;

  requires org.mapstruct;

  requires spring.beans;
  requires spring.boot;
  requires spring.boot.autoconfigure;
  requires spring.context;
  requires spring.core;
  requires spring.web;
  requires spring.webmvc;

  exports ro.vspac.rest.config;

  opens ro.vspac.rest to
      org.mapstruct,
      spring.beans,
      spring.context,
      spring.core,
      spring.web,
      spring.webmvc;

  opens ro.vspac.rest.config to
      spring.beans,
      spring.context,
      spring.core;
}
