import { TextField, Button } from '@mui/material'
const RegularButton = ({ name, onClick, className }) => {
  return(
    <button className={className} onClick={onClick}>{name} </button>
  )

}

export default RegularButton