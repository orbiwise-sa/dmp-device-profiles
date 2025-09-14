// All available RPC methods
export enum ShellyMethods {
    SwitchSetConfig = "Switch.SetConfig",
    SwitchGetConfig = "Switch.GetConfig",
    SwitchGetStatus = "Switch.GetStatus",
    SwitchToggle = "Switch.Toggle",
    SwitchSet = "Switch.Set",
    ScheduleList = "Schedule.List",
    ScheduleDeleteAll = "Schedule.DeleteAll",
    ScheduleDelete = "Schedule.Delete",
    ScheduleUpdate = "Schedule.Update",
    ScheduleCreate = "Schedule.Create",
    InputSetConfig = "Input.SetConfig",
    InputGetConfig = "Input.GetConfig",
    InputGetStatus = "Input.GetStatus",
    WebhookListSupported = "Webhook.ListSupported",
    WebhookList = "Webhook.List",
    WebhookDeleteAll = "Webhook.DeleteAll",
    WebhookDelete = "Webhook.Delete",
    WebhookUpdate = "Webhook.Update",
    WebhookCreate = "Webhook.Create",
    MqttSetConfig = "Mqtt.SetConfig",
    MqttGetConfig = "Mqtt.GetConfig",
    MqttGetStatus = "Mqtt.GetStatus",
    CloudSetConfig = "Cloud.SetConfig",
    CloudGetConfig = "Cloud.GetConfig",
    CloudGetStatus = "Cloud.GetStatus",
    BLESetConfig = "BLE.SetConfig",
    BLEGetConfig = "BLE.GetConfig",
    BLEGetStatus = "BLE.GetStatus",
    EthSetConfig = "Eth.SetConfig",
    EthGetConfig = "Eth.GetConfig",
    EthGetStatus = "Eth.GetStatus",
    WifiScan = "Wifi.Scan",
    WifiSetConfig = "Wifi.SetConfig",
    WifiGetConfig = "Wifi.GetConfig",
    WifiGetStatus = "Wifi.GetStatus",
    SysSetConfig = "Sys.SetConfig",
    SysGetConfig = "Sys.GetConfig",
    SysGetStatus = "Sys.GetStatus",
    HTTPGET = "HTTP.GET",
    ShellyListMethods = "Shelly.ListMethods",
    ShellyPutTLSClientKey = "Shelly.PutTLSClientKey",
    ShellyPutTLSClientCert = "Shelly.PutTLSClientCert",
    ShellyPutUserCA = "Shelly.PutUserCA",
    ShellyReboot = "Shelly.Reboot",
    ShellySetAuth = "Shelly.SetAuth",
    ShellyUpdate = "Shelly.Update",
    ShellyCheckForUpdate = "Shelly.CheckForUpdate",
    ShellyDetectLocation = "Shelly.DetectLocation",
    ShellyListTimezones = "Shelly.ListTimezones",
    ShellyGetStatus = "Shelly.GetStatus",
    ShellyFactoryReset = "Shelly.FactoryReset",
    ShellyResetWiFiConfig = "Shelly.ResetWiFiConfig",
    ShellyGetConfig = "Shelly.GetConfig",
    ShellyGetDeviceInfo = "Shelly.GetDeviceInfo",
    ShellyListProfiles = "Shelly.ListProfiles",
    ShellySetProfile = "Shelly.SetProfile"
}

export interface Reboot {
    delay_ms?: number;
}

/** FIXME:
 * 
 * {"id":124, "src":"shellyTest","method":"Switch.Set", "params":{"id":0,"on":true}}'
 */

export interface SwitchSetRequest {
    id: number;
    on: boolean;
    toggle_after?: number;
}

export interface SwitchSetResponse {
    was_on: boolean;
}

export interface SwitchToggleRequest {
    id: number;
}

export interface SwitchToggleResponse {
    was_on: boolean;
}

interface SwitchConfig {

    // Id of the Switch component instance
    id: number;

    // Name of the switch instance,
    name?: string;

    // Mode of the associated input
    in_mode: "momentary" | "follow" | "flip" | "detached" | "cycle", "activate";
    
    // Output state to set on power_on
    initial_state: "off" | "on" | "restore_last" | "match_input";

    // True if "Automatic ON" function is enabled
    auto_on: boolean;
    
    // Seconds to pass until component is switched back on
    auto_on_delay: number; 

    // True if "Automatic OFF" function is enabled
    auto_off: boolean;

    // Seconds to pass until component is switched back off
    auto_off_delay: number; 

    // True if switch output state should be restored after over/undervoltage error is cleared, false otherwise
    autorecover_voltage_errors?: boolean; 
    
    // Id of the Input component which controls the Switch.
    input_id?: number;

    // Limit over which overpower condition occurs, optional
    power_limit?: number;

    // Limit (in Volts) over which overvoltage condition occurs
    voltage_limit?: number;

    // Limit (in Volts) over which undervoltage condition occurs
    undervoltage_limit?: number;

    // Limit (in Amperes) over which overcurrent condition occurs, optional
    current_limit?: number;
}

export interface SwitchSetConfigRequest {
    id: number;
    config: Partial<SwitchConfig>;
}

export interface SwitchGetConfigRequest {
    id: number;
}

export interface SwitchGetConfigResponse {
    id: number;
    config: SwitchConfig;
}

export interface ShellyUpdateRequest {
    stage?: "stable" | "beta";
    url?: string;
}
