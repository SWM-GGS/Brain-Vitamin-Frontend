import { useNavigate } from 'react-router';
import { setFirstRun } from '../utils/firstRun';

function FontSizeSet() {
  const navigate = useNavigate();
  setTimeout(() => {
    setFirstRun();
    navigate('/phoneNumberSet');
  }, 2000);
  return <>FontSizeSet</>;
}

export default FontSizeSet;
