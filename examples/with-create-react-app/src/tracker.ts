import Tracker, { SanitizeLevel } from '@openreplay/tracker';
import trackerAssist from '@openreplay/tracker-assist';
import { createStore, applyMiddleware } from 'redux';
import { counterReducer } from './store';
import { v4 } from 'uuid';
import trackerRedux from '@openreplay/tracker-redux';
import trackerGraphQL from '@openreplay/tracker-graphql';

export const userId = v4();

localStorage.removeItem('__openreplay_uuid');
localStorage.removeItem('__openreplay_token');

const tracker = new Tracker({
  __DISABLE_SECURE_MODE: true,
  projectKey: process.env.REACT_APP_KEY ?? '',
  ingestPoint: process.env.REACT_APP_INGEST,
  // @ts-expect-error It is not yet clear why this field is used here
  network: { capturePayload: true },
  verbose: true,
  captureIFrames: true,
  __debug__: true,
  defaultInputMode: 0,
  obscureInputDates: false,
  obscureInputNumbers: false,
  obscureTextNumbers: false,
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

tracker.use(
  // @ts-expect-error Later to deal with the type error
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

export const recordGraphQL = tracker.use(trackerGraphQL());

export const store = createStore(
  // @ts-expect-error Later will need to rewrite the type
  counterReducer,
  applyMiddleware(openReplayMiddleware)
);

export const getTracker = (): Tracker => {
  return tracker;
};
