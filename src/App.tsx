import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';

import { useState } from 'react'
import MainAppBar from './components/MainAppBar'
import { parsedSchema } from './lib'

const schema = parsedSchema()

function App() {
  const theme = useTheme();

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

        <Box marginTop={12}/>
        <Grid container spacing={1}>
          <Grid>
            <Typography variant='h4'>Services</Typography>
          </Grid>
          <Grid>
            <Chip label={`#${Object.keys(schema.services).length}`} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default App
