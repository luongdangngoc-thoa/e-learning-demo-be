'use client'

import { type EditorOptions } from '@tiptap/core'
import { LinkBubbleMenu, RichTextEditor, type RichTextEditorRef, TableBubbleMenu } from 'mui-tiptap'
import React, { useEffect, useState } from 'react'

import { EditorMenuControls } from './editor-menu-control'

interface CustomEditorProps extends Omit<React.ComponentProps<typeof RichTextEditor>, 'extensions'> {
  extensions: EditorOptions['extensions']
  content?: string
  onChange: (content: string) => void
}

export const CustomEditor = React.forwardRef<RichTextEditorRef, CustomEditorProps>(
  ({ extensions, content, onChange, ...props }, ref) => {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
      setIsClient(typeof window !== 'undefined' && typeof navigator !== 'undefined')
    }, [])

    useEffect(() => {
      if (!isClient) return

      const refParsed = ref as unknown as React.MutableRefObject<RichTextEditorRef>
      const { editor } = refParsed.current

      if (editor) {
        const handleUpdate = () => onChange(editor.getHTML())

        editor.on('update', handleUpdate)
        editor.commands.setContent(content || '')

        // Save the current cursor position
        const { from, to } = editor.state.selection
        // Restore the cursor position
        editor.commands.setTextSelection({ from, to })
        return () => {
          editor.off('update', handleUpdate)
        }
      }
    }, [ref, onChange, content, isClient])

    if (!isClient) {
      return null // Or a loading spinner, fallback content, etc.
    }

    return (
      <RichTextEditor
        ref={ref}
        extensions={extensions}
        content={content}
        renderControls={() => <EditorMenuControls />}
        {...props}
      >
        {() => (
          <>
            <LinkBubbleMenu />
            <TableBubbleMenu />
          </>
        )}
      </RichTextEditor>
    )
  }
)
