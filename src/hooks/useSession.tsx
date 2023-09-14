import { useContext } from 'react';
import { SessionContext } from '../context/SessionContext';

const useSession = () => {
  const context = useContext(SessionContext)
  return context
}

export { useSession }