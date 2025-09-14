import { ShellyMethods, SwitchSetRequest, ShellyUpdateRequest } from "types";

export function invokeShellyMethod(method: ShellyMethods, params: any) {
    switch (method) {

        // Set the output of the Switch component to on or off
        case ShellyMethods.SwitchSet:
            if (isSwitchSetRequest(params)) {
                switchSet(params.id, params.on, params.toggle_after);
            } else {
                log(`Invalid parameters for ${method}`);
            }
            break;
        
        // Update the firmware of the device
        case ShellyMethods.ShellyUpdate:
            if (isShellyUpdateRequest(params)) {
                shellyUpdate(params.stage, params.url);
            } else {
                log(`Invalid parameters for ${method}`);
            }
            break;

        default:
            log(`Handler for method ${method} not found.`);
    }
}

function isSwitchSetRequest(params: any): params is SwitchSetRequest {
    return "id" in params && "on" in params;
}

export function switchSet(id: number, on: boolean, toggleAfter?: number) {
    const request: any = { // FIXME: SwitchSetRequest = {
        id, 
        src: "DMP",  // FIXME:
        method: "Switch.Set", 
        params: {
            id, 
            on,
            ...(toggleAfter !== undefined ? { toggle_after: toggleAfter } : {}),
        }
    };

    result.downstream = [{
        type: "object",
        object: { ...request },
        topic: `${info.deviceId}/rpc`,
    }];
}

function isShellyUpdateRequest(params: any): params is ShellyUpdateRequest {
    const hasStageOrUrl = ("stage" in params || "url" in params) && !("stage" in params && "url" in params);
    return hasStageOrUrl;
}

export function shellyUpdate(stage?: string, url?: string) {
    const request: any = { // FIXME: ShellyUpdateRequest = {
        src: "DMP",  // FIXME:
        method: "Shelly.Update", 
        params: {
            ...(stage !== undefined ? { stage } : {}),
            ...(url !== undefined ? { url } : {}),
        }
    };

    result.downstream = [{
        type: "object",
        object: { ...request },
        topic: `${info.deviceId}/rpc`,
    }];
}