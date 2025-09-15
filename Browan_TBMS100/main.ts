import { decodeUplink } from "codec";

interface OrbiWanMsg {
    dataFrame: string;
    port: number;
}

if (args.event === "OnData") {
    const { dataFrame, port: fPort }: OrbiWanMsg = args.messages[0]?.object 
        ?? JSON.parse(hostApiSync("toString", args.messages[0]?.octets ?? [], "utf8"));

    const bytes = dataFrame.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) ?? [];

    const { data } = decodeUplink({ bytes, fPort });

    if (data) { 
        result.state = { ...data };
        result.upstream = [ { type: "object", object: data } ];

        result.idleTimeoutAfterSeconds = 2 * 60 * 60;

        result.operationalStatus = "normal";
        result.touch = true;
    }
} else if (args.event === "OnIdleTimeout") {
    result.operationalStatus = "error";
}
