import './PostFullViewSkeleton.css'

export default function PostFullViewSkeleton() {
  return (
    <div className='pfv-skeleton'>
      <div className="pfv-sk-title skeleton"></div>
      <div className="pfv-sk-date skeleton"></div>
      <div className="pfv-sk-cover skeleton"></div>
      <div className="pfv-sk-tags">
        <span className='skeleton'></span>
        <span className='skeleton'></span>
        <span className='skeleton'></span>
      </div>
      <div className="pfv-sk-content">
        <p className='skeleton'></p>
        <p className='skeleton'></p>
        <p className='skeleton'></p>
        <p className='skeleton'></p>
        <p className='skeleton'></p>
        <p className='skeleton'></p>
        <p className='skeleton'></p>
        <p className='skeleton'></p>
      </div>
      <div className="pfv-sk-author">
        <div className="pfv-sk-author-avatar skeleton"></div>
        <div className="pfv-sk-author-data">
          <div className="pfv-sk-author-name skeleton"></div>
          <div className="pfv-sk-author-username skeleton"></div>
        </div>
      </div>
    </div>
  )
}
