'use client'

import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { DeleteButton, EditButton, List, ShowButton, useDataGrid } from '@refinedev/mui'
import React from 'react'

export default function CategoryList() {
  const { dataGridProps } = useDataGrid({})

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        headerAlign: 'center',
        align: 'center',
        type: 'number',
        minWidth: 50
      },
      {
        field: 'title',
        flex: 1,
        headerName: 'Title',
        minWidth: 50,
        maxWidth: 200
      },
      {
        field: 'description',
        flex: 1,
        headerName: 'Description',
        minWidth: 300,
        maxWidth: 1000
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
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  )
}
