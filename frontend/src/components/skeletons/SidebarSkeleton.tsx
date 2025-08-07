const SidebarSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 p-2">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-base-200 animate-pulse">
          <div className="w-12 h-12 rounded-full bg-base-300" />
          <div className="hidden lg:block flex-1">
            <div className="h-4 bg-base-300 rounded w-3/4 mb-2" />
            <div className="h-3 bg-base-300 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SidebarSkeleton;