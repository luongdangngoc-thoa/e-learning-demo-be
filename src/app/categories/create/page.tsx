'use client'

import FileUploadIcon from '@mui/icons-material/FileUpload'
import { LoadingButton } from '@mui/lab'
import { Box, Input, Stack, TextField, Typography } from '@mui/material'
import { Create } from '@refinedev/mui'
import { useForm } from '@refinedev/react-hook-form'
import React, { useState } from 'react'

export default function CategoryCreate() {
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

  const imageInput = watch('logo')

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

      const logoUrl = 'https://picsum.photos/200'

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

      setValue('logo', logoUrl, { shouldValidate: true })

      setIsUploadLoading(false)
    } catch (error) {
      setError('logo', { message: 'Upload failed. Please try again.' })
      setIsUploadLoading(false)
    }
  }

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box component='form' sx={{ display: 'flex', flexDirection: 'column' }} autoComplete='off'>
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
        />
        <TextField
          {...register('description', {
            required: 'This field is required'
          })}
          error={!!(errors as any)?.title}
          helperText={(errors as any)?.title?.message}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          type='text'
          label={'Description'}
          name='description'
        />
        <Stack direction='row' gap={4} flexWrap='wrap' sx={{ marginTop: '16px' }}>
          <label htmlFor='logo-input'>
            <Input id='logo-input' type='file' sx={{ display: 'none' }} onChange={onChangeHandler} />
            <input
              id='file'
              {...register('logo', {
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
              Upload logo
            </LoadingButton>
            <br />
            {errors.logo && (
              <Typography variant='caption' color='#fa541c'>
                {errors.logo?.message?.toString()}
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
      </Box>
    </Create>
  )
}
