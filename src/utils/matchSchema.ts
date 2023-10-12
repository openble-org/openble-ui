import { ParsedCharacteristic } from "@openble/openble-sdk";

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
    && connectedCharacteristic.properties.read === parsedCharacteristic.permissions.read
    && connectedCharacteristic.properties.write === parsedCharacteristic.permissions.write
    && connectedCharacteristic.properties.notify === parsedCharacteristic.permissions.notify
    && connectedCharacteristic.properties.indicate === parsedCharacteristic.permissions.indicate
}
