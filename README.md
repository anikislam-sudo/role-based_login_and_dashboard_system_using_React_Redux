# finobytes

A modern React application built with Vite.

## 🚀 Features

- ⚡ **Vite** - Fast build tool and development server
- ⚛️ **React 18** - Latest React with modern hooks
- 🎨 **Tailwind** - Styling framework
- 🛣️ **React Router** - Client-side routing

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🛠️ Installation

1. Navigate to the project directory:

   ```bash
   cd finobytes
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## 🏃‍♂️ Running the Application

### Development Mode

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

````
finobytes/
│
├── public/                 # Static assets served directly
│   └── vite.svg
│
├── src/
│   ├── assets/             # Images, icons, SVGs, fonts
│   │   └── react.svg
│   │
│   ├── components/         # Reusable UI components
│   │   ├── Auth/           # Auth related components
│   │   │   └── AuthCard.jsx
│   │   ├── Layout.jsx
│   │   └── Loader.jsx
│   │
│   ├── pages/              # Page-level components
│   │   ├── Dashboard/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── MemberDashboard.jsx
│   │   │   └── MerchantDashboard.jsx
│   │   │
│   │   ├── Login/
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── MemberLogin.jsx
│   │   │   └── MerchantLogin.jsx
│   │   │
│   │   └── Register/
│   │       ├── AdminRegister.jsx
│   │       ├── MemberRegister.jsx
│   │       └── MerchantRegister.jsx
│   │
│   ├── redux/              # Redux store setup
│   │   ├── slices/
│   │   │   ├── authSlice.js
│   │   │   ├── dataSlice.js
│   │   │   └── loaderSlice.js
│   │   └── store/
│   │       └── index.js
│   │
│   ├── routes/             # React-router components
│   │   └── ProtectedRoute.jsx
│   │
│   ├── hooks/              # Custom hooks
│   │
│   ├── utils/              # Utility functions
│   │
│   ├── data/               # Static data or JSON files
│   │   └── dummyData.json
│   │
│   ├── App.jsx             # Root component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
│
├── package.json
└── vite.config.js


## 🎨 Styling

This project uses **Tailwind** for styling:

- Classes are available globally
- Configuration in `vite.config.js`
- Customize in `src/index.css`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint (if configured)

## 🚀 Deployment

### Vercel
```bash
npm install -g vercel
vercel --prod
````

### Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🎯 Next Steps

1. **Add Components**: Start building your app components
2. **Set up Routing**: Add more routes in main.jsx
3. **Configure API**: Set up your API endpoints if using Axios
4. **Add State Management**: Implement Redux/Zustand if needed
5. **Deploy**: Deploy to your preferred hosting service

---

Built using React + Vite
