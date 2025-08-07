export interface User {
  _id: string;
  fullName: string;
  email: string;
  profilePic?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  text?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  onlineUsers: string[];
  socket: any;
  signup: (credentials: SignupCredentials) => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profilePic: string) => Promise<void>;
  checkAuth: () => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export interface ChatState {
  selectedUser: User | null;
  messages: Message[];
  users: User[];
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  setSelectedUser: (user: User | null) => void;
  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  sendMessage: (messageData: SendMessageData) => Promise<void>;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
}

export interface ThemeState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export interface SignupCredentials {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SendMessageData {
  text?: string;
  image?: string;
  receiverId: string;
}