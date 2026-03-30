{ pkgs ? import <nixpkgs> {} }:

let
  pythonEnv = pkgs.python3.withPackages (ps: with ps; [
    pip
    setuptools
    wheel
  ]);
in
pkgs.mkShell {
  buildInputs = [
    pkgs.adr-tools
    pythonEnv
  ];

  shellHook = ''
    # Create a local venv for adr-viewer if it doesn't exist
    if [ ! -d .nix-venv ]; then
      echo "Creating virtual environment for adr-viewer..."
      python -m venv .nix-venv
      .nix-venv/bin/pip install --quiet adr-viewer
    fi

    # Activate the venv
    source .nix-venv/bin/activate

    # Command to view ADRs
    view-adrs() {
      adr-viewer --adr-path $(cat .adr-dir) --serve --port 8000
    }
    export -f view-adrs
  '';
}
