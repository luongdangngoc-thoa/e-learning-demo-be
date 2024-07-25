'use client'

import FileUploadIcon from '@mui/icons-material/FileUpload'
import { LoadingButton } from '@mui/lab'
import { Box, Grid, Input, Stack, TextField, Typography } from '@mui/material'
import { Edit } from '@refinedev/mui'
import { useForm } from '@refinedev/react-hook-form'
import React, { useState } from 'react'

export default function UserEdit() {
  const [isUploadLoading, setIsUploadLoading] = useState(false)

  // const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? ''

  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    formState: { errors },
    setValue,
    setError,
    watch
  } = useForm({})

  const imageInput = watch('avatar')

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

      const avatarUrl = 'https://picsum.photos/400'

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

      setValue('avatar', avatarUrl, { shouldValidate: true })

      setIsUploadLoading(false)
    } catch (error) {
      setError('avatar', { message: 'Upload failed. Please try again.' })
      setIsUploadLoading(false)
    }
  }

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box component='form' sx={{ display: 'flex', flexDirection: 'column' }} autoComplete='off'>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('email', {
                required: 'This field is required'
              })}
              error={!!(errors as any)?.title}
              helperText={(errors as any)?.title?.message}
              margin='normal'
              fullWidth
              InputLabelProps={{ shrink: true }}
              type='text'
              label={'Email'}
              name='email'
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('name', {
                required: 'This field is required'
              })}
              error={!!(errors as any)?.cost}
              helperText={(errors as any)?.cost?.message}
              margin='normal'
              fullWidth
              InputLabelProps={{ shrink: true }}
              type='text'
              label={'Name'}
              name='name'
              required
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Stack direction='row' gap={4} flexWrap='wrap' sx={{ marginTop: '16px' }}>
              <label htmlFor='avatar-input'>
                <Input id='avatar-input' type='file' sx={{ display: 'none' }} onChange={onChangeHandler} />
                <input
                  id='file'
                  {...register('avatar', {
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
                  Upload avatar
                </LoadingButton>
                <br />
                {errors.avatar && (
                  <Typography variant='caption' color='#fa541c'>
                    {errors.avatar?.message?.toString()}
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
    </Edit>
  )
}
