// this is an example of how to import the containers but adding our own HTML versions of the presentational component part

// this will give you a function where you need to pass in the presentational componet as an arg before it gives you your connected conatiners coomponents
import { CreateContainer } from 'futsalNative/js/login-register'
import LoginRegisterPresentational from 'futsalNative/www/login-register'
const LoginRegister = CreateContainer(LoginRegisterPresentational)

// OR...

// this will give you the the conatiner attached to the default presentational component
import LoginRegisterContainer from 'futsalNative/js/login-register'

