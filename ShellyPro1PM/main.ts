import { handleOnData } from "eventHandlers";
import { handleOnService } from "serviceHandlers";

log(`In the ShellyPro 1PM '${info.deviceId}' event handler.`);

switch (args.event) {
    case "OnData":
        handleOnData();
        break;
    case "OnService":
        handleOnService();
        break;
    default:
        log(`Unhandled event: ${args.event}`);
}
