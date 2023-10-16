import { useNavigate, useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

function NotFound() {
  const error = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      {/* history means go back to previous. if navigate(-1) is passed in navigate method of  react router dom  it takes to prev page. */}
      <LinkButton to="history">&larr; Go back</LinkButton>
    </div>
  );
}

export default NotFound;
