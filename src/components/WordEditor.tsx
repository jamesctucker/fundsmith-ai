import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";

const WordEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    editorProps: {
      attributes: {
        class: "prose prose-sm text-neutral p-6 focus:outline-none",
      },
    },
    content: "<p>Hello World! 🌎️</p>",
  });

  // TODO: save changes when editor loses focus

  return (
    <div className="word-editor">
      {/* toolbar */}
      {editor && (
        <div className="toolbar p-4 border-b border-primary">
          <div className="button-row space-x-2">
            <button
              className="p-2 hover:bg-base-200"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
              Underline
            </button>
            <button
              className="p-2 hover:bg-base-200"
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              Bold
            </button>
            <button
              className="p-2 hover:bg-base-200"
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              Italic
            </button>
            {/* h1 */}
            <button
              className="p-2 hover:bg-base-200"
              onClick={() =>
                editor.chain().focus().setHeading({ level: 1 }).run()
              }
            >
              H1
            </button>
            {/* h2 */}
            <button
              className="p-2 hover:bg-base-200"
              onClick={() =>
                editor.chain().focus().setHeading({ level: 2 }).run()
              }
            >
              H2
            </button>
            {/* h3 */}
            <button
              className="p-2 hover:bg-base-200"
              onClick={() =>
                editor.chain().focus().setHeading({ level: 3 }).run()
              }
            >
              H3
            </button>
          </div>
        </div>
      )}

      <EditorContent editor={editor} />
    </div>
  );
};

export default WordEditor;
