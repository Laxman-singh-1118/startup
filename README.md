# Startup Project with Gemini AI Chatbot & Firebase

This project includes a modern React TypeScript application with an integrated Gemini AI chatbot and Firebase authentication system.

## Features

- 🚀 Modern React TypeScript setup with Vite
- 🤖 Gemini AI-powered chatbot
- 🔐 Firebase Authentication (Login/Signup)
- 💬 Real-time chat interface
- 📊 User Dashboard with exam applications
- 🎨 Beautiful UI with Tailwind CSS
- 📱 Responsive design
- ⚡ Fast development with hot reload

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up Gemini AI API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Create a `.env` file in the root directory
4. Add your API key:

```env
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

### 3. Set up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password)
4. Create a web app and get your config
5. Add Firebase config to your `.env` file:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Authentication Features

- **User Registration**: Create new accounts with email and password
- **User Login**: Secure authentication with Firebase
- **User Dashboard**: Personalized dashboard for logged-in users
- **Profile Management**: Update user information and preferences
- **Secure Logout**: Safe session termination

## Chatbot Features

- **Floating Chat Button**: Click the bot icon in the bottom-right corner to open the chat
- **Real-time Responses**: Powered by Google's Gemini AI model
- **Message History**: View all previous conversations
- **Typing Indicators**: See when the AI is processing your request
- **Responsive Design**: Works on desktop and mobile devices
- **Keyboard Shortcuts**: Press Enter to send messages

## Dashboard Features

- **Overview**: Welcome message and application statistics
- **Applications**: View and manage exam applications
- **Notifications**: Real-time alerts and updates
- **Settings**: Profile and preference management
- **Responsive Design**: Works on all devices

## Project Structure

```
src/
├── components/
│   ├── Chatbot.tsx          # AI chatbot component
│   ├── Login.tsx            # Authentication component
│   ├── Dashboard.tsx        # User dashboard
│   ├── Header.tsx           # Navigation header
│   ├── Hero.tsx             # Hero section
│   ├── ProblemSolution.tsx  # Problem/Solution section
│   ├── HowItWorks.tsx       # How it works section
│   ├── Features.tsx         # Features section
│   ├── Vision.tsx           # Vision section
│   ├── CTA.tsx              # Call to action
│   ├── Contact.tsx          # Contact form
│   └── Footer.tsx           # Footer
├── contexts/
│   └── AuthContext.tsx      # Firebase authentication context
├── firebase/
│   └── config.ts            # Firebase configuration
├── App.tsx                  # Main app component
├── main.tsx                 # App entry point
└── index.css                # Global styles
```

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Google Generative AI** - Gemini AI integration
- **Firebase** - Authentication and database

## API Usage

The chatbot uses the Gemini Pro model for generating responses. Make sure you have:

1. A valid Google AI API key
2. Sufficient API quota for your usage
3. Proper error handling for API rate limits

## Firebase Configuration

The app uses Firebase for:

1. **Authentication**: Email/password login and registration
2. **Firestore**: Database for user data and applications
3. **Storage**: File storage for documents and images

## Customization

You can customize the application by modifying:

- **Authentication**: Update Firebase config and auth methods
- **Dashboard**: Modify the user interface and features
- **Chatbot**: Change AI model and response behavior
- **Styling**: Update Tailwind classes for different themes
- **Features**: Add new functionality to the platform

## Troubleshooting

### Common Issues

1. **API Key Error**: Make sure your `.env` file is in the root directory and contains the correct API keys
2. **Firebase Error**: Verify your Firebase configuration and enable Authentication
3. **TypeScript Errors**: Run `npm install` to ensure all dependencies are installed
4. **Build Errors**: Check that all environment variables are properly set

### Getting Help

If you encounter issues:

1. Check the browser console for error messages
2. Verify your API keys are valid and have sufficient quota
3. Ensure all dependencies are properly installed
4. Check Firebase console for authentication errors

## License

This project is open source and available under the MIT License. 

## Admin Account Creation

### Creating Admin Accounts
To create an admin account, follow these steps:

1. **Sign Up as Admin:**
   - Click "Login / Sign Up" on the website
   - Select "Admin" role
   - Fill in admin details (name, email, password)
   - Click "Create Account"

2. **Security Notes:**
   - Only users explicitly registered as admins can access admin features
   - Admin accounts are stored in Firebase with "(admin)" in the display name
   - Regular users cannot access admin dashboard even if they try to manipulate the interface
   - Admin access is verified on both client and server side

### Admin Features
- **Overview:** Dashboard with total students, applications, and pending reviews
- **Students:** View and manage all student profiles
- **All Applications:** Review and manage all student applications
- **Track Submissions:** Analytics and submission monitoring
- **Push Alerts:** Send notifications to students
- **Settings:** Admin profile and system settings

### Student Features
- **Overview:** Personal dashboard with application statistics
- **My Applications:** View and manage personal applications
- **Upload Documents:** Secure document storage
- **Exam Suggestions:** AI-powered exam recommendations
- **One-Click Submit:** Bulk application to multiple exams
- **Settings:** Personal profile settings 