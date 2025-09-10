import { Button, Modal, Box } from '@mui/material';
import { type PropsWithChildren, type ReactElement } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Loader from '../Loader/Loader';
import { getIsLoading } from '../../../store/creditSlice/credit.selector';
import { useAppSelector } from '../../../hooks/store';

const modalStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '280px',
  minHeight: '340px',
  textAlign: 'center',
  boxShadow: 24,
  p: '40px 30px',
  bgcolor: 'background.paper',
  '& .MuiBackdrop-root': { backgroundColor: 'transparent' },
};

const closeModalButtonStyles = {
  position: 'absolute',
  display: 'flex',
  minWidth: '30px',
  width: '30px',
  height: '30px',
  padding: '25px',
  top: 0,
  right: 0,
};

type ModalProps = {
  isModalOpen: boolean;
  onModalClose: () => void;
};

export default function CustomModal({
  children,
  isModalOpen,
  onModalClose,
}: PropsWithChildren<ModalProps>): ReactElement {
  const isLoading = useAppSelector(getIsLoading);

  return (
    <Modal open={isModalOpen} onClose={onModalClose}>
      <Box sx={modalStyles}>
        <Button sx={closeModalButtonStyles} onClick={onModalClose}>
          <CloseIcon />
          <span className="visually-hidden">Закрыть модальное окно</span>
        </Button>

        {children}

        {isLoading && <Loader isAction />}
      </Box>
    </Modal>
  );
}
