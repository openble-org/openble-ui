import { Box, Button, Card, CardContent, Chip, ListItem, TextField, Typography } from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2'
import DoneIcon from '@mui/icons-material/Done'
import CloseIcon from '@mui/icons-material/Close'
import WarningIcon from '@mui/icons-material/Warning'
import { ParsedCharacteristic } from "../../lib/parsedSchema"
import { useContext, useState } from "react"
import { BluetoothContext } from "../../contexts/BluetoothContext"
import { decodeType, encodeType } from "../../lib/dataTypes"
import { matchCharacteristic } from "../../utils/matchSchema"

interface CharacteristicCardProps {
  index: number
  uuid: string
  characteristic: ParsedCharacteristic
}
export default function CharacteristicCard({
  index,
  uuid,
  characteristic
}: CharacteristicCardProps) {
  const bluetoothDeviceContext = useContext(BluetoothContext)
  if (bluetoothDeviceContext === undefined) {
    throw Error('Not inside a BluetoothDeviceProvider')
  }
  const { bluetoothDevice, connectedCharacteristics } = bluetoothDeviceContext
  const connectedCharacteristic = connectedCharacteristics.get(uuid)

  const characteristicMatched = matchCharacteristic(connectedCharacteristic, characteristic)

  // TODO only disable actions which did not match
  const actionsDisabled = connectedCharacteristic === undefined

  const [readValue, setReadValue] = useState<string>('')
  const [writeValue, setWriteValue] = useState<string>('')

  async function handleReadValue() {
    if (connectedCharacteristic === undefined) {
      throw Error('Failed to read, connectedCharacteristic is undefined')
    }

    try {
      const value = await connectedCharacteristic.readValue()
      // TODO parse based on datatype field in schema
      const decodedValue = decodeType(value, characteristic.dataType)
      console.log('readValue', value, decodedValue)
      setReadValue(decodedValue.toString())
    } catch (error) {
      console.error('Failed to read', error)
    }
  }

  async function handleWriteValue() {
    if (connectedCharacteristic === undefined) {
      throw Error('Failed to read, connectedCharacteristic is undefined')
    }

    try {
      const encodedValue = encodeType(writeValue, characteristic.dataType)
      console.log('encoded as', encodedValue)
      await connectedCharacteristic.writeValue(encodedValue)
    } catch (error) {
      console.error('Failed to write', error)
    }
  }

  return <ListItem>
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Grid container spacing={2} alignItems="baseline">
          <Grid>
            <Typography variant="h6">{`${index + 1}. ${characteristic.name}`}</Typography>
          </Grid>
          <Grid>
            <Typography variant="subtitle1">{characteristic.summary}</Typography>
          </Grid>
        </Grid>

        <Box marginTop={2} />
        <Grid container spacing={1}>
          <Grid direction="row">
            <Typography><strong>UUID: </strong>{uuid}</Typography>

          </Grid>
          <Grid>
            <Chip label={characteristic.source} color="primary" size="small" />
          </Grid>
          <Grid xs={12}>
            <Typography><strong>Identifier: </strong>{characteristic.identifier}</Typography>
          </Grid>
          <Grid xs={12} marginBottom={1}>
            <Typography><strong>Type: </strong>{characteristic.dataType}</Typography>
          </Grid>

          <Grid>
            {
              characteristic.permissions.includes('READ')
                ? <Chip label="Read" icon={<DoneIcon />} color="primary" size="small" />
                : <Chip label="Read" icon={<CloseIcon />} size="small" />
            }
          </Grid>

          <Grid>
            {
              characteristic.permissions.includes('WRITE')
                ? <Chip label="Write" icon={<DoneIcon />} color="success" size="small" />
                : <Chip label="Write" icon={<CloseIcon />} size="small" />
            }
          </Grid>

          <Grid>
            {
              characteristic.permissions.includes('NOTIFY')
                ? <Chip label="Notify" icon={<DoneIcon />} color="warning" size="small" />
                : <Chip label="Notify" icon={<CloseIcon />} size="small" />
            }
          </Grid>

          <Grid>
            {
              characteristic.permissions.includes('INDICATE')
                ? <Chip label="Indicate" icon={<DoneIcon />} color="error" size="small" />
                : <Chip label="Indicate" icon={<CloseIcon />} size="small" />
            }
          </Grid>

          {
            bluetoothDevice !== undefined && !characteristicMatched && <Grid xs={12} marginTop={3}>
              <Chip label="Failed to match" icon={<WarningIcon />} color="warning" />
            </Grid>
          }

          <Grid xs={12} marginTop={2}>
            <Typography variant="subtitle1"><strong>Actions</strong></Typography>
          </Grid>

          {
            characteristic.permissions.includes('READ') &&
            <Grid xs={12} md={6}>
              <Grid container spacing={2} >
                <Grid alignItems="baseline">
                  <Button variant="contained" onClick={handleReadValue} disabled={actionsDisabled}>Read</Button>
                </Grid>
                <Grid alignItems="baseline">
                  <TextField value={readValue} variant="outlined" size="small" disabled={true} />
                </Grid>
              </Grid>
            </Grid>
          }

          {
            characteristic.permissions.includes('WRITE') &&
            <Grid xs={12} md={6}>
              <Grid container spacing={2} >
                <Grid alignItems="baseline">
                  <Button onClick={handleWriteValue} variant="contained" color="success" disabled={actionsDisabled}>Write</Button>
                </Grid>
                <Grid alignItems="baseline">
                  {/* TODO allow other types. Only numbers supported now */}
                  <TextField
                    value={writeValue}
                    onChange={(event) => setWriteValue(event.target.value)}
                    type="number"
                    variant="outlined"
                    size="small"
                    disabled={actionsDisabled}
                  />
                </Grid>
              </Grid>
            </Grid>
          }

          {
            actionsDisabled &&
            <Grid xs={12}>
              <Typography variant="body2">Connect to enable actions</Typography>
            </Grid>
          }

        </Grid>

      </CardContent>
    </Card>
  </ListItem>
}