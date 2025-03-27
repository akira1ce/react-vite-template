import { use } from '@/hooks/use';
import { getOverUsersInfo } from '../controller';

export default function CurrentList({ promise }: { promise: ReturnType<typeof getOverUsersInfo> }) {
  const users = use(promise);
  return (
    <div className="space-y-2">
      {users.map((item) => (
        <div key={item.id} className="flex items-center rounded-md border border-gray-200 p-4">
          <img className="h-14 w-14 rounded-full" src={item.thumbnail} alt="" />
          <div className="ml-4 flex-1">
            <div className="font-bold">{item.name}</div>
            <div className="mt-1 line-clamp-1 text-sm text-gray-400">{item.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
