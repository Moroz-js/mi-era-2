'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { useCallback, useState } from 'react';
import ImageUpload from './ImageUpload';

interface TipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
  onImageUpload?: () => void;
  placeholder?: string;
}

export default function TipTapEditor({
  content,
  onChange,
  onImageUpload,
  placeholder = 'Start writing...',
}: TipTapEditorProps) {
  const [showImageUploadModal, setShowImageUploadModal] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[400px] max-w-none p-4',
      },
    },
  });

  const handleImageUploadSuccess = useCallback((url: string) => {
    if (editor) {
      editor.chain().focus().setImage({ src: url }).run();
      setShowImageUploadModal(false);
    }
  }, [editor]);

  const addImage = useCallback(() => {
    if (onImageUpload) {
      onImageUpload();
    } else {
      // Show upload modal
      setShowImageUploadModal(true);
    }
  }, [onImageUpload]);

  const setLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="relative">
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        {/* Toolbar */}
        <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
          {/* Text Formatting */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              editor.isActive('bold')
                ? 'bg-brand-violet text-white'
                : 'bg-white hover:bg-gray-100 text-gray-700'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            title="Bold (Ctrl+B)"
          >
            <strong>B</strong>
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              editor.isActive('italic')
                ? 'bg-brand-violet text-white'
                : 'bg-white hover:bg-gray-100 text-gray-700'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            title="Italic (Ctrl+I)"
          >
            <em>I</em>
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              editor.isActive('strike')
                ? 'bg-brand-violet text-white'
                : 'bg-white hover:bg-gray-100 text-gray-700'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            title="Strikethrough"
          >
            <s>S</s>
          </button>

          <div className="w-px bg-gray-300 mx-1" />

          {/* Headings */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              editor.isActive('heading', { level: 1 })
                ? 'bg-brand-violet text-white'
                : 'bg-white hover:bg-gray-100 text-gray-700'
            }`}
            title="Heading 1"
          >
            H1
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              editor.isActive('heading', { level: 2 })
                ? 'bg-brand-violet text-white'
                : 'bg-white hover:bg-gray-100 text-gray-700'
            }`}
            title="Heading 2"
          >
            H2
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              editor.isActive('heading', { level: 3 })
                ? 'bg-brand-violet text-white'
                : 'bg-white hover:bg-gray-100 text-gray-700'
            }`}
            title="Heading 3"
          >
            H3
          </button>

          <div className="w-px bg-gray-300 mx-1" />

          {/* Lists */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              editor.isActive('bulletList')
                ? 'bg-brand-violet text-white'
                : 'bg-white hover:bg-gray-100 text-gray-700'
            }`}
            title="Bullet List"
          >
            • List
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              editor.isActive('orderedList')
                ? 'bg-brand-violet text-white'
                : 'bg-white hover:bg-gray-100 text-gray-700'
            }`}
            title="Numbered List"
          >
            1. List
          </button>

          <div className="w-px bg-gray-300 mx-1" />

          {/* Blockquote */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              editor.isActive('blockquote')
                ? 'bg-brand-violet text-white'
                : 'bg-white hover:bg-gray-100 text-gray-700'
            }`}
            title="Blockquote"
          >
            &ldquo;&rdquo;
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              editor.isActive('codeBlock')
                ? 'bg-brand-violet text-white'
                : 'bg-white hover:bg-gray-100 text-gray-700'
            }`}
            title="Code Block"
          >
            {'</>'}
          </button>

          <div className="w-px bg-gray-300 mx-1" />

          {/* Link */}
          <button
            type="button"
            onClick={setLink}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              editor.isActive('link')
                ? 'bg-brand-violet text-white'
                : 'bg-white hover:bg-gray-100 text-gray-700'
            }`}
            title="Add Link"
          >
            🔗
          </button>

          {/* Image */}
          <button
            type="button"
            onClick={addImage}
            className="px-3 py-1 rounded text-sm font-medium bg-white hover:bg-gray-100 text-gray-700 transition-colors"
            title="Add Image"
          >
            🖼️
          </button>

          <div className="w-px bg-gray-300 mx-1" />

          {/* Undo/Redo */}
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            className="px-3 py-1 rounded text-sm font-medium bg-white hover:bg-gray-100 text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Undo (Ctrl+Z)"
          >
            ↶
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            className="px-3 py-1 rounded text-sm font-medium bg-white hover:bg-gray-100 text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Redo (Ctrl+Y)"
          >
            ↷
          </button>

          <div className="w-px bg-gray-300 mx-1" />

          {/* Clear Formatting */}
          <button
            type="button"
            onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
            className="px-3 py-1 rounded text-sm font-medium bg-white hover:bg-gray-100 text-gray-700 transition-colors"
            title="Clear Formatting"
          >
            ✕
          </button>
        </div>

        {/* Editor Content */}
        <EditorContent editor={editor} />
      </div>

      {/* Image Upload Modal */}
      {showImageUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Upload Image</h3>
            
            <ImageUpload
              onUploadSuccess={handleImageUploadSuccess}
              onUploadError={(error) => {
                console.error('Image upload error:', error);
              }}
            />

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowImageUploadModal(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
