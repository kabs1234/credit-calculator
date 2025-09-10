import { type ReactElement } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

export default function CreditToolbar(): ReactElement {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Кредиты
        </Typography>

        <Button color="inherit">Форма</Button>
      </Toolbar>
    </AppBar>
  );
}
