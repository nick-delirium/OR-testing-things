// @ts-nocheck
import Tracker, { SanitizeLevel } from '@openreplay/tracker';
import trackerAssist from '@openreplay/tracker-assist';
import { createStore, applyMiddleware } from 'redux';
import { counterReducer } from './store';
import { v4 } from 'uuid';
import trackerRedux from '@openreplay/tracker-redux';
import axios from 'axios';
import mobxTracker from '@openreplay/tracker-mobx';
import clickerStore from './mobxStore';
import { observe } from 'mobx';

export const userId = v4();

console.log(process.env.REACT_APP_INGEST, process.env.REACT_APP_KEY);
const axiosInst = axios.create();

export const getTracker = (): { tracker: Tracker; axiosInst: any; store: any } => {
  const tracker =
    window.__or_tracker_inst ??
    new Tracker({
      __DISABLE_SECURE_MODE: true,
      verbose: true,
      __debug__: true,
      projectKey: process.env.REACT_APP_KEY ?? '',
      ingestPoint: process.env.REACT_APP_INGEST,

      network: {
        capturePayload: true,
        sessionTokenHeader: true,
        useProxy: true,
        // ignoreHeaders: ["test-header-ignored"]
        sanitizer: (data) => {
          if (data.url.includes('pokeapi')) {
            data.request.body = '';
            data.response.body = '';
          }
          return data;
        },
      },
      captureIFrames: true,
      defaultInputMode: 0,
      obscureInputDates: false,
      obscureInputNumbers: false,
      obscureTextNumbers: false,
      disableStringDict: true,
      mouse: {
        disableClickmaps: true,
      },
      flags: {
        onFlagsLoad: (flags) => console.log(flags),
      },
      onStart: () => {
        tracker.setUserID('Nikita');
        tracker.setMetadata('test', 'test meta');
      },

      domSanitizer: (node) => {
        return typeof node.className !== 'undefined'
          ? node.className.includes?.('testhide')
            ? SanitizeLevel.Hidden
            : node.className.includes?.('testobscure')
            ? SanitizeLevel.Obscured
            : SanitizeLevel.Plain
          : 0;
      },
    });

  window.__or_tracker_inst = tracker;

  tracker.use(
    trackerAssist({
      onAgentConnect: (agentStuff) => {
        console.log('hi', agentStuff);
        return () => {
          console.log('bye', agentStuff);
        };
      },
      onRemoteControlStart: (agentInfo) => {
        console.log('control', agentInfo);
      },
      onRecordingRequest: (agentInfo) => {
        console.log('getting request', agentInfo);
      },
      onCallDeny: () => {
        console.log('call deny');
      },
      onRecordingDeny: (args) => {
        console.log('rec', args);
      },
      onRemoteControlDeny: (args) => {
        console.log('control deny', args);
      },
    })
  );

  const openReplayMiddleware = tracker.use(trackerRedux());

  const storeTracker = tracker.use(mobxTracker());
  observe(clickerStore, storeTracker);

  const store = createStore(counterReducer, applyMiddleware(openReplayMiddleware));

  return { tracker, axiosInst, store };
};
