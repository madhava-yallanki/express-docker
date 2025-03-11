import { createRoot } from 'react-dom/client';
import { App } from './views/App.js';
import '@livekit/components-styles';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(<App />);
