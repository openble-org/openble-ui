import { Typography, IconButton } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { enqueueSnackbar } from "notistack";
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import { useState } from "react";
import { getShortUuid } from "@openble/openble-sdk";

export interface AttributeUuidProps {
  uuid: string
  source: string
}

export default function AttributeUuid({ uuid, source }: AttributeUuidProps) {
  const [expandedUuid, setExpandedUuid] = useState(false)

  const displayedUuid = source === 'gss' && !expandedUuid
    ? getShortUuid(uuid)
    : uuid

  function handleToggleExpand() {
    setExpandedUuid(!expandedUuid)
  }

  async function handlePressCopy() {
    try {
      await navigator.clipboard.writeText(displayedUuid)
      enqueueSnackbar(`Copied to clipboard`, { variant: 'default' })
    } catch (error) {
      enqueueSnackbar('Copy failed', { variant: 'error' })
    }
  }

  return <Grid container spacing={1} alignItems="baseline">
    <Grid>
      {
        source === 'gss' && expandedUuid
          ? <Typography><strong>UUID: </strong>0000<strong>{getShortUuid(uuid)}</strong>-0000-1000-8000-00805F9B34FB</Typography>
          : <Typography><strong>UUID: </strong>{displayedUuid}</Typography>
      }
    </Grid>

    <Grid>
      <IconButton size="small" onClick={handleToggleExpand}>
        {
          expandedUuid
            ? <CloseFullscreenIcon />
            : <OpenInFullIcon />
        }
      </IconButton>
    </Grid>

    <Grid>
      <IconButton size="small" onClick={handlePressCopy}><ContentCopyIcon /></IconButton>
    </Grid>
  </Grid>
}
