const Forbidden = () => {
  return (
    <>
      <div className="flex h-full w-full items-center justify-center gap-4">
        <div className="text-center text-3xl font-bold">403</div>
        <div className="text-center text-xl text-gray-500">无权限</div>
      </div>
    </>
  );
};

export default Forbidden;
