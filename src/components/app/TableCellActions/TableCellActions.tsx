import { useState, type ReactElement } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import type { Credit } from '../../../types/types';
import ActionButton from '../../ui/ActionButton/ActionButton';
import { useDeleteCreditMutation } from '../../../api/creditApi';

export default function TableCellActions({
  cell,
}: {
  cell: Credit;
}): ReactElement {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorElement);

  const credit = cell;
  const creditId = Number(credit.id);

  const onMenuButtonClick = (
    evt: React.MouseEvent<HTMLButtonElement>
  ): void => {
    setAnchorElement(evt.currentTarget);
  };

  const onMenuClose = (): void => {
    setAnchorElement(null);
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={isMenuOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? 'true' : undefined}
        onClick={onMenuButtonClick}
      >
        Действия
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorElement}
        open={isMenuOpen}
        onClose={onMenuClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        <MenuItem>
          <ActionButton
            mutation={useDeleteCreditMutation}
            payload={creditId}
            text="Удалить заявку"
            actionStateTexts={{
              success: 'Заявка была успешна удалена!',
              error: 'удалить',
            }}
            isGloballyDisabled
          />
        </MenuItem>
      </Menu>
    </>
  );
}
