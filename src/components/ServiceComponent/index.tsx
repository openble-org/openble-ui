import ListItem from '@mui/material/ListItem'
import Card from '@mui/material/Card'
import WarningIcon from '@mui/icons-material/Warning'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import Chip from '@mui/material/Chip'
import React, { useContext } from 'react'
import { ParsedService } from '../../lib/parsedSchema'
import { Box, List } from '@mui/material'
import CharacteristicCard from './CharacteristicCard'
import { BluetoothContext } from '../../contexts/BluetoothContext'
import { matchService } from '../../utils/matchSchema'

interface ServiceComponentProps {
  index: number
  serviceUuid: string
  service: ParsedService
}

export default function ServiceComponent({
  index,
  serviceUuid,
  service,
}: ServiceComponentProps) {

  const bluetoothDeviceContext = useContext(BluetoothContext)
  if (bluetoothDeviceContext === undefined) {
    throw Error('Not inside a BluetoothDeviceProvider')
  }
  const { bluetoothDevice, connectedServices } = bluetoothDeviceContext
  const connectedService = connectedServices.get(serviceUuid)

  return <ListItem>
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Grid container spacing={1} alignItems="baseline">
          <Grid>
            <Typography variant='h5'>{`${index + 1}. ${service.name}`}</Typography>
          </Grid>
          <Grid>
            <Typography variant="subtitle1">{service.summary}</Typography>
          </Grid>
        </Grid>
        <Box marginTop={2} />
        <Grid container spacing={1}>
          <Grid direction="row">
            <Typography><strong>UUID: </strong>{serviceUuid}</Typography>

          </Grid>
          <Grid>
            <Chip label={service.source} color="primary" size="small" />
          </Grid>
          <Grid xs={12}>
            <Typography><strong>Identifier: </strong>{service.identifier}</Typography>
          </Grid>
          {
            bluetoothDevice !== undefined && !matchService(connectedService) &&
              <Grid xs={12} marginTop={1}>
                <Chip label="Failed to match" icon={<WarningIcon />} color="warning" />
              </Grid>
          }
        </Grid>

        <Box marginTop={2} />
        <Grid container spacing={1}>
          <Grid>
            <Typography variant="h6">Characteristics</Typography>
          </Grid>
          <Grid>
            <Chip label={`#${Object.keys(service.characteristics).length}`} />
          </Grid>
          <Grid xs={12}>
            <List>
              {
                Object.entries(service.characteristics).map(([characteristicUuid, characteristic], index) => {
                  return <CharacteristicCard
                    key={characteristicUuid}
                    index={index}
                    uuid={characteristicUuid}
                    characteristic={characteristic}
                  />
                })
              }
            </List>
          </Grid>
        </Grid>

      </CardContent>
    </Card>
  </ListItem>
}