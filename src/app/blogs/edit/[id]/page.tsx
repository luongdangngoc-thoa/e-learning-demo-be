'use client'

import CustomTagInput from '@components/custom-tag-input'
import { CustomEditor } from '@components/editor/custom-editor'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { LoadingButton } from '@mui/lab'
import { Autocomplete, Box, Grid, Input, Stack, TextField, Typography } from '@mui/material'
import { Edit, useAutocomplete } from '@refinedev/mui'
import { useForm } from '@refinedev/react-hook-form'
import useExtensions from '@shared/hooks/use-extension'
import { supabaseBrowserClient } from '@shared/utils/supabase/client'
import axios from 'axios'
import { type RichTextEditorRef } from 'mui-tiptap'
import React, { useEffect, useRef, useState } from 'react'
import { Controller } from 'react-hook-form'

export default function BlogEdit() {
  const [isUploadLoading, setIsUploadLoading] = useState(false)
  const [fileError, setFileError] = useState('')
  const [userId, setUserId] = useState('')
  const rteRef = useRef<RichTextEditorRef>(null)
  const extensions = useExtensions()

  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? ''

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
    refineCore: { formLoading, onFinish },
    register,
    control,
    formState: { errors },
    setValue,
    setError,
    watch,
    handleSubmit,
    getValues
  } = useForm({})

  const content = watch('content', '') as string

  const { autocompleteProps: categoryAutocompleteProps } = useAutocomplete({
    resource: 'categories'
  })

  const imageInput = watch('logo')

  const onChangeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploadLoading(true)

      const formData = new FormData()
      const target = event.target
      const file: File = (target.files as FileList)[0]

      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
      if (!allowedTypes.includes(file.type)) {
        setFileError('Only image files (jpeg, png, gif) are allowed.')
        setIsUploadLoading(false)
        return
      } else {
        setFileError('')
      }

      formData.append('file', file)

      const res = await axios.post(`${apiUrl}/upload`, formData, {
        withCredentials: false,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })

      const logoUrl = res.data.data.url

      setValue('logo', logoUrl, { shouldValidate: true })
      setIsUploadLoading(false)
    } catch (error) {
      setError('logo', { message: 'Upload failed. Please try again.' })
      setIsUploadLoading(false)
    }
  }

  useEffect(() => {
    if (userId) {
      setValue('user_id', userId)
    }
  }, [userId, setValue])

  const onSubmit = async () => {
    await onFinish(getValues())
    return getValues()
  }

  const handleSaveButtonClick = () => {
    return handleSubmit(onSubmit)()
  }

  return (
    <Edit
      isLoading={formLoading}
      saveButtonProps={{
        ...saveButtonProps,
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick: handleSaveButtonClick
      }}
    >
      <Box component='form' sx={{ display: 'flex', flexDirection: 'column' }} autoComplete='off'>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
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
            <Controller
              control={control}
              name='tags'
              rules={{ required: 'This field is required' }}
              defaultValue={[]}
              render={({ field }) => <CustomTagInput {...field} required control={control} defaultValue={[]} />}
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
              rows={2}
              required
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Controller
              name='content'
              control={control}
              render={({ field }) => (
                <CustomEditor
                  {...register('content', {
                    required: 'This field is required'
                  })}
                  {...field}
                  ref={rteRef}
                  extensions={extensions}
                  content={content}
                  onChange={(newContent) => setValue('content', newContent)}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Stack direction='row' gap={4} flexWrap='wrap' sx={{ marginTop: '16px' }}>
              <label htmlFor='banner-input'>
                <Input id='banner-input' type='file' sx={{ display: 'none' }} onChange={onChangeHandler} />
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
                {fileError && (
                  <Typography variant='caption' color='#fa541c'>
                    {fileError}
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
