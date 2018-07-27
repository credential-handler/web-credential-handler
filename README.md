# web-credential-handler

> Credential Handler API utility functions for Web applications

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [Commercial Support](#commercial-support)
- [License](#license)

## Background

This module provides some plumbing that makes writing a Credential Handler
easier.

A Credential Handler is an event handler for credential request and
credential storage events. The [Credential Handler API][] helps
solve the [Nascar Problem](https://indieweb.org/NASCAR_problem). The
[Credential Handler API][] enables websites to install Credential Handlers that
can respond when users visit other websites that request or store credentials.

For example, a user may visit a website that wants them to login using
OpenIdConnect, provide an OAuth Token, authenticate using a [DID][], or present
some [Verifiable Credentials][]. When these other websites use the [Credential
Handler API][], the user is shown an in-browser selection screen with visual
representations (e.g. icons and origin information) of only those
Credential Handlers that they have been previously installed by the user and
that are compatible with the website's request. Once the user makes a choice,
the appropriate Credential Handler is loaded and a credential event is sent
to it.

The Credential Handler receives the event via a
[Service Worker](https://w3c.github.io/ServiceWorker) or, if the
[Credential Handler Polyfill][] is used, a simple page with no UI elements is
loaded that uses the polyfill to receive and respond to the event.

The Credential Handler must respond to the event with a credential that
fulfills the request. If necessary, the Credential Handler may open a window
on its website's origin to allow the user to interact with its website prior
to responding. This UI can be styled and shaped according to the website
owner's brand using arbitrary JavaScript and HTML like any other webpage.

This module provides utility functions to handle installing/uninstalling a
Credential Handler, receiving an event, responding to an event, and forwarding
an event to another window for handling after user interaction with a UI.

Without this module, a developer must setup this basic infrastructure to
handle credential requests and credential storage requests and their
interaction with a UI window on their own.

See also:

* [Decentralized Identifiers (DIDs) - Data Model and Syntaxes](https://w3c-ccg.github.io/did-spec)
* [Credential Handler API](https://w3c-ccg.github.io/credential-handler-api)
* [Credential Handler API Repo](https://github.com/w3c-ccg/credential-handler-api)
* [Credential Handler API Demo](https://github.com/digitalbazaar/credential-handler-demo)

## Install

To install locally (for development):

```
git clone https://github.com/digitalbazaar/web-credential-handler.git
cd web-credential-handler
npm install
```

To install as a dependency of another project, add this to your `package.json`:

```
"web-credential-handler": "^1.0.0"
```

## Usage

### Requiring web-credential-handler (browser)

TBD

```js
import {installHandler, activateHandler} from 'web-credential-handler';
```

### Installing a Credential Handler

```js
import {installHandler} from 'web-credential-handler';
```

### Uninstalling a Credential Handler

TBD

```js
import {uninstallHandler} from 'web-credential-handler';
```

### Activating a Credential Handler

TBD

```js
import {activateHandler} from 'web-credential-handler';
```

### Receiving a credential event in a UI window

TBD

```js
import {receiveCredentialEvent} from 'web-credential-handler';
```

### Getting a Credential Handler Registration

TBD

```js
import {getHandlerRegistration} from 'web-credential-handler';
```

## Contribute

PRs accepted.

Small note: If editing the Readme, please conform to the
[standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## Commercial Support

Commercial support for this library is available upon request from
Digital Bazaar: support@digitalbazaar.com

## License

[New BSD License (3-clause)](LICENSE) © Digital Bazaar

[DID]: https://w3c-ccg.github.io/did-spec
[Verifiable Credentials]: https://w3c.github.io/vc-data-model
[Decentralized Identifiers (DIDs)]: https://w3c-ccg.github.io/did-spec
[Credential Handler API]: https://w3c-ccg.github.io/credential-handler-api
[Credential Handler API Repo]: https://github.com/w3c-ccg/credential-handler-api
[Credential Handler API Demo]: https://github.com/digitalbazaar/credential-handler-demo
[Credential Handler Polyfill]: https://github.com/digitalbazaar/credential-handler-polyfill
