'use client'

import { Box, FormControlLabel, Grid, Stack, Switch, Typography } from '@mui/material'
import { useOne, useShow } from '@refinedev/core'
import { Show, TextFieldComponent as TextField } from '@refinedev/mui'

export default function CourseShow() {
  const { queryResult } = useShow({
    meta: {
      select: '*, categories(id,title)'
    }
  })
  const { data, isLoading } = queryResult

  const record = data?.data

  const { data: categoryData, isLoading: categoryIsLoading } = useOne({
    resource: 'categories',
    id: record?.categories?.id || '',
    queryOptions: {
      enabled: !!record
    }
  })

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant='body1' fontWeight='bold'>
              {'ID'}
            </Typography>
            <TextField value={record?.id} />
          </Grid>

          <Grid item xs={6}>
            <Typography variant='body1' fontWeight='bold'>
              {'Title'}
            </Typography>
            <TextField value={record?.title} />
          </Grid>

          <Grid item xs={6}>
            <Typography variant='body1' fontWeight='bold'>
              {'Cost'}
            </Typography>
            <TextField value={record?.cost} />
          </Grid>

          <Grid item xs={6}>
            <Typography variant='body1' fontWeight='bold'>
              {'Sale price'}
            </Typography>
            <TextField value={record?.sale_price} />
          </Grid>

          <Grid item xs={6}>
            <Typography variant='body1' fontWeight='bold'>
              {'Duration'}
            </Typography>
            <TextField value={record?.duration} />
          </Grid>

          <Grid item xs={6}>
            <Typography variant='body1' fontWeight='bold'>
              {'Discount'}
            </Typography>
            <TextField value={record?.discount} />
          </Grid>

          <Grid item xs={6}>
            <Typography variant='body1' fontWeight='bold'>
              {'Category'}
            </Typography>
            {categoryIsLoading ? <>Loading...</> : <>{categoryData?.data?.title}</>}
          </Grid>

          <Grid item xs={6}>
            <Typography variant='body1' fontWeight='bold'>
              {'Description'}
            </Typography>
            <Typography
              variant='body2'
              sx={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}
            >
              {record?.description}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='body1' fontWeight='bold'>
              {'Has access all device'}
            </Typography>
            <FormControlLabel control={<Switch checked={record?.has_access_all_device} disabled />} label='' />
          </Grid>

          <Grid item xs={12}>
            <Typography variant='body1' fontWeight='bold'>
              {'Has certification'}
            </Typography>
            <FormControlLabel control={<Switch checked={record?.has_certification} disabled />} label='' />
          </Grid>

          <Grid item xs={12}>
            <Typography variant='body1' fontWeight='bold'>
              {'Has money back guarantee'}
            </Typography>
            <FormControlLabel control={<Switch checked={record?.has_money_back_guarantee} disabled />} label='' />
          </Grid>

          <Grid item xs={12}>
            <Typography variant='body1' fontWeight='bold' marginBottom={1}>
              {'Banner'}
            </Typography>
            <Box
              component='img'
              sx={{
                maxWidth: 250,
                maxHeight: 250
              }}
              src={record?.banner}
              alt='Post image'
            />
          </Grid>
        </Grid>
      </Stack>
    </Show>
  )
}
