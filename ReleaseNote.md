# Release Note

## Version 1.2.0

- Support async for onRequesting in order to allow to get authentication token from Provider before calling API.
- Rename the `paramPath` to `path`

## Version 1.0.2

- Add `onRequesting?: RequestHandler;` to `RestConfig` which allow you to inject the authentication token to header and the other things

## Version 1.0.1

- Fixing the post parameter issue when the params is not passing to the call.

## Version 1.0.0

- The first version of **Restful-Action-Creator**
