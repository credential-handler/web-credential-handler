/*!
 * Copyright (c) 2017-2018 Digital Bazaar, Inc. All rights reserved.
 */
/* global window */
'use strict';

import {WebApp} from 'web-request-rpc';

const PROXY_EVENT_TIMEOUT = 60000;

export class CredentialEventProxy extends WebApp {
  constructor() {
    super(window.location.origin);
  }

  async receive() {
    const self = this;
    await self.connect();

    // this promise resolves once the event is received
    return new Promise((resolveReceive, rejectReceive) => {
      const timeoutId = setTimeout(() => {
        rejectReceive(new Error('Timed out waiting to receive event.'));
      }, PROXY_EVENT_TIMEOUT);

      self.server.define('credentialEventProxy', {
        // called by credential handler to send event to UI window
        async send(event) {
          // event received, clear timeout
          resolveReceive(event);
          clearTimeout(timeoutId);

          // this promise resolves when the promise that the UI passes
          // to `event.respondWith` resolves
          return new Promise((resolveSend, rejectSend) => {
            event.respondWith = promise => {
              try {
                resolveSend(promise);
              } catch(e) {
                rejectSend(e);
              }
            };
          });
        }
      });

      self.ready();
    });
  }
}
