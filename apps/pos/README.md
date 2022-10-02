### About github actions

In order to run github actions correctly one have to add EXPO_TOKEN to github's
actions secrets.

# About setting up eas to build and publish app

Dependencies required:

- expo-dev-client
  In order to build, expo-dev-client needs to be installed
- expo-updates
  In order to publish an update, expo-updates needs to be installed

Steps:

1. eas build:configure
   This will generate the eas.json file with the configuration required to build and publish.
2. eas build

First build action at https://github.com/wildcant/iomis/actions/runs/3166641411/jobs/5156489100

### About Metro

We leverage the Metro cache to speed up building and publishing.
We use Turborepo to restore or invalidate this cache, working around potential
environment variable issues. To populate this Metro cache, the apps/mobile has
a $ pnpm build script that exports React Native bundles. The resulting Metro
cache is then reused when publishing previews.

### Useful Links

- https://docs.expo.dev/build/setup/
