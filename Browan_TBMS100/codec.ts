interface Input { 
    bytes: number[];
    fPort: number;
}

interface Output {
    data?: {
        occupancyDuration: number;
        motionDetectionCount: number;
        isRoomOccupied: boolean;
        batteryVoltage: number;
        temperature: number;
    };
    warnings?: string[];
    errors?: string[];
}

export function decodeUplink(input: Input): Output {
    const { bytes, fPort } = input;

    if (bytes.length === 0 || bytes.every(byte => byte === 0)) {
        return { warnings: ["Empty or all-zero payload received."] };
    }

    switch (fPort) {
        case 102:
            if (bytes.length < 8) {
                return { errors: [`Invalid payload length for FPort ${fPort}`] };
            }

            return {
                data: {
                    isRoomOccupied: (bytes[0] & 0x01) === 1,
                    occupancyDuration: (bytes[4] << 8) | bytes[3],
                    motionDetectionCount: (bytes[7] << 16) | (bytes[6] << 8) | bytes[5],
                    batteryVoltage: (25 + (bytes[1] & 0x0F)) / 10,
                    temperature: (bytes[2] & 0x7F) - 32,
                },
            };

        default:
            return { errors: [`Unknown FPort: ${fPort}`] };
    }
}
