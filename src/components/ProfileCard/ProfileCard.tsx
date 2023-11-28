import './ProfileCard.css'
import AccessTimeFilledOutlinedIcon from '@mui/icons-material/AccessTimeFilledOutlined';
import CreateIcon from '@mui/icons-material/Create';
import { User } from '../../types'

export default function ProfileCard({ user }: { user: User | null }) {
  return (
    <>
      <div className='profile-info-container'>
        <div className='personal-info'>
          <div className='user-avatar'>
            <img src={user?.avatar}></img>
          </div>
          <div>
            <div>

            </div>
            <div className='user-data'>

              <p className='fullname'>{user?.firstname} {user?.lastname}</p>
              {/* <p className="me-username">{user?.username}</p> */}
              <p className='biography'>{user?.biography !== undefined ? user?.biography : 'No existe una biografia...'}</p>

              <div className='personal-awards'>
                <div className='award'>
                  <AccessTimeFilledOutlinedIcon sx={{ fontSize: 40, fontWeight: '200' }} />
                  <div className='award-info'>
                    <p className='award-label'>Miembro hace</p>
                    <p className='award-value'>1 Mes</p>
                  </div>
                </div>
                <div className='award'>
                  <CreateIcon sx={{ fontSize: 40 }} />
                  <div className='award-info'>
                    <p className='award-label'>Publicaciones</p>
                    <p className='award-value'>10</p>
                  </div>
                </div>
              </div>

              <div className='profile-options'>
                <a href={user?.contactUrl} target='_blank' className='profile-btn contact-btn'>Contactar</a>
                <a href='#' target='_blank' className='profile-btn report-btn'>Reportar</a>
              </div>

            </div>
          </div>
        </div>

      </div>
    </>
  )
}
