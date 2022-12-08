import Tracker
, { SanitizeLevel }
from "@openreplay/tracker";
import trackerAssist from "@openreplay/tracker-assist";
import { createStore, applyMiddleware } from 'redux'
import { counterReducer } from "./store";
import { v4 } from "uuid";
import trackerRedux from '@openreplay/tracker-redux';

export const userId = v4();

localStorage.removeItem("__openreplay_uuid");
localStorage.removeItem("__openreplay_token");

const tracker = new Tracker({
  __DISABLE_SECURE_MODE: true,

  verbose: true,
  __debug__: true,
  onStart: () => {
    tracker.setUserID(userId);
    tracker.setMetadata('test', 'hello')
  },

  domSanitizer: (node) => {
      return node.className ? node.className.includes?.('testhide')
        ? SanitizeLevel.Hidden : node.className.includes?.('testobscure')
          ? SanitizeLevel.Obscured : SanitizeLevel.Plain : 0
  }
})

tracker.use(
  // @ts-ignore
  trackerAssist({
    onAgentConnect: (agentStuff) => {
      console.log('hi', agentStuff)
      return () => console.log('bye', agentStuff)
    },
    onRemoteControlStart: (agentInfo) => {
        console.log('control', agentInfo)
    },
    onRecordingRequest: (agentInfo) => {
      console.log('getting request', agentInfo)
    }
  })
);

const openReplayMiddleware = tracker.use(trackerRedux())

export const store = createStore(
  // @ts-ignore
  counterReducer,
  applyMiddleware(openReplayMiddleware)
)

export const getTracker = () => {
 return tracker
}
