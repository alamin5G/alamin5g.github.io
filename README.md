# Alamin's Portfolio Website

A modern, interactive portfolio website combining static and AI-powered features, deployed on GitHub Pages at [alamin5g.com](https://alamin5g.com).

## Features

### 🏠 Static Portfolio
- Modern, responsive design with dark/light theme toggle
- Interactive sections: Home, About, Skills, Experience, Projects, Education, Certificates, Strengths, Hobbies, Contact
- Smooth animations and transitions
- Project showcases with live demos
- Contact form with references
- Resume download

### 🤖 AI Portfolio
- Interactive terminal interface powered by Gemini AI
- Chat with AI about Alamin's background, skills, and projects
- Command history with arrow key navigation
- Real-time responses about professional experience
- Terminal-style user experience

## Toggle Between Portfolios

Click the toggle button in the top-right corner to switch between:
- **🏠 Static Portfolio**: Traditional portfolio with all sections
- **🤖 AI Portfolio**: Interactive AI chat interface

## Technology Stack

- **Frontend**: React.js, Tailwind CSS
- **AI Integration**: Google Gemini AI API
- **Deployment**: GitHub Pages
- **Build Tool**: Create React App

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/alamin5G/alamin5g.github.io.git
cd alamin5g.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file and add your Gemini AI API key:
```bash
REACT_APP_GEMINI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm start
```

5. Build for production:
```bash
npm run build
```

## Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── AIPortfolio.jsx  # AI chat interface
│   │   └── ...              # Other components
│   ├── styles/              # CSS styles
│   └── App.js               # Main application component
├── public/                  # Static assets
├── ai-portfolio/            # Original AI portfolio files
└── build/                   # Production build files
```

## Contact

- **Email**: alaminvai5g@gmail.com
- **LinkedIn**: [linkedin.com/in/alamin5g](https://linkedin.com/in/alamin5g)
- **GitHub**: [github.com/alamin5g](https://github.com/alamin5g)

---

Built with ❤️ by Md. Alamin