import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Send, Image } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput: React.FC = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { sendMessage, selectedUser } = useChatStore();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });
      setText("");
      setImagePreview(null);
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  if (!selectedUser) return null;

  return (
    <div className="p-4 border-t border-base-300">
      {imagePreview && (
        <div className="mb-2">
          <div className="relative w-20 h-20">
            <img
              src={imagePreview}
              alt="Preview"
              className="rounded-lg object-cover w-full h-full"
            />
            <button
              onClick={() => setImagePreview(null)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="w-full input input-bordered input-sm"
          />
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <label htmlFor="image-upload" className="btn btn-sm btn-circle">
            <Image className="w-4 h-4" />
          </label>
        </div>
        <button type="submit" className="btn btn-sm btn-circle">
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;