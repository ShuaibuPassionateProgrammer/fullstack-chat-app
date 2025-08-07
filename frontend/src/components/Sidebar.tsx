import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import { useEffect } from "react";

const Sidebar: React.FC = () => {
  const { getUsers, users, isUsersLoading, selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {isUsersLoading ? (
          <SidebarSkeleton />
        ) : (
          <div className="flex flex-col gap-2 p-2">
            {users.map((user) => {
              const isOnline = onlineUsers.includes(user._id);
              const isSelected = selectedUser?._id === user._id;

              return (
                <button
                  onClick={() => setSelectedUser(user)}
                  key={user._id}
                  className={`w-full p-3 flex items-center gap-3 rounded-lg transition-colors
                    ${isSelected ? "bg-base-300 ring-2 ring-primary" : "hover:bg-base-200"}`}
                >
                  <div className="relative mx-auto lg:mx-0">
                    <img
                      src={user.profilePic || "/avatar.png"}
                      alt={user.fullName}
                      className="size-12 object-cover rounded-full"
                    />
                    {isOnline && (
                      <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-base-100" />
                    )}
                  </div>

                  <div className="hidden lg:block text-left flex-1">
                    <div className="font-medium">{user.fullName}</div>
                    <div className="text-sm text-base-content/70">
                      {isOnline ? "Online" : "Offline"}
                    </div>
                  </div>
                </button>
              );
            })}

            {users.length === 0 && (
              <div className="text-center text-base-content/50 py-8">
                No online users
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;