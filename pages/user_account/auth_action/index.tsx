import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAuth, applyActionCode, checkActionCode } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/firebase_config';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Action = () => {
  const router = useRouter();
  const { oobCode } = router.query;
  const [message, setMessage] = useState('');
  useEffect(() => {
    if (oobCode) {
      handleApplyActionCode(oobCode as string);
    }
  }, [oobCode]);
  const handleApplyActionCode = async (oobCode: string) => {
    try {
      await checkActionCode(auth, oobCode);
      await applyActionCode(auth, oobCode);
      setMessage('Email address has been successfully verified.');
    } catch (error) {
      console.error('Error applying action code:', error);
      setMessage('Failed to verify email address.');
    }
  };
  return (
    <div>
      <h1>Action Code Handler</h1>
      <p>{message}</p>
    </div>
  );
}
export default Action;
