const MessageSkeleton: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`chat ${i % 2 === 0 ? "chat-start" : "chat-end"}`}>
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <div className="w-full h-full rounded-full bg-base-300 animate-pulse" />
            </div>
          </div>
          <div className="chat-header mb-1">
            <div className="w-20 h-3 bg-base-300 animate-pulse rounded" />
          </div>
          <div className="chat-bubble">
            <div className="w-32 h-4 bg-base-300 animate-pulse rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;