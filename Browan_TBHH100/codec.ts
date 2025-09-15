interface Input { 
    bytes: number[];
    fPort: number;
}

interface Output {
    data?: {
        status: number;
        battery: number;
        temperature: number;
        humidity: number;
    };
    warnings?: string[];
    errors?: string[];
}

export function decodeUplink(input: Input): Output {
    const { bytes, fPort } = input;

    if (bytes.length === 0 || bytes.every(byte => byte === 0)) {
        return { warnings: [ "Empty or all-zero payload received." ] };
    }

    switch (fPort) {
        case 103:
            if (bytes.length < 4) {
                return { errors: [`Invalid payload length for FPort ${fPort}`] };
            }

            return {
                data: {
                    status: (bytes[0] >> 3),
                    battery: (25 + (bytes[1] & 0x0F)) / 10,
                    temperature: (bytes[2] & 0x7F) - 32,
                    humidity: bytes[3] & 0x7F,
                }
            };

        default:
            return { errors: [ `Unknown FPort: ${fPort}` ] };
    }
}
