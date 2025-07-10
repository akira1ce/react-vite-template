const Loading = () => {
  return (
    <div className="absolute left-0 top-0 z-10 flex h-screen w-screen">
      <div className="relative m-auto flex flex-col items-center justify-center gap-2">
        <div className="animate-bounce text-lg">Loading...</div>
      </div>
    </div>
  );
};

export default Loading;
