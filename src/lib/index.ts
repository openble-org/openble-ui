import invariant from 'tiny-invariant'
import schema from '../openble/spec.openble.json'
import { ParsedSchema } from './parsedSchema'
import { RawSchema } from './rawSchema'

export function parseSchema(): ParsedSchema {
  const rawSchema: RawSchema = schema

  invariant(rawSchema.openble === "0.1.0", `unknown schema ${rawSchema.openble}`);
  invariant(rawSchema.profile === "gatt", `unknown profile ${rawSchema.profile}`);

  const parsedSchema: ParsedSchema = {
    openble: rawSchema.openble,
    profile: rawSchema.profile,
    info: {
      title: rawSchema.info.title,
      description: rawSchema.info.description,
      version: rawSchema.info.version
    },
    services: {}
  }

  // Parse services
  for (const [serviceUuid, rawService] of Object.entries(rawSchema.services)) {
    // Service ID can be short UID, long UID, SIG identifier or openBLE identifier
    parsedSchema.services[serviceUuid] = {
      name: rawService.name,
      summary: rawService.summary,
      characteristics: {}
    }
    const parsedService = parsedSchema.services[serviceUuid]

    // Parse characteristics
    for (const [characteristicUuid, rawCharacteristic] of Object.entries(rawService.characteristics)) {
      for(const permission of rawCharacteristic.permissions) {
        invariant(
          permission === 'READ'
          || permission === 'WRITE'
          || permission === 'NOTIFY'
          || permission === 'INDICATE'
        , `unknown permission ${permission}`);
      }

      parsedService.characteristics[characteristicUuid] = {
        name: rawCharacteristic.name,
        summary: rawCharacteristic.summary,
        permissions: []
      }
      const parsedCharacteristic = parsedService.characteristics[characteristicUuid]

      for(const permission of rawCharacteristic.permissions) {
        invariant(
          permission === 'READ'
          || permission === 'WRITE'
          || permission === 'NOTIFY'
          || permission === 'INDICATE'
        , `unknown permission ${permission}`);

        // Ensure no duplicates
        invariant(!parsedCharacteristic.permissions.includes(permission), `Duplicate permission ${permission}`)

        parsedCharacteristic.permissions.push(permission)
      }
    }
  }

  return parsedSchema
}
