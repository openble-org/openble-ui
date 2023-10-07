import Paper from '@mui/material/Paper'
import ListItem from '@mui/material/ListItem'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import Chip from '@mui/material/Chip'
import React from 'react'
import { Service } from '../../lib'

interface ServiceComponentProps {
  index: number
  serviceId: string
  service: Service
}

export default function ServiceComponent({
  index,
  serviceId,
  service
}: ServiceComponentProps) {
  return <ListItem>
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Grid container spacing={1}>
          <Grid>
            <Typography variant='h5'>{`${index + 1}. ${serviceId}`}</Typography>
          </Grid>
          <Grid>
            <Typography variant="subtitle1">{service.summary}</Typography>
          </Grid>
          <Grid>
            <Chip label="SIG" color="primary" />
          </Grid>
          <Grid xs={12}>
            <Typography>UUID: 000<strong>0181A</strong>-0000-1000-8000-00805F9B34FB</Typography>
          </Grid>
        </Grid>

      </CardContent>
    </Card>
  </ListItem>
}