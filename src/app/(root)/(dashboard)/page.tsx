
import { getUser } from '@/actions/user_actions';
import Client from './_components/Client';
import Freelancer from './_components/Freelancer';
import { fetchAllProjects } from '@/actions/project_actions';
import Loader from '@/components/Loader';

const LandingPage: React.FC = async() => {

  const [ userData, projectsData ] = await Promise.all([ getUser(), fetchAllProjects()])

  if (!userData || !projectsData) return <div className="text-center text-red-500">{<Loader/>}</div>;
  
  return (
    <>
      {userData.user.role === 'freelancer' ? <Freelancer projects = {projectsData}/> : <Client />}
    </>
  );
};

export default LandingPage;
