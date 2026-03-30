{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  name = "angular-dev";

  buildInputs = with pkgs; [
    # Node.js runtime — Angular CLI requires Node 18+
    nodejs_20

    # Native build tooling (node-gyp dependencies)
    python3
    gnumake
    gcc

  ];

  # Environment variables
  shellHook = ''
    echo ""
    echo "🅰  Angular development environment"
    echo "   Node  : $(node --version)"
    echo "   npm   : $(npm --version)"
    echo ""

    # Set a local npm prefix so global installs stay inside the project sandbox
    export NPM_CONFIG_PREFIX="$PWD/.npm-global"
    export PATH="$NPM_CONFIG_PREFIX/bin:$PATH"
    mkdir -p "$NPM_CONFIG_PREFIX"

    # Install Angular CLI globally (into the local prefix) if not already present
    if ! command -v ng &> /dev/null; then
      echo "Installing @angular/cli locally…"
      npm install -g @angular/cli
    else
      echo "   ng    : $(ng version --skip-confirmation 2>/dev/null | grep 'Angular CLI' | awk '{print $NF}')"
    fi

    source <(ng completion script)

    echo ""
    echo "Quick-start commands:"
    echo "  ng new my-app          Create a new Angular project"
    echo "  ng serve               Start the dev server (localhost:4200)"
    echo "  ng build               Production build"
    echo "  ng test                Run unit tests"
    echo "  ng generate component  Scaffold a component"
    echo ""
  '';

  # Allow unfree packages if any transitive dep needs it
  # nixpkgs.config.allowUnfree = true;
}
