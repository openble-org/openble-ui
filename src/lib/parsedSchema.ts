export type OPENBLE_VERSION = "0.1.0"
export type OPENBLE_PROFILE = "gatt"
// TODO implement extended properties
export type OPENBLE_CHARACTERISTIC_PERMISSION = "READ" | "WRITE" | "NOTIFY" | "INDICATE"

export interface ParsedSchema {
  openble: OPENBLE_VERSION
  profile: OPENBLE_PROFILE
  info: {
    title: string
    description: string
    version: string
  }
  services: {
    // A service along with its full UUID
    [uuid: string]: ParsedService
  }
}

export interface ParsedService {
  name: string
  summary: string
  characteristics: {
    [uuid: string]: ParsedCharacteristic
  }
}

export interface ParsedCharacteristic {
  name: string
  summary: string
  permissions: OPENBLE_CHARACTERISTIC_PERMISSION[]
}
