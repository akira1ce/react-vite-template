const Loading = () => {
  return (
    <div className="flex h-screen w-screen">
      <div className="m-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-loader-circle m-auto mb-4 animate-spin"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        <div>🧟 僵尸正在啃食你的脑子...</div>
      </div>
    </div>
  );
};

export default Loading;
