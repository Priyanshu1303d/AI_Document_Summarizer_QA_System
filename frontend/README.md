# AI Document Summarizer & Q/A System - Frontend

Enterprise-grade Next.js 14 frontend for AI-powered document processing, summarization, and question answering.

## Features

- 📤 **Document Upload**: Drag-and-drop PDF upload with real-time progress tracking
- 💬 **Interactive Chat**: Two-pane chat interface with RAG-powered Q&A
- 📝 **Smart Summaries**: Generate summaries in short, medium, or detailed modes
- 🎨 **Modern UI**: Built with shadcn/ui and TailwindCSS
- ✨ **Smooth Animations**: Framer Motion animations throughout
- 🚀 **Fast & Responsive**: Next.js 14 App Router for optimal performance

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: JavaScript
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: Sonner

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running on `http://localhost:8000`

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
frontend/
├── app/
│   ├── layout.jsx          # Root layout with Navbar
│   ├── page.jsx            # Home page (redirects to /upload)
│   ├── globals.css         # Global styles
│   ├── upload/
│   │   └── page.jsx        # PDF upload page
│   ├── chat/
│   │   └── page.jsx        # Q&A chat interface
│   └── summaries/
│       └── page.jsx        # Document summarization
├── components/
│   ├── Navbar.jsx          # Navigation bar
│   ├── Loader.jsx          # Loading spinner
│   ├── FileDropzone.jsx    # Drag-and-drop uploader
│   ├── ChatInput.jsx       # Chat input component
│   ├── ChatBubble.jsx      # Message bubble component
│   └── ui/                 # shadcn/ui components
│       ├── button.jsx
│       ├── card.jsx
│       ├── input.jsx
│       ├── textarea.jsx
│       └── select.jsx
├── utils/
│   ├── api.js              # API utility functions
│   └── cn.js               # Class name utility
├── public/                 # Static assets
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
├── next.config.js          # Next.js configuration
├── jsconfig.json           # JavaScript configuration
└── package.json            # Dependencies

```

## Backend Integration

The frontend connects to the FastAPI backend at `http://localhost:8000` with the following endpoints:

- `POST /upload` - Upload PDF documents
- `GET /ask?query=` - Ask questions about documents
- `POST /summarize?mode=&content=` - Generate summaries

To change the backend URL, edit `utils/api.js`.

## Features Overview

### Upload Page (`/upload`)
- Drag-and-drop PDF files
- Multiple file upload support
- Real-time upload progress
- Success/error notifications
- File validation (PDF only)

### Chat Page (`/chat`)
- Two-pane interface
- Previous questions sidebar
- Message history
- Typing indicator animation
- Source citations
- Smooth scrolling

### Summaries Page (`/summaries`)
- Textarea for content input
- Mode selection (short/medium/detailed)
- Animated summary display
- Character counter

## Customization

### Changing Colors
Edit `app/globals.css` to modify the color scheme using CSS variables.

### Adding New Pages
1. Create a new folder in `app/`
2. Add a `page.jsx` file
3. Update `components/Navbar.jsx` to include the new route

### Modifying API Endpoints
Edit `utils/api.js` to change endpoint URLs or add new API functions.

## Production Build

To create a production build:

```bash
npm run build
npm start
```

The optimized build will be created in the `.next` directory.

## Troubleshooting

**Issue**: Backend connection errors
- Ensure the FastAPI backend is running on `http://localhost:8000`
- Check CORS settings on the backend

**Issue**: Styling not working
- Run `npm install` to ensure all dependencies are installed
- Clear `.next` cache and rebuild

**Issue**: Upload fails
- Verify file is a valid PDF
- Check backend logs for errors
- Ensure backend `/upload` endpoint is accessible

## License

This project is part of the AI Document Summarizer & Q/A System.
