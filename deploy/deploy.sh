#!/usr/bin/env bash
# Build the SPA and publish the static output to the Nginx web root.
# Intended VM workflow: git pull --ff-only && bash deploy/deploy.sh
set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -f package-lock.json ]; then
  echo "Error: package-lock.json is missing. Commit the lockfile before deploying." >&2
  exit 1
fi

npm ci
npm run build

sudo mkdir -p /var/www/nutri
sudo rm -rf /var/www/nutri/*
sudo cp -r dist/* /var/www/nutri/
sudo chown -R www-data:www-data /var/www/nutri

sudo nginx -t
sudo systemctl reload nginx

LAN_IP=$(hostname -I | awk '{print $1}')
echo "Deployed to /var/www/nutri"
echo "Open the app from another LAN device at: http://${LAN_IP}"
