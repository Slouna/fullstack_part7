import { Alert } from '@mui/material'

const Notification = ({ message, success }) => {
  if (message === null) {
    return null
  }
  if (success){
    return(
      <Alert style={{ marginTop: 10, marginBottom: 10 }} severity={'success'}>
        {message}
      </Alert>
    )
  } else{
    return(
      <Alert style={{ marginTop: 10, marginBottom: 10 }} severity={'error'}>
        {message}
      </Alert>
    )
  }



}
export default Notification