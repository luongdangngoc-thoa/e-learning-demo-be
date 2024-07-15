'use client'

import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { DeleteButton, EditButton, List, ShowButton, useDataGrid } from '@refinedev/mui'
import React from 'react'

export default function CourseList() {
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
        field: 'title',
        flex: 1,
        headerName: 'Title',
        minWidth: 50,
        maxWidth: 200
      },
      {
        field: 'cost',
        flex: 1,
        headerName: 'Cost',
        minWidth: 50,
        maxWidth: 200
      },
      {
        field: 'sale_price',
        flex: 1,
        headerName: 'Sale price',
        minWidth: 50,
        maxWidth: 200
      },
      {
        field: 'description',
        flex: 1,
        headerName: 'Description',
        minWidth: 50,
        maxWidth: 200
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
