import Box from '@mui/material/Box'
import DoneIcon from '@mui/icons-material/Done'
import BluetoothIcon from '@mui/icons-material/Bluetooth'
import BluetoothConnectedIcon from '@mui/icons-material/BluetoothConnected'
import BluetoothDisabledIcon from '@mui/icons-material/BluetoothDisabled'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip';
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Unstable_Grid2';

import { useContext, useState } from 'react'
import MainAppBar from './components/MainAppBar'
import ServiceComponent from './components/ServiceComponent';
import useSchema from './hooks/useSchema';
import { BluetoothContext } from './contexts/BluetoothContext';
import { matchCharacteristic, matchService } from './utils/matchSchema'

function App() {
  const schema = useSchema()

  const bluetoothDeviceContext = useContext(BluetoothContext)
  if (bluetoothDeviceContext === undefined) {
    throw Error('Not inside a BluetoothDeviceProvider')
  }
  const {
    bluetoothDevice,
    setBluetoothDevice,
    connectedServices,
    serviceActions,
    connectedCharacteristics,
    characteristicActions,
    connectedDescriptors,
    descriptorActions
  } = bluetoothDeviceContext

  const [connectError, setConnectError] = useState<string | undefined>()

  // Compare schema with read attributes
  const servicesArray = Object.entries(schema?.services ?? {})

  console.log('connectedCharacteristics', connectedCharacteristics)

  let schemaMatched = false
  for (const [serviceUuid, parsedService] of servicesArray) {
    const connectedService = connectedServices.get(serviceUuid)

    // if (connectedService === undefined) {
    //   break
    // }

    if (!matchService(connectedService)) {
      break
    }
    const characteristicsArray = Object.entries(parsedService.characteristics)
    for (const [characteristicUuid, parsedCharacteristic] of characteristicsArray) {
      const connectedCharacteristic = connectedCharacteristics.get(characteristicUuid)

      if (!matchCharacteristic(connectedCharacteristic, parsedCharacteristic)) {
        break
      }
      // if (
      //   connectedCharacteristic === undefined
      //   || !(connectedCharacteristic.properties.read === parsedCharacteristic.permissions.includes('READ'))
      //   || !(connectedCharacteristic.properties.write === parsedCharacteristic.permissions.includes('WRITE'))
      //   || !(connectedCharacteristic.properties.notify === parsedCharacteristic.permissions.includes('NOTIFY'))
      //   || !(connectedCharacteristic.properties.indicate === parsedCharacteristic.permissions.includes('INDICATE'))
      // ) {
      //   break
      // }

      // TODO compare descriptors

      schemaMatched = true
    }
  }

  async function handleConnect() {
    // Clear existing error
    setConnectError(undefined)

    // Keys must be lowercase
    const serviceUuids = Object.keys(schema?.services ?? {}).map(uuid => uuid.toLowerCase())

    try {
      // Request Bluetooth permissions
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: false, // Set to true to accept any device
        filters: [{ services: serviceUuids }],
      });

      device.addEventListener('gattserverdisconnected', handleDisconnectEvent)

      if (device.gatt === undefined) {
        throw Error('No gatt available')
      }

      // Connect to the selected device
      const server = await device.gatt.connect();

      // Discover services on the device
      const services = await server.getPrimaryServices();
      console.log('got services', services)

      // Store services in state
      for (const service of services) {
        serviceActions.set(service.uuid.toUpperCase(), service)

        try {
          const characteristics = await service.getCharacteristics()
          for (const characteristic of characteristics) {
            characteristicActions.set(characteristic.uuid.toUpperCase(), characteristic)

            try {
              const descriptors = await characteristic.getDescriptors()
              for (const descriptor of descriptors) {
                descriptorActions.set(descriptor.uuid.toUpperCase(), descriptor)
              }
            } catch (error) {
              console.error(`Failed to fetch descriptors for characteristic ${characteristic.uuid.toUpperCase()}`, error)
            }

          }
        } catch (error) {
          // Error thrown if service has no characteristics. We must catch error in order to lookup
          // characteristics of other services
          console.error(`Failed to fetch characteristics for service ${service.uuid.toUpperCase()}`, error)
        }
      }

      // Set state after async calls are finished
      setBluetoothDevice(device)
    } catch (error) {
      console.error('Bluetooth connect error', error)
      setConnectError((error as Error).message)
    }
  }

  function handleDisconnectEvent() {
    setBluetoothDevice(undefined)
  }

  async function handleDisconnectClick() {
    if (bluetoothDevice === undefined) {
      console.error("No conncted device, cannot disconnect")
      return
    }

    await bluetoothDevice.forget()
  }

  if (schema === undefined) {
    return <></>
  }

  return (
    <Box>
      <MainAppBar />
      <Box marginTop={4}></Box>
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid>
            <Typography variant='h3'>{schema.info.title}</Typography>
          </Grid>
          <Grid>
            <Chip label={schema.info.version} />
          </Grid>
          <Grid>
            <Chip label={`OpenBLE ${schema.openble}`} color="primary" />
          </Grid>
          <Grid xs={12} marginTop={2}>
            <Typography variant='body1'>{schema.info.description}</Typography>
          </Grid>
          <Grid xs={12} marginTop={4}>
            <Grid container spacing={1}>
              {
                bluetoothDevice !== undefined &&
                <Grid>
                  <Chip label="connected" icon={<BluetoothConnectedIcon />} color="primary" />
                </Grid>
              }
              {
                bluetoothDevice !== undefined && (schemaMatched
                  ? <Grid>
                    <Chip label="Schema matched" icon={<DoneIcon />} color="success" />
                  </Grid>
                  : <Grid>
                    <Chip label="Match failed" icon={<DoneIcon />} color="warning" />
                  </Grid>)
              }
            </Grid>
          </Grid>
          <Grid xs={12} marginTop={3}>
            {
              bluetoothDevice === undefined
                ? <Button
                    variant="contained"
                    onClick={handleConnect}
                    startIcon={<BluetoothIcon />}
                  >
                    Connect
                  </Button>
                : <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleDisconnectClick}
                    startIcon={<BluetoothDisabledIcon />}
                  >
                    Disconnect
                  </Button>
            }

          </Grid>
          <Grid xs={12}>
            {
              connectError !== undefined && <Typography color='error'>Error: {connectError}</Typography>
            }
          </Grid>
        </Grid>

        <Box marginTop={4} />
        <Grid container spacing={1}>
          <Grid>
            <Typography variant='h4'>Services</Typography>
          </Grid>
          <Grid>
            <Chip label={`#${Object.keys(schema.services).length}`} />
          </Grid>
        </Grid>

        <List>
          {
            Object.entries(schema.services).map(([serviceUuid, service], index) => {
              return <ServiceComponent
                key={serviceUuid}
                index={index}
                serviceUuid={serviceUuid}
                service={service}
              />
            })
          }
        </List>
      </Container>
    </Box>
  )
}

export default App
