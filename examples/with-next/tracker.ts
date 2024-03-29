import Tracker from "@openreplay/tracker/cjs";
import trackerAssist from "@openreplay/tracker-assist/cjs";
import { v4 } from "uuid";

export const userId = v4();

const tracker = new Tracker({
  __DISABLE_SECURE_MODE: true,
  projectKey: "",
  ingestPoint: "",
  onStart: () => {
    tracker.setUserID(userId);
  },
});

// @ts-ignore
tracker.use(trackerAssist({ confirmText: "Do you like to accept the call from service center?" }));

tracker.start().then(console.log).catch(console.error);
