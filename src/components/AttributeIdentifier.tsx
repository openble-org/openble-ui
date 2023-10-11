import { IconButton, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { enqueueSnackbar } from "notistack";

export interface AttributeIdentifierProps {
  identifier: string
}

export default function AttributeIdentifier({ identifier }: AttributeIdentifierProps) {

  async function handleOnPressCopy() {
    try {
      await navigator.clipboard.writeText(identifier)
      enqueueSnackbar(`Copied to clipboard`, { variant: 'default' })
    } catch (error) {
      enqueueSnackbar('Copy failed', { variant: 'error' })
    }
  }

  return <Grid container spacing={1} alignItems="baseline">
    <Grid>
      {/* word-wrap wraps text to new line */}
      <Typography style={{ wordWrap: "break-word" }}><strong>Identifier: </strong>{identifier}</Typography>
    </Grid>
    <Grid>
      <IconButton size="small" onClick={handleOnPressCopy}><ContentCopyIcon /></IconButton>
    </Grid>
  </Grid>
}
