/* 「view」 */

import { useState, Suspense } from 'react';
import { getOverUsersInfo } from './controller';
import List from './components/list';
import Loading from '@/components/Loading';

export default function Page() {
  const [promise] = useState(getOverUsersInfo);

  return (
    <div className="flex w-2/3">
      <div className="m-auto w-1/2">
        <Suspense fallback={<Loading />}>
          <List promise={promise} />
        </Suspense>
      </div>
    </div>
  );
}
