import { ParsedCharacteristic, ParsedService } from "../lib/parsedSchema";

export function matchService(
  connectedService: BluetoothRemoteGATTService | undefined
): boolean {
  return connectedService !== undefined
}

export function matchCharacteristic(
  connectedCharacteristic: BluetoothRemoteGATTCharacteristic | undefined,
  parsedCharacteristic: ParsedCharacteristic
): boolean {
  return connectedCharacteristic !== undefined
    && connectedCharacteristic.properties.read === parsedCharacteristic.permissions.includes('READ')
    && connectedCharacteristic.properties.write === parsedCharacteristic.permissions.includes('WRITE')
    && connectedCharacteristic.properties.notify === parsedCharacteristic.permissions.includes('NOTIFY')
    && connectedCharacteristic.properties.indicate === parsedCharacteristic.permissions.includes('INDICATE')
}
