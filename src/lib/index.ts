import schema from '../openble/spec.openble.json'

interface Schema {
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

interface Service {
  uuid: string
  summary: string
  characteristics: {
    [name: string]: Characteristic
  }
}

interface Characteristic {
  uuid: string
  summary: string
  permissions: number[]
  descriptors?: {
    [descriptor: string]: number[]
  }
}

function parseSchema() {
  const parsedSchema: Schema = schema
}
