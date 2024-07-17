'use client'

import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { DeleteButton, EditButton, List, ShowButton, useDataGrid } from '@refinedev/mui'
import React from 'react'

export default function UserList() {
  const { dataGridProps } = useDataGrid({})

  const rowsWithIndex = dataGridProps.rows.map((row, index) => ({
    ...row,
    index: index + 1
  }))

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: 'index',
        headerName: 'No.',
        headerAlign: 'center',
        align: 'center',
        type: 'number',
        minWidth: 50
      },
      {
        field: 'name',
        flex: 1,
        headerName: 'Name',
        minWidth: 50,
        maxWidth: 400
      },
      {
        field: 'email',
        flex: 1,
        headerName: 'Email',
        minWidth: 50,
        maxWidth: 400
      },
      {
        field: 'actions',
        headerName: 'Actions',
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          )
        },
        align: 'center',
        headerAlign: 'center',
        minWidth: 80
      }
    ],
    []
  )

  return (
    <List>
      <DataGrid {...dataGridProps} rows={rowsWithIndex} columns={columns} autoHeight />
    </List>
  )
}
