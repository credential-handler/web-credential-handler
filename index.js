/*!
 * Copyright (c) 2018-2022 Digital Bazaar, Inc. All rights reserved.
 */
/* global navigator */
import {CredentialEventProxy} from './CredentialEventProxy.js';
import {WebAppContext} from 'web-request-rpc';

const DEFAULT_MEDIATOR = 'https://authn.io';

// FIXME: remove `url` parameter
export async function installHandler({url}) {
  const CredentialManager = navigator.credentialsPolyfill.CredentialManager;

  // site asks permission to be a credential handler for the user
  const result = await CredentialManager.requestPermission();
  if(result !== 'granted') {
    throw new Error('Permission denied.');
  }

  // FIXME: remove now unused function and return `undefined`
  const registration = await getHandlerRegistration({url});
  if(!registration) {
    throw new Error('Credential handler not registered.');
  }

  return registration;
}

// FIXME: remove now unused function
export async function uninstallHandler({url}) {
  const CredentialHandlers = navigator.credentialsPolyfill.CredentialHandlers;
  const CredentialManager = navigator.credentialsPolyfill.CredentialManager;

  // ensure permission has been granted to add a credential hint
  const result = await CredentialManager.requestPermission();
  if(result !== 'granted') {
    throw new Error('Permission denied.');
  }

  // unregister credential handler registration
  await CredentialHandlers.unregister(url);
}

// FIXME: remove now unused function
// url for client app to call when storing or getting credentials
export async function getHandlerRegistration({url}) {
  const CredentialHandlers = navigator.credentialsPolyfill.CredentialHandlers;

  let registration;
  try {
    // get credential handler registration
    registration = await CredentialHandlers.register(url);
  } catch(e) {
    // ignore
  }
  return registration;
}

/**
 * Emulates activating a service worker.
 *
 * @param {string} [mediatorOrigin=DEFAULT_MEDIATOR]
 * @param {function} get
 * @param {function} store
 * @returns {Promise}
 */
export async function activateHandler({
  mediatorOrigin = DEFAULT_MEDIATOR, get, store
}) {
  if(!(get || store)) {
    throw new Error('"get" or "store" function(s) must be specified.');
  }

  const CredentialHandler = navigator.credentialsPolyfill.CredentialHandler;
  const self = new CredentialHandler(mediatorOrigin);

  if(get) {
    if(typeof get !== 'function') {
      throw new TypeError('"get" must be a function.');
    }
    self.addEventListener('credentialrequest', event => listener({event, get}));
  }

  if(store) {
    if(typeof store !== 'function') {
      throw new TypeError('"store" must be a function.');
    }
    self.addEventListener('credentialstore', event => listener({event, store}));
  }

  await self.connect();
}

export async function receiveCredentialEvent() {
  const proxy = new CredentialEventProxy();
  return proxy.receive();
}

function listener({event, get, store}) {
  event.respondWith(createResponse({event, get, store}));
}

async function createResponse({event, get, store}) {
  const result = await (get || store)({event});
  if(!(result && typeof result === 'object')) {
    throw new TypeError(
      'Return value of "get" or "store" hook must be an object.');
  }

  if(result.type === 'response') {
    return {dataType: result.dataType, data: result.data};
  }

  if(result.type === 'redirect') {
    // create WebAppContext to run WebApp and connect to windowClient
    const appContext = new WebAppContext();
    const handle = await event.openWindow(result.url);

    const windowReady = appContext.createWindow(result.url, {
      handle,
      popup: false,
      // default to 10 minute timeout for loading other window on same site
      // to allow for authentication pages and similar
      timeout: 600000
    });

    // create proxy interface for making calls in WebApp
    const injector = await windowReady;
    const proxy = injector.get('credentialEventProxy', {
      functions: [{name: 'send', options: {timeout: 0}}]
    });

    // WebApp running in window is ready; proxy event to it and return response
    return proxy.send({
      type: event.type,
      credentialRequestOptions: event.credentialRequestOptions,
      credentialRequestOrigin: event.credentialRequestOrigin,
      credential: event.credential,
      hintKey: event.hintKey
    });
  }

  throw new Error(
    'Return value of "get" or "store" must have a type of ' +
    '"response" or "redirect".');
}
