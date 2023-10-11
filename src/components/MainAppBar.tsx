import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from '../contexts/ColorModeContext';

export default function MainAppBar() {
  const { isDarkMode, toggleColorMode } = React.useContext(ColorModeContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            OpenBLE UI
          </Typography>

          {/* Dark Theme Toggle Button */}
          <IconButton color="inherit" onClick={toggleColorMode}>
            {
              isDarkMode
                ? <Brightness7Icon />
                : <Brightness4Icon />
            }
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
