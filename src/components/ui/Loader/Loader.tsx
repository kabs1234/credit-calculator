import { Box, CircularProgress } from '@mui/material';
import type { ReactElement } from 'react';

const loaderStyles = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export default function Loader({
  isAction,
}: {
  isAction?: boolean;
}): ReactElement {
  return (
    <Box
      sx={{
        ...loaderStyles,
        backgroundColor: isAction ? 'rgba(0, 0, 0, 0.25)' : 'transparent',
      }}
    >
      <CircularProgress />
    </Box>
  );
}
