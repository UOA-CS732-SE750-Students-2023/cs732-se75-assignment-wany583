import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { apiPost , auth } from './Service'


// Login page
const LoginPage = ({message, setMessage}) => {
  const defaultUser = {
    email: '',
    password: '',
  }
  const navigate = useNavigate()

  const [user, setUser] = useState(defaultUser)

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const authUser = user => apiPost('api/login', user)
  .then(res => {
    res.data && localStorage.setItem('email', res.data.result.email)
    res.data && localStorage.setItem('token', res.data.result.token)
    setMessage(res.message ? 'Request failed with status code 401' : 'login')
  })

return (
  <>
  <Box sx={{ mx: "auto", maxWidth: { xs: 1200, md: 2000 }, flexGrow: 1 }}>
  <AppBar position="static">
    <Toolbar>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ display: { xs: 'none', sm: 'block' } }}
      >
        Product Management
      </Typography>
    </Toolbar>
  </AppBar>
</Box>

<Box sx={{}}>
      {!auth() ?
        <>
          <Box sx={{ mx: 'auto', width: 500 }}> <h3>Log in</h3></Box>
          <Box
            sx={{
              mx: 'auto',
              display: 'flex',
              flexDirection: 'column',
              width: 500,
              maxWidth: '100%',
            }}>
            <TextField
              inputProps={{
                autoComplete: 'new-password',
                form: {
                  autoComplete: 'off',
                },
              }}
              name='email'
              label='Email'
              id="margin-dense1"
              margin="dense"
              onChange={e => handleChange(e)}
            />
            <TextField
              inputProps={{
                autoComplete: 'new-password',
                form: {
                  autoComplete: 'off',
                },
              }}
              name='password'
              label='Password'
              type="password"
              id="margin-dense2"
              margin="dense"
              onChange={e => handleChange(e)}
            />
            <Button type='submit' onClick={() => authUser(user)}>
              Log In
            </Button>
          </Box>
        </>
        :
        navigate("./products")
      }
    </Box>
   </>
  )
}

export default LoginPage