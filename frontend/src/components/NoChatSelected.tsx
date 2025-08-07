import { MessageSquare } from "lucide-react";

const NoChatSelected: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
          <MessageSquare className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">Welcome to Chatty</h2>
        <p className="text-base-content/60">
          Select a conversation to start messaging
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;