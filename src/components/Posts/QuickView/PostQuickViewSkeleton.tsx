import './PostQuickViewSkeleton.css'

export default function PostQuickViewSkeleton() {
  return (
    <div className='pqv-skeleton skeleton'>
      <div className='pqv-skeleton-cover skeleton'></div>
      <div className='pqv-skeleton-content'>
        <h4 className='skeleton'></h4>
        <p className='skeleton'></p>
        <p className='skeleton'></p>
      </div>
    </div>
  )
}
