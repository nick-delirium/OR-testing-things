import React from "react";

import Tracker from "@openreplay/tracker";
import trackerAssist from "@openreplay/tracker-assist";
// @ts-ignore
import { v4 } from "uuid";

export const userId = v4();

const tracker = new Tracker({
  __DISABLE_SECURE_MODE: true,
  projectKey: "",
  ingestPoint: "",
  verbose: true,
  __debug__: true,
  captureIFrames: true,
  network: {
    capturePayload: true,
    useProxy: true,
    sessionTokenHeader: false,
    failuresOnly: false, ignoreHeaders: [], captureInIframes: true
  },
  onStart: () => {
    tracker.setUserID(userId);
  },
});

// @ts-ignore
tracker.use(trackerAssist({ onCallStart: () => { console.log('hi') }}));

tracker.start().then(s => console.log(s)).catch(e => console.log(e));

const OpenReplayTracker: React.VFC = () => {
  return <p>Your userId is [{userId}]</p>;
};

export default OpenReplayTracker;
