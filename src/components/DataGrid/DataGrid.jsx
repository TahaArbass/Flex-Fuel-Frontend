import React, { useState, useMemo } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel,
    TextField, Paper, TablePagination
} from '@mui/material';

// DataGrid component to display data in a table with sorting and pagination
const DataGrid = ({ columns, rows, initialSort = { field: '', direction: 'asc' }, rowsPerPageOptions = [5, 10, 25] }) => {
    const [sortConfig, setSortConfig] = useState(initialSort);
    const [filterText, setFilterText] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

    // Sorting function
    const handleSort = (field) => {
        setSortConfig(prevConfig => ({
            field,
            direction: prevConfig.field === field && prevConfig.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    // Memoized values for sorted, filtered, and paginated rows
    const sortedRows = useMemo(() => {
        if (!sortConfig.field) return rows;

        return [...rows].sort((a, b) => {
            const aValue = a[sortConfig.field];
            const bValue = b[sortConfig.field];
            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [rows, sortConfig]);

    const filteredRows = useMemo(() => {
        if (!filterText) return sortedRows;

        return sortedRows.filter(row =>
            columns.some(column =>
                String(row[column.field]).toLowerCase().includes(filterText.toLowerCase())
            )
        );
    }, [filterText, sortedRows, columns]);

    const paginatedRows = useMemo(() => {
        const start = page * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredRows.slice(start, end);
    }, [page, rowsPerPage, filteredRows]);

    return (
        <>
            {/* Search Input at the right */}
            <TextField
                label="Search"
                variant="outlined"
                value={filterText}
                onChange={e => setFilterText(e.target.value)}
                margin="normal"
                style={{ mb: 2, width: '25%' }}
            />

            {/* Table Container */}
            <TableContainer sx={{ display: 'flex', width: '100%' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell
                                    key={column.field}
                                    style={{ fontSize: '1.4em', fontWeight: 'bold' }}
                                >
                                    <TableSortLabel
                                        active={sortConfig.field === column.field}
                                        direction={sortConfig.field === column.field ? sortConfig.direction : 'asc'}
                                        onClick={() => handleSort(column.field)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedRows.map((row, rowIndex) => (
                            <TableRow
                                key={rowIndex}
                                hover
                            >
                                {columns.map(column => (
                                    <TableCell key={column.field} sx={{ fontSize: '1.1em' }} >
                                        {row[column.field]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={filteredRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setPage(0);
                }}
            />
        </>
    );
};

export default DataGrid;
