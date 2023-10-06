import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { useState } from 'react'
import MainAppBar from './components/MainAppBar'
import { parsedSchema } from './lib'

const schema = parsedSchema()

function App() {

  return (
    <Box>
      <MainAppBar />
      <Box marginTop={4}></Box>
      <Container maxWidth="xl">
        <Stack direction="row" spacing={1}>
          <Typography variant='h3'>{schema.info.title}</Typography>
          <Chip label={schema.info.version} />
          <Chip label={`OpenBLE ${schema.openble}`} color="primary" />
          <Chip label={`Profile ${schema.profile}`} color="secondary" />
        </Stack>

        <Box marginTop={2}></Box>
        <Typography variant='body1'>{schema.info.summary}</Typography>
      </Container>
    </Box>
  )
}

export default App
