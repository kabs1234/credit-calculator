import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import type { Credits } from '../../../types/types';
import { TABLE_CREDIT_FIELDS } from '../../../const';
import TableCellActions from '../TableCellActions/TableCellActions';

export default function TableCredit({ credits }: { credits: Credits }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Credit table">
        <TableHead>
          <TableRow>
            {TABLE_CREDIT_FIELDS.map(({ headerName }) => {
              return <TableCell key={headerName}>{headerName}</TableCell>;
            })}
            <TableCell key="Действия">Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {credits.map((credit) => (
            <TableRow key={credit.id}>
              {TABLE_CREDIT_FIELDS.map(({ field, headerName }) => {
                return <TableCell key={headerName}>{credit[field]}</TableCell>;
              })}
              <TableCell key="Действия">
                <TableCellActions cell={credit} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
