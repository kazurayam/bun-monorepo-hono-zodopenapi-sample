rm -rf node_modules/
rm -f bun.lock
rm -rf packages/backend/node_modules/
rm -f packages/backend/bun.lock
rm -rf packages/frontend/node_modules/
rm -f packages/frontend/bun.lock
rm -rf packages/shared/node_modules/
rm -f packages/shared/bun.lock
echo "Removed bun-installed node_modules and lock files."
