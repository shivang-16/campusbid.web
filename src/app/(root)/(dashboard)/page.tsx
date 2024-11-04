
import { getUser } from '@/actions/user_actions';
import Client from './_components/Client';
import Freelancer from './_components/Freelancer';

const LandingPage: React.FC = async() => {

  const {user} = await getUser()
  
  return (
    <>
      {user.role === 'freelancer' ? <Freelancer /> : <Client />}
    </>
  );
};

export default LandingPage;
