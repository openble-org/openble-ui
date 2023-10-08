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
    [fullUuid: string]: ParsedService
  }
}

export interface ParsedService {
  // The service name
  name: string

  // The full identifier
  identifier: string

  // The source of the UUID's definition. Equals `custom` if the UUID is not recorded in Nordic's database
  source: string

  // Service summary
  summary?: string

  characteristics: {
    [fullUuid: string]: ParsedCharacteristic
  }
}

export interface ParsedCharacteristic {
  // The service name
  name: string

  // The full identifier
  identifier: string

  // The source of the UUID's definition. Equals `custom` if the UUID is not recorded in Nordic's database
  source: string

  // Service summary
  summary?: string

  // Characteristic permissions
  permissions: OPENBLE_CHARACTERISTIC_PERMISSION[]
}
