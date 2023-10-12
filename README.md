# OpenBLE UI

A web bluetooth frontend demonstrating the capabilties of OpenBLE.

https://demo.openble.org

## Capabilities

1. Define your GATT services in YAML.
2. Say goodbye to searching UUIDs in datasheets. Directly use GATT and Nordic identifiers.
3. Read and write directly from your browser with Web Bluetooth.
4. Automatically validate your schema with the connected device.
5. Generate type safe clients and peripherals using a platform agnostic specification.

## Resources

- [Demo video]()
- [Docs](https://openble.org)
- [SDK](https://github.com/openble-org/openble-sdk)
- contact: shardul@openble.org

## How to use

- Write your yaml schema [here](./src/openble/spec.openble.yaml)
- Convert your yaml schema to json, then paste it [here](./src/openble/spec.openble.json)
- Run project with `npm run dev`
