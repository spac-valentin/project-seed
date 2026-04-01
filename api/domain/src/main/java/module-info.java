module ro.vspac.domain {
  requires static lombok;
  requires spring.context;

  exports ro.vspac.domain.model;
  exports ro.vspac.domain.port;
  exports ro.vspac.domain.usecase;
  exports ro.vspac.domain.config;

  opens ro.vspac.domain.config to
      spring.beans,
      spring.context,
      spring.core;
}
