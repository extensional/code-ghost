import * as Mixpanel from "mixpanel";

// ensure it gets properly disposed. Upon disposal the events will be flushed

var mixpanel = Mixpanel.init("8726b445794ac363d510910b0e04e513");

export function track(
    eventName: string,
    properties?: { [key: string]: string }
) {
    const session = "browser";
    const userId = "1";
    const props =
        properties != undefined
            ? properties
            : { session: session, user: userId };
    props["session"] = session;
    props["user"] = userId;

    try {
        mixpanel.track(eventName, props);
    } catch (e) {
        console.error(e);
    }
}
