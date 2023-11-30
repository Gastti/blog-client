import './Alert.css'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

export type AlertProps = {
  variant: 'success' | 'danger' | 'warning';
  children: string
}

export default function Alert({ variant = 'success', children }: AlertProps) {
  return (
    <div className={`alert ${variant}`}>
      {variant === 'success' ?
        <CheckCircleOutlineOutlinedIcon />
        : variant === 'danger' ?
          <ReportProblemOutlinedIcon />
          : <ErrorOutlineOutlinedIcon />}

      {children}
    </div>
  )
}
