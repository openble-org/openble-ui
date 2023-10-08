// Raw types are read from the input JSON
// Parsed types are output by the SDK
export interface RawSchema {
  openble: string
  profile: string
  info: {
    title: string
    description: string
    version: string
  }
  services: {
    [uuid: string]: RawService
  }
}

export interface RawService {
  name: string
  summary: string
  characteristics: {
    [uuid: string]: RawCharacteristic
  }
}

export interface RawCharacteristic {
  name: string
  summary: string
  permissions: string[]
}
