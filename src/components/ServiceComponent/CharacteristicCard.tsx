import { Box, Button, Card, CardContent, Chip, ListItem, TextField, Typography } from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2'
import DoneIcon from '@mui/icons-material/Done'
import CloseIcon from '@mui/icons-material/Close'
import { ParsedCharacteristic } from "../../lib/parsedSchema"

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
          <Grid xs={12} marginBottom={1}>
            <Typography><strong>Identifier: </strong>{characteristic.identifier}</Typography>
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

          <Grid xs={12} marginTop={2}>
            {/* <Box marginY={2} /> */}
            <Typography variant="subtitle1">Actions</Typography>
          </Grid>

          {
            characteristic.permissions.includes('READ') &&
            <Grid xs={12} md={6}>
              <Grid container spacing={2} >
                <Grid alignItems="baseline">
                  <Button variant="contained">Read</Button>
                </Grid>
                <Grid alignItems="baseline">
                  <TextField variant="outlined" size="small" />
                </Grid>
              </Grid>
            </Grid>
          }

          {
            characteristic.permissions.includes('WRITE') &&
            <Grid xs={12} md={6}>
              <Grid container spacing={2} >
                <Grid alignItems="baseline">
                  <Button variant="contained" color="success">Write</Button>
                </Grid>
                <Grid alignItems="baseline">
                  <TextField variant="outlined" size="small" />
                </Grid>
              </Grid>
            </Grid>
          }

        </Grid>

      </CardContent>
    </Card>
  </ListItem>
}