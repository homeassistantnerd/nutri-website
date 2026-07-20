#!/usr/bin/env bash
# Build the SPA and publish the static output to the Nginx web root.
# Run this on the Debian server, inside the cloned repo, after each git push.
set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -d .git ]; then
  echo "Error: this directory is not a git repo. Clone the GitHub repo on the Debian server first." >&2
  exit 1
fi

if [ ! -f package-lock.json ]; then
  echo "Error: package-lock.json is missing. Run 'npm install' on the dev machine, commit the lockfile, then push." >&2
  exit 1
fi

git pull --ff-only
npm ci                 # clean, reproducible install from package-lock.json
npm run build          # produces dist/

sudo mkdir -p /var/www/nutri
sudo rm -rf /var/www/nutri/*
sudo cp -r dist/* /var/www/nutri/

echo "Deployed commit $(git rev-parse --short HEAD) to /var/www/nutri"
