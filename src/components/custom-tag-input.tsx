import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import * as React from 'react'
import { forwardRef, useEffect, useState } from 'react'
import { useController, type UseControllerProps } from 'react-hook-form'

interface ChipData {
  key: number
  label: string
  gradient: string
}

interface CustomTagInputProps extends UseControllerProps {
  data?: ChipData[]
  required: boolean
}

const colors = ['#e64337', '#e6af37', '#43cc5f', '#40adaa', '#4063ad', '#5240ad', '#9740ad', '#ad4040']

function getRandomGradient() {
  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
}

const CustomTagInput = forwardRef<HTMLInputElement, CustomTagInputProps>(
  ({ required, name, control, rules, defaultValue }, ref) => {
    const {
      field: { value, onChange },
      fieldState: { error }
    } = useController({ name, control, rules, defaultValue })

    const [chipData, setChipData] = useState<ChipData[]>(value || defaultValue || [])
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
      if (value && value.length > 0) {
        setChipData(value)
      }
    }, [value])

    const handleDelete = (chipToDelete: ChipData) => () => {
      const updatedChips = chipData.filter((chip) => chip.key !== chipToDelete.key)
      setChipData(updatedChips)
      onChange(updatedChips)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === ',' || event.key === 'Enter') {
        event.preventDefault()
        const trimmedInputValue = inputValue.trim()
        if (trimmedInputValue) {
          const newChip = { key: chipData.length, label: trimmedInputValue, gradient: getRandomGradient() }
          const updatedChips = [...chipData, newChip]
          setChipData(updatedChips)
          onChange(updatedChips)
          setInputValue('')
        }
      }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value)
    }

    return (
      <Box sx={{ width: '100%' }}>
        <TextField
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder='Enter a tag and press comma'
          variant='outlined'
          fullWidth
          sx={{ mt: 2 }}
          label={'Tags'}
          required={required}
          InputProps={{
            startAdornment: chipData.map((data) => (
              <Chip
                key={data.key}
                label={data.label}
                onDelete={handleDelete(data)}
                style={{ background: data.gradient, color: 'white', marginRight: 4 }}
              />
            )),
            inputRef: ref
          }}
          error={!!error}
          helperText={error ? error.message : null}
        />
      </Box>
    )
  }
)

export default CustomTagInput
