import './PostEditor.css'

interface PostEditorProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}

export default function PostEditor({ onChange, value }: PostEditorProps) {
  return (
    <div className='posteditor-container'>
      <textarea className='posteditor-textarea' value={value} onChange={onChange} />
    </div>
  )
}
