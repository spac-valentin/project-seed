package ro.vspac;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import org.junit.jupiter.api.Test;

class MainTest {

  @Test
  void main() {
    assertThat("a").isEqualTo("b");
  }
}
