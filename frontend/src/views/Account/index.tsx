import React from 'react';

import PageLayout from '@/layout/PageLayout';
import RegisterAccount from './Components/RegisterAccount';

const Account = () => {
  // const router = useRouter();

  return (
    <PageLayout>
      <div>My account</div>
      <RegisterAccount />
    </PageLayout>
  );
};

export default Account;
