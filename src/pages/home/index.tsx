import { useState, Suspense } from 'react';
import { getOverUsersInfo } from './controller';
import List from './components/list';

export default function Page() {
  const [promise] = useState(getOverUsersInfo);

  return (
    <div className="flex">
      <div className="m-auto w-1/2">
        <Suspense fallback={'loading...'}>
          <List promise={promise} />
        </Suspense>
      </div>
    </div>
  );
}
