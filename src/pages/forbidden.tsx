import { Lock } from 'lucide-react';
import { Link } from 'react-router';

const Forbidden = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
        <Lock className="mb-10 size-32 font-bold text-blue-500" />
        <div className="text-center text-2xl text-gray-500">Forbidden</div>
        <Link className="text-gray-400 underline" to={'/'}>
          Back home
        </Link>
      </div>
  );
};

export default Forbidden;
