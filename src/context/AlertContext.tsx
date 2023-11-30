import { useState, useEffect, createContext } from 'react'
import Alert, { AlertProps } from '../components/Alert/Alert'

interface AlertContextValues {
  Alerts: () => JSX.Element
  createToast: ({ children, variant }: AlertProps) => void
}

interface AlertContextProviderProps {
  children: React.ReactNode
}

export const AlertContext = createContext<AlertContextValues>({} as AlertContextValues)

export const AlertContextProvider = ({ children }: AlertContextProviderProps) => {
  const [list, setList] = useState<Array<AlertProps>>([])

  const createToast = ({ children, variant }: AlertProps) => {
    setList([...list, { children, variant }]);
  }

  const Alerts = () => (
    <div className='alerts-container'>
      {list.map(alert => (
        <Alert variant={alert.variant} key={alert.children}>{alert.children}</Alert>
      ))}
    </div>
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      setList(prevList => prevList.slice(1));
    }, 3000);

    return () => clearTimeout(timer);
  }, [list]);

  const values = { Alerts, createToast }
  return (
    <AlertContext.Provider value={values}>
      {children}
    </AlertContext.Provider>
  )
}