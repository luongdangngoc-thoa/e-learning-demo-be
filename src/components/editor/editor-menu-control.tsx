import { useTheme } from '@mui/material'
import {
  MenuButtonAddTable,
  MenuButtonBlockquote,
  MenuButtonBold,
  MenuButtonBulletedList,
  MenuButtonCode,
  MenuButtonCodeBlock,
  MenuButtonEditLink,
  MenuButtonHighlightColor,
  MenuButtonHorizontalRule,
  MenuButtonImageUpload,
  MenuButtonItalic,
  MenuButtonOrderedList,
  MenuButtonRedo,
  MenuButtonRemoveFormatting,
  MenuButtonStrikethrough,
  MenuButtonTextColor,
  MenuButtonUndo,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  MenuSelectTextAlign
} from 'mui-tiptap'

export const EditorMenuControls = () => {
  const theme = useTheme()
  return (
    <MenuControlsContainer>
      <MenuSelectHeading />
      <MenuButtonBold />
      <MenuButtonItalic />
      <MenuSelectTextAlign />
      <MenuButtonOrderedList />
      <MenuButtonBulletedList />

      <MenuDivider />
      <MenuButtonBlockquote />
      <MenuDivider />
      <MenuButtonCode />
      <MenuButtonCodeBlock />

      <MenuDivider />
      <MenuButtonStrikethrough />
      <MenuButtonEditLink />

      <MenuDivider />
      <MenuButtonUndo />
      <MenuButtonRedo />
      <MenuButtonHorizontalRule />
      <MenuButtonAddTable />
      <MenuButtonRemoveFormatting />

      <MenuDivider />
      <MenuButtonImageUpload
        onUploadFiles={(files) =>
          // For the sake of a demo, we don't have a server to upload the files
          // to, so we'll instead convert each one to a local "temporary" object
          // URL. This will not persist properly in a production setting. You
          // should instead upload the image files to your server, or perhaps
          // convert the images to bas64 if you would like to encode the image
          // data directly into the editor content, though that can make the
          // editor content very large.
          files.map((file) => ({
            src: URL.createObjectURL(file),
            alt: file.name
          }))
        }
      />

      <MenuDivider />
      <MenuButtonTextColor
        defaultTextColor={theme.palette.text.primary}
        swatchColors={[
          { value: '#000000', label: 'Black' },
          { value: '#ffffff', label: 'White' },
          { value: '#888888', label: 'Grey' },
          { value: '#ff0000', label: 'Red' },
          { value: '#ff9900', label: 'Orange' },
          { value: '#ffff00', label: 'Yellow' },
          { value: '#00d000', label: 'Green' },
          { value: '#0000ff', label: 'Blue' }
        ]}
      />
      <MenuButtonHighlightColor
        swatchColors={[
          { value: '#595959', label: 'Dark grey' },
          { value: '#dddddd', label: 'Light grey' },
          { value: '#ffa6a6', label: 'Light red' },
          { value: '#ffd699', label: 'Light orange' },
          // Plain yellow matches the browser default `mark` like when using Cmd+Shift+H
          { value: '#ffff00', label: 'Yellow' },
          { value: '#99cc99', label: 'Light green' },
          { value: '#90c6ff', label: 'Light blue' },
          { value: '#8085e9', label: 'Light purple' }
        ]}
      />
    </MenuControlsContainer>
  )
}