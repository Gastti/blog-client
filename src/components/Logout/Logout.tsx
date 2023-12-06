import './Logout.css'
import Button from '../Button/Button'
import { logout } from '../../services/auth'
import { useSession } from '../../hooks/useSession'

export default function Logout(
  { setOpenModal }: { setOpenModal: React.Dispatch<React.SetStateAction<boolean>> }
) {
  const { setIsAdmin, setIsLogged, setIsWriter, setUser } = useSession()
  const handleConfirm = () => {
    logout()
    setIsAdmin(false)
    setIsLogged(false)
    setIsWriter(false)
    setUser(null)
    setOpenModal(false)
  }

  const handleGoBack = () => {
    setOpenModal(false)
  }

  return (
    <div className='logout-container'>
      <p>¿Deseas cerrar tu sesión?</p>
      <div className='logout-actions'>
        <Button
          onClick={handleConfirm}
          type='button'
          secondary
        >
          Cerrar sesión
        </Button>
        <Button type='button'
          variant='secondary'
          onClick={handleGoBack}
        >
          Volver
        </Button>
      </div>
    </div>
  )
}
