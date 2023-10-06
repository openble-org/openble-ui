import schema from '../openble/spec.openble.json'

export interface Schema {
  openble: string
  profile: string
  info: {
    title: string
    summary: string
    version: string
  }
  services: {
    [name: string]: Service
  }
}

export interface Service {
  uuid: string
  summary: string
  characteristics: {
    [name: string]: Characteristic
  }
}

export interface Characteristic {
  uuid: string
  summary: string
  permissions: number[]
  descriptors?: {
    [descriptor: string]: number[]
  }
}

export function parsedSchema(): Schema {
  const parsedSchema: Schema = schema

  return parsedSchema
}
