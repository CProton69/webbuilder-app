# Page Builder Pro - App.js Documentation

This document explains how to use the `App.js` file as a standalone React application entry point for the Page Builder Pro.

## Overview

The `App.js` file provides a traditional React application structure that can run independently of Next.js while maintaining all the functionality of the Page Builder Pro. This allows you to:

- Run the application as a standalone React app
- Deploy to platforms that don't support Next.js
- Use traditional React development tools
- Integrate with existing React projects

## File Structure

```
/home/z/my-project/
├── App.js                    # Main React application component
├── index.js                  # Application entry point and bootstrap
├── public/
│   ├── index.html           # HTML template for standalone app
│   ├── manifest.json        # PWA manifest
│   └── service-worker.js    # Service worker for offline support
├── src/
│   ├── app/
│   │   ├── page.tsx         # Main page builder component
│   │   ├── layout.tsx       # Next.js layout (not used in standalone mode)
│   │   └── globals.css      # Global styles
│   ├── components/          # All UI and page builder components
│   ├── hooks/              # Custom React hooks
│   └── lib/                # Utility functions and configurations
└── package.json            # Updated with React scripts
```

## Prerequisites

Ensure you have the following dependencies installed:

```bash
# Install React Scripts for standalone React development
npm install react-scripts @types/react-scripts

# Install React Router for navigation
npm install react-router-dom @types/react-router-dom

# Install other required dependencies
npm install @types/react @types/react-dom
```

## Running the Application

### Development Mode

```bash
# Start the development server
npm run react

# Or using the long form
npm run react-scripts start
```

The application will be available at `http://localhost:3000`

### Production Build

```bash
# Build the application for production
npm run react:build

# Or using the long form
npm run react-scripts build
```

The built files will be in the `build/` directory.

### Testing

```bash
# Run tests
npm run react:test

# Or using the long form
npm run react-scripts test
```

## Key Components

### App.js

The main application component that handles:

- **Routing**: Uses React Router for navigation between different pages
- **Theme Management**: Integrates with next-themes for dark/light mode support
- **Error Handling**: Includes error boundary for graceful error handling
- **Loading States**: Shows loading indicators during app initialization
- **PWA Support**: Progressive Web App capabilities

### index.js

The entry point that handles:

- **Application Bootstrap**: Initializes global configurations
- **Service Worker Registration**: Enables PWA functionality
- **Error Handling**: Global error and promise rejection handling
- **HMR Support**: Hot Module Replacement for development

### LandingPage Component

A welcome screen that showcases:

- **Feature Highlights**: Key capabilities of the Page Builder
- **Call-to-Action**: Buttons to start building or learn more
- **Statistics**: Impressive numbers about the application
- **Responsive Design**: Works on all device sizes

## Routes

The application includes the following routes:

| Path | Component | Description |
|------|-----------|-------------|
| `/` | PageBuilder | Main drag-and-drop page builder interface |
| `/templates` | TemplatesPage | Template management and browsing |
| `/preview` | PreviewPage | Live preview of built pages |
| `/how-to` | HowToPage | User guide and documentation |
| `/settings` | SettingsPage | Application settings and preferences |
| `/examples/websocket` | WebSocketExample | WebSocket functionality demonstration |

## Features

### 1. **Progressive Web App (PWA)**
- Offline functionality
- Installable on desktop and mobile
- Push notifications support
- Service worker for caching

### 2. **Responsive Design**
- Mobile-first approach
- Touch-friendly interface
- Adaptive layouts for all screen sizes

### 3. **Theme Support**
- Light and dark mode
- System theme detection
- Smooth theme transitions

### 4. **Error Handling**
- Graceful error boundaries
- Global error tracking
- User-friendly error messages

### 5. **Performance Optimizations**
- Code splitting
- Lazy loading
- Image optimization
- Caching strategies

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Application Configuration
REACT_APP_NAME=Page Builder Pro
REACT_APP_VERSION=1.0.0
REACT_APP_ENVIRONMENT=development

# API Configuration
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_WS_URL=ws://localhost:3000

# Analytics (optional)
REACT_APP_GA_TRACKING_ID=UA-XXXXXXXXX-X
```

### Customization

You can customize the application by modifying:

1. **Theme Colors**: Update the CSS variables in `src/app/globals.css`
2. **Widget Library**: Add/remove widgets in `src/app/page.tsx`
3. **Routes**: Modify route configuration in `App.js`
4. **Features**: Enable/disable features in the app config

## Deployment

### Static Hosting

```bash
# Build the application
npm run react:build

# Deploy the build/ directory to any static hosting service
# Examples: Netlify, Vercel, GitHub Pages, AWS S3
```

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run react:build

FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Integration with Existing Projects

### As a React Component

```jsx
import { App } from './path/to/App';

function YourApp() {
  return (
    <div>
      <YourExistingContent />
      <App />
    </div>
  );
}
```

### As a Micro-frontend

```jsx
// In your host application
import { loadMicrofrontend } from './micro-frontend-loader';

function App() {
  return (
    <div>
      <h1>Your Application</h1>
      <div id="page-builder-container"></div>
    </div>
  );
}

// Load the Page Builder Pro micro-frontend
loadMicrofrontend('page-builder-container', 'http://localhost:3000');
```

## Development Workflow

### 1. **Setup**
```bash
# Clone the repository
git clone <repository-url>
cd page-builder-pro

# Install dependencies
npm install

# Install additional React dependencies
npm install react-scripts react-router-dom @types/react-router-dom
```

### 2. **Development**
```bash
# Start development server
npm run react

# The app will open at http://localhost:3000
```

### 3. **Building**
```bash
# Create production build
npm run react:build

# The build will be in the build/ directory
```

### 4. **Testing**
```bash
# Run tests
npm run react:test

# Run with coverage
npm run react:test -- --coverage
```

## Troubleshooting

### Common Issues

1. **Module Not Found Errors**
   - Ensure all dependencies are installed
   - Check import paths in component files

2. **CSS Loading Issues**
   - Verify CSS imports are correct
   - Check Tailwind CSS configuration

3. **Routing Problems**
   - Ensure React Router is properly configured
   - Check route definitions in App.js

4. **Build Failures**
   - Check TypeScript errors
   - Verify all imports are correct

### Debug Mode

Add debug flags to environment variables:

```env
REACT_APP_DEBUG=true
REACT_APP_VERBOSE_LOGGING=true
```

## Support

For issues and questions:

1. **Documentation**: Check this README and inline code comments
2. **Issues**: Create an issue in the project repository
3. **Discussions**: Join community discussions
4. **Email**: Contact the development team

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

**Note**: This App.js implementation provides a standalone React version of the Page Builder Pro while maintaining compatibility with the Next.js version. You can switch between Next.js and standalone React modes depending on your deployment needs.