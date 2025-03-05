import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";


const HomePage = () => {
    const { selectedUser } = useChatStore();

    return (
        <div>
            <h1>Homepage</h1>
        </div>
    )
}

export default HomePage
