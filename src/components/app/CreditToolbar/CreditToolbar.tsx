import { useState, type ReactElement } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import CustomModal from '../../ui/CustomModal/CustomModal';
import { CreditForm } from '../CreditForm/CreditForm';

export default function CreditToolbar(): ReactElement {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onModalClose = (): void => {
    setIsModalOpen(false);
  };

  const onCreditFormOpenButtonClick = (): void => {
    setIsModalOpen(true);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Кредиты
        </Typography>

        <Button color="inherit" onClick={onCreditFormOpenButtonClick}>
          Форма
        </Button>

        <CustomModal isModalOpen={isModalOpen} onModalClose={onModalClose}>
          <CreditForm onFormSuccesfulSubmit={onModalClose} />
        </CustomModal>
      </Toolbar>
    </AppBar>
  );
}
