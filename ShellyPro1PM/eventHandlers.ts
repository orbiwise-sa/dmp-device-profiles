import { flattenObject, isValidJSON } from "helpers";

export function handleOnData() {
    const topic = args.messages[0]?.topic;

    result.operationalStatus = "normal";  // FIXME:
    result.touch = true;

    const msg = hostApiSync("toString", args.messages[0]?.octets ?? [], "utf8");

    if (isValidJSON(msg)) {

        const flatObj = flattenObject(JSON.parse(msg));
   
        if (flatObj.hasOwnProperty("output") && typeof flatObj.output === "boolean") {
            result.state = { switchState: flatObj.output ? "on" : "off" };
        }

        result.upstream = [{
            topic,
            type: "object",
            object: flatObj,
        }];

    } else {
        result.upstream = [{ topic, type: "string", string: msg }];
    }
}
