import { Typography, Chip } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'

export interface AttributeUuidProps {
  uuid: string
  source: string
}

export default function AttributeUuid({ uuid, source }: AttributeUuidProps) {
  return <Grid container spacing={1}>
    <Grid>
      <Typography><strong>UUID: </strong>{uuid}</Typography>
    </Grid>
    <Grid>
      <Chip label={source} color="primary" size="small" />
    </Grid>
  </Grid>
}
