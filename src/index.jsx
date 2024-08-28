import React from 'react';
import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view'; 
import 'bootstrap/dist/css/bootstrap.min.css'; // Added import for Bootstrap styles

const App = () => <MainView />;
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
