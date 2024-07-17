'use client'

import { Box, Grid, Stack, Typography } from '@mui/material'
import { useShow } from '@refinedev/core'
import { Show, TextFieldComponent as TextField } from '@refinedev/mui'

export default function CourseShow() {
  const { queryResult } = useShow({
    meta: {
      select: '*'
    }
  })
  const { data, isLoading } = queryResult

  const record = data?.data

  return (
    <Show isLoading={isLoading} canEdit={false} canDelete={false}>
      <Stack gap={1}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='body1' fontWeight='bold'>
              {'ID'}
            </Typography>
            <TextField value={record?.id} />
          </Grid>

          <Grid item xs={6}>
            <Typography variant='body1' fontWeight='bold'>
              {'Name'}
            </Typography>
            <TextField value={record?.name} />
          </Grid>

          <Grid item xs={6}>
            <Typography variant='body1' fontWeight='bold'>
              {'Email'}
            </Typography>
            <TextField value={record?.email} />
          </Grid>

          <Grid item xs={12}>
            <Typography variant='body1' fontWeight='bold' marginBottom={1}>
              {'Avatar'}
            </Typography>
            <Box
              component='img'
              sx={{
                maxWidth: 250,
                maxHeight: 250
              }}
              src={record?.avatar ?? ''}
              alt='Post image'
            />
          </Grid>
        </Grid>
      </Stack>
    </Show>
  )
}
