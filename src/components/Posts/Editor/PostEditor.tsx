import './PostEditor.css'

interface PostEditorProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function PostEditor({ onChange }: PostEditorProps) {
  return (
    <div className='posteditor-container'>
      <textarea className='posteditor-textarea' onChange={onChange} />
    </div>
  )
}
