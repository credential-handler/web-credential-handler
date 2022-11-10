# web-credential-handler ChangeLog

## 2.0.1 - 2022-11-dd

### Changed
- Use `web-request-rpc@2.0.1` and `credential-handler-polyfill@3.0.1` to
  avoid chrome focus bug.

## 2.0.0 - 2022-06-13

### Changed
- **BREAKING**: Remove `url` parameter from `installHandler` API; this
  now comes from `credential_handler` in `manifest.json`.
- **BREAKING**: Remove registration APIs; these are no longer needed
  as handler registration has been simplified to having the user accept
  permission and having a valid `manifest.json` w/`credential_handler`.

## 1.0.1 - 2019-10-01

### Changed
- Update dependencies.

## 1.0.0 - 2019-08-30

### Added
- Add Webpack config.
- Add default mediator origin to `activateHandler()`.

## 0.1.3 - 2019-04-23

### Added
- Include `credentialRequestOrigin` in proxied event.

## 0.1.2 - 2019-02-21

### Changed
- Default timeout to 10 minutes for loading UI
  page as no timeout is no longer supported.

## 0.1.1 - 2019-02-21

### Changed
- Default to no timeout for loading UI page to handle
  credential get/store to allow for authentication flows,
  etc.

## 0.1.0 - 2018-07-27

### Added
- Add core files.

- See git history for changes previous to this release.
