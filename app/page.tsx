import User from './features/auth/components/user';

export default function Index() {


  return <>
    <h1 style={{fontSize : 50}}>This is main page</h1>
    <a href='/api/auth/login'>Login</a>
    <User></User>
  </>
}
