import Paper from '@mui/material/Paper'
import ListItem from '@mui/material/ListItem'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import Chip from '@mui/material/Chip'
import React from 'react'
import { ParsedService } from '../../lib/parsedSchema'
import { Box, Button } from '@mui/material'

interface ServiceComponentProps {
  index: number
  serviceUuid: string
  service: ParsedService
}

export default function ServiceComponent({
  index,
  serviceUuid,
  service
}: ServiceComponentProps) {
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

        </Grid>

        <Box marginTop={2} />
        <Button variant="contained">Connect</Button>

        <Box marginTop={2} />
        <Grid container spacing={1}>
          <Grid>
            <Typography variant="h6">Characteristics</Typography>
          </Grid>
          <Grid>
            <Chip label={`#${Object.keys(service.characteristics).length}`} />
          </Grid>
        </Grid>


      </CardContent>
    </Card>
  </ListItem>
}