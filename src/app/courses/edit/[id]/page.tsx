'use client'

import FileUploadIcon from '@mui/icons-material/FileUpload'
import { LoadingButton } from '@mui/lab'
import {
  Autocomplete,
  Box,
  FormControlLabel,
  Grid,
  Input,
  InputAdornment,
  Stack,
  Switch,
  TextField,
  Typography
} from '@mui/material'
import { Create, useAutocomplete } from '@refinedev/mui'
import { useForm } from '@refinedev/react-hook-form'
import { supabaseBrowserClient } from '@utils/supabase/client'
import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'

export default function CourseEdit() {
  const [isUploadLoading, setIsUploadLoading] = useState(false)
  const [userId, setUserId] = useState('')

  // const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? ''

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user }
      } = await supabaseBrowserClient.auth.getUser()
      if (user) {
        setUserId(user.id)
      }
    }
    fetchUser()
  }, [])

  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
    setValue,
    setError,
    watch
  } = useForm({})

  const { autocompleteProps: categoryAutocompleteProps } = useAutocomplete({
    resource: 'categories'
  })

  const imageInput = watch('banner')

  const onChangeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploadLoading(true)

      const formData = new FormData()
      const target = event.target
      const file: File = (target.files as FileList)[0]

      formData.append('file', file)

      // const res = await axios.post<{ url: string }>(`${apiUrl}/media/upload`, formData, {
      //   withCredentials: false,
      //   headers: {
      //     'Access-Control-Allow-Origin': '*'
      //   }
      // })

      const bannerUrl = 'https://picsum.photos/500/200'

      // const { name, size, type, lastModified } = file

      // const imagePaylod = [
      //   {
      //     name,
      //     size,
      //     type,
      //     lastModified,
      //     url: res.data.url
      //   }
      // ]

      setValue('banner', bannerUrl, { shouldValidate: true })

      setIsUploadLoading(false)
    } catch (error) {
      setError('banner', { message: 'Upload failed. Please try again.' })
      setIsUploadLoading(false)
    }
  }

  useEffect(() => {
    if (userId) {
      setValue('user_id', userId)
    }
  }, [userId, setValue])

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box component='form' sx={{ display: 'flex', flexDirection: 'column' }} autoComplete='off'>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('title', {
                required: 'This field is required'
              })}
              error={!!(errors as any)?.title}
              helperText={(errors as any)?.title?.message}
              margin='normal'
              fullWidth
              InputLabelProps={{ shrink: true }}
              type='text'
              label={'Title'}
              name='title'
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('cost', {
                required: 'This field is required'
              })}
              error={!!(errors as any)?.cost}
              helperText={(errors as any)?.cost?.message}
              margin='normal'
              fullWidth
              InputLabelProps={{ shrink: true }}
              type='number'
              label={'Cost'}
              name='cost'
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('sale_price', {
                required: 'This field is required'
              })}
              error={!!(errors as any)?.sale_price}
              helperText={(errors as any)?.sale_price?.message}
              margin='normal'
              fullWidth
              InputLabelProps={{ shrink: true }}
              type='number'
              label={'Sale Price'}
              name='sale_price'
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              control={control}
              name={'category_id'}
              rules={{ required: 'This field is required' }}
              // eslint-disable-next-line
              defaultValue={null as any}
              render={({ field }) => (
                <Autocomplete
                  {...categoryAutocompleteProps}
                  {...field}
                  onChange={(_, value) => {
                    field.onChange(value.id)
                  }}
                  getOptionLabel={(item) => {
                    return (
                      categoryAutocompleteProps?.options?.find((p) => {
                        const itemId = typeof item === 'object' ? item?.id?.toString() : item?.toString()
                        const pId = p?.id?.toString()
                        return itemId === pId
                      })?.title ?? ''
                    )
                  }}
                  isOptionEqualToValue={(option, value) => {
                    const optionId = option?.id?.toString()
                    const valueId = typeof value === 'object' ? value?.id?.toString() : value?.toString()
                    return value === undefined || optionId === valueId
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={'Category'}
                      margin='normal'
                      variant='outlined'
                      error={!!(errors as any)?.categories?.id}
                      helperText={(errors as any)?.categories?.id?.message}
                      required
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('duration', {
                required: 'This field is required'
              })}
              error={!!(errors as any)?.duration}
              helperText={(errors as any)?.duration?.message}
              margin='normal'
              fullWidth
              InputLabelProps={{ shrink: true }}
              type='number'
              label={'Duration'}
              name='duration'
              InputProps={{
                startAdornment: <InputAdornment position='start'>Month</InputAdornment>
              }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('discount', {
                required: 'This field is required'
              })}
              error={!!(errors as any)?.discount}
              helperText={(errors as any)?.discount?.message}
              margin='normal'
              fullWidth
              InputLabelProps={{ shrink: true }}
              type='number'
              label={'Discount'}
              name='discount'
              InputProps={{
                startAdornment: <InputAdornment position='start'>%</InputAdornment>
              }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              {...register('description', {
                required: 'This field is required'
              })}
              error={!!(errors as any)?.description}
              helperText={(errors as any)?.description?.message}
              margin='normal'
              fullWidth
              InputLabelProps={{ shrink: true }}
              type='text'
              label={'Description'}
              name='description'
              multiline
              rows={4}
              required
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControlLabel
              control={<Switch name='has_access_all_device' defaultChecked />}
              label='Has access all device'
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControlLabel control={<Switch name='has_certification' defaultChecked />} label='Has certification' />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControlLabel
              control={<Switch name='has_money_back_guarantee' defaultChecked />}
              label='Has money back guarantee'
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Stack direction='row' gap={4} flexWrap='wrap' sx={{ marginTop: '16px' }}>
              <label htmlFor='banner-input'>
                <Input id='banner-input' type='file' sx={{ display: 'none' }} onChange={onChangeHandler} />
                <input
                  id='file'
                  {...register('banner', {
                    required: 'This field is required'
                  })}
                  type='hidden'
                />
                <LoadingButton
                  loading={isUploadLoading}
                  loadingPosition='end'
                  endIcon={<FileUploadIcon />}
                  variant='contained'
                  component='span'
                >
                  Upload banner
                </LoadingButton>
                <br />
                {errors.banner && (
                  <Typography variant='caption' color='#fa541c'>
                    {errors.banner?.message?.toString()}
                  </Typography>
                )}
              </label>
              {imageInput && (
                <Box
                  component='img'
                  sx={{
                    maxWidth: 250,
                    maxHeight: 250
                  }}
                  src={imageInput}
                  alt='Post image'
                />
              )}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Create>
  )
}
