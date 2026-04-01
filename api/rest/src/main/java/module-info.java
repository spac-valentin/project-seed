module ro.vspac.rest {
  requires ro.vspac.domain;

  requires spring.beans;
  requires spring.boot;
  requires spring.boot.autoconfigure;
  requires spring.context;
  requires spring.core;
  requires spring.web;
  requires spring.webmvc;

  exports ro.vspac.rest.config;

  opens ro.vspac.rest to
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
