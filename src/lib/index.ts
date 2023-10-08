import invariant from 'tiny-invariant'
import schema from '../openble/spec.openble.json'
import { ParsedCharacteristic, ParsedSchema, ParsedService } from './parsedSchema'
import { RawSchema } from './rawSchema'
import { checkIsShortUuid, checkIsUuid, findRecordedAttribute } from './uuids'

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
  for (const [serviceKey, rawService] of Object.entries(rawSchema.services ?? {})) {
    const recordedService = findRecordedAttribute(serviceKey, "service")

    let parsedService: ParsedService

    if (recordedService !== undefined) {
      parsedSchema.services[recordedService.uuid] = {
        name: recordedService.name,
        identifier: recordedService.identifier,
        source: recordedService.source,
        summary: rawService.summary,
        characteristics: {}
      }
      parsedService = parsedSchema.services[recordedService.uuid]
    } else {
      invariant(checkIsUuid(serviceKey) && !checkIsShortUuid(serviceKey), `${serviceKey} is not a valid long UUID`)
      invariant(rawService.name !== undefined, `No name provided for service ${serviceKey}`)
      invariant(rawService.identifier !== undefined, `No identifier provided for service ${serviceKey}`)

      parsedSchema.services[serviceKey] = {
        name: rawService.name,
        identifier: rawService.identifier,
        source: 'custom',
        summary: rawService.summary,
        characteristics: {}
      }
      parsedService = parsedSchema.services[serviceKey]
    }

    // Parse characteristics
    for (const [characteristicKey, rawCharacteristic] of Object.entries(rawService.characteristics ?? {})) {
      const recordedCharacteristic = findRecordedAttribute(characteristicKey, "characteristic")

      let parsedCharacteristic: ParsedCharacteristic

      if (recordedCharacteristic !== undefined) {
        parsedService.characteristics[recordedCharacteristic.uuid] = {
          name: recordedCharacteristic.name,
          identifier: recordedCharacteristic.identifier,
          source: recordedCharacteristic.source,
          summary: rawCharacteristic.summary,
          permissions: []
        }
        parsedCharacteristic = parsedService.characteristics[recordedCharacteristic.uuid]
      } else {
        invariant(checkIsUuid(characteristicKey) && !checkIsShortUuid(characteristicKey), `${characteristicKey} is not a valid long UUID`)
        invariant(rawCharacteristic.name !== undefined, `No name provided for characteristic ${serviceKey}`)
        invariant(rawCharacteristic.identifier !== undefined, `No identifier provided for characteristic ${serviceKey}`)

        parsedService.characteristics[characteristicKey] = {
          name: rawCharacteristic.name,
          identifier: rawCharacteristic.identifier,
          source: 'custom',
          summary: rawCharacteristic.summary,
          permissions: []
        }
        parsedCharacteristic = parsedService.characteristics[characteristicKey]
      }

      // Parse permissions
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

      // TODO parse descriptors
    }
  }

  console.log('parsedSchema', parsedSchema)

  return parsedSchema
}
