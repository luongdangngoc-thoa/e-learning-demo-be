'use client'

import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { useMany } from '@refinedev/core'
import { DeleteButton, EditButton, List, ShowButton, useDataGrid } from '@refinedev/mui'
import React from 'react'

export default function BlogList() {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
    meta: {
      select: '*, categories(id,title)'
    }
  })

  const { data: categoryData, isLoading: categoryIsLoading } = useMany({
    resource: 'categories',
    ids: dataGridProps?.rows?.map((item: any) => item?.categories?.id).filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows
    }
  })

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
        field: 'view',
        flex: 1,
        headerName: 'View',
        minWidth: 50,
        maxWidth: 200
      },
      {
        field: 'categories',
        flex: 1,
        headerName: 'Category',
        maxWidth: 200,
        valueGetter: ({ row }) => {
          const value = row?.categories
          return value.title
        },
        renderCell: function render({ value }) {
          return categoryIsLoading ? <>Loading...</> : categoryData?.data?.find((item) => item.id === value?.id)?.title
        }
      },
      {
        field: 'description',
        flex: 1,
        headerName: 'Description',
        minWidth: 300,
        maxWidth: 500
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
