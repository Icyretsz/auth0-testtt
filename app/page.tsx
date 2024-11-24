
import User from './features/auth/components/user';

export default async function Index() {

  return <>
    <a href='api/auth/login'>Login</a>
    <a href='api/auth/logout'>Logout</a>
    <User></User>
  </>
}
