# Frontend - MERN Stack Chat Application

A modern, real-time chat application built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Real-time messaging** with Socket.IO
- **User authentication** with JWT
- **Responsive design** with Tailwind CSS and DaisyUI
- **Dark/light theme** support
- **Profile management** with avatar upload
- **Online status** indicators
- **Type-safe** development with TypeScript

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + DaisyUI
- **State Management**: Zustand
- **Real-time**: Socket.IO Client
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check
```

## 🎯 Development Scripts

- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── skeletons/      # Loading skeleton components
├── pages/              # Page components
├── store/              # Zustand stores
├── lib/               # Utilities and configurations
├── constants/         # Application constants
├── types/             # TypeScript type definitions
└── styles/            # Global styles
```

## 🎨 Theme Configuration

The application supports 32 different themes from DaisyUI. Themes can be changed in the Settings page.

## 🔧 Environment Variables

Create a `.env` file in the frontend root:

```env
VITE_API_URL=http://localhost:5000/api
```

## 🌐 API Integration

The frontend communicates with the backend API through:
- **REST API** for authentication and user management
- **WebSocket** for real-time messaging
- **File upload** for profile pictures

## 📱 Responsive Design

- **Mobile-first** approach
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch-friendly** interfaces for mobile devices

## 🔒 Security Features

- **JWT token** authentication
- **Secure HTTP-only** cookies
- **Input validation** on frontend
- **XSS protection** with React

## 🚀 Deployment

```bash
# Build for production
npm run build

# The dist folder will contain the production build
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
