import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip';
import Snackbar from '@mui/material/Snackbar';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List'
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Alert from '@mui/material/Alert';

import { useState } from 'react'
import MainAppBar from './components/MainAppBar'
import { parsedSchema } from './lib'
import useBluetoothError from './hooks/useBluetoothError';
import { ListItem } from '@mui/material';
import ServiceComponent from './components/ServiceComponent';

const schema = parsedSchema()

function App() {
  const theme = useTheme();
  const bluetoothError = useBluetoothError()
  console.log('bluetoothError', bluetoothError)

  return (
    <Box>
      <MainAppBar />
      <Box marginTop={4}></Box>
      <Container maxWidth="xl">
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
          <Grid>
            <Chip label={`Profile ${schema.profile}`} color="secondary" />
          </Grid>
        </Grid>

        <Box marginTop={2}></Box>
        <Typography variant='body1'>{schema.info.summary}</Typography>

        <Box marginTop={12} />
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
            Object.entries(schema.services).map(([serviceId, service], index) => {
              return <ServiceComponent key={serviceId} index={index} serviceId={serviceId} service={service} />
            })
          }

        </List>
      </Container>

      <Snackbar
        open={!!bluetoothError}
        autoHideDuration={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error">{bluetoothError}</Alert>
      </Snackbar>
    </Box>
  )
}

export default App
