/* 「view」 */

import { useState, Suspense } from 'react';
import { getOverUsersInfo } from './controller';
import List from './components/list';
import Loading from '@/components/loading';

export default function Page() {
  const [promise] = useState(getOverUsersInfo);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="w-1/2">
        <Suspense fallback={<Loading />}>
          <List promise={promise} />
        </Suspense>
      </div>
    </div>
  );
}
