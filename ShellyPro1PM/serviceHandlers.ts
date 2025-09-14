import { invokeShellyMethod } from "shellyCommands";
import { ShellyMethods, SwitchSetRequest, ShellyUpdateRequest } from "types";

export function handleOnService() {
    if (args.service.SwitchOn) {

        handleSwitch(true);

    } else if (args.service.SwitchOff) {

        handleSwitch(false);

    } else if (args.service.UpdateFirmware) {

        let params: ShellyUpdateRequest = {};
        
        if (args.service.UpdateFirmware.url != null) {
            params.url = args.service.UpdateFirmware.url;
        } else {
            params.stage = "stable";
        }

        invokeShellyMethod(ShellyMethods.ShellyUpdate, params);

    }else {
        log(`Unhandled event: ${args.event}`);
    }
}

function handleSwitch(isOn: boolean) {
    const switchState = isOn ? "on" : "off";
    log(`Setting the output of the Switch component to '${switchState}' for ShellyPro with ID '${info.deviceId}'.`);
    
    const params: SwitchSetRequest = { id: 0, on: isOn };
    invokeShellyMethod(ShellyMethods.SwitchSet, params);
}
