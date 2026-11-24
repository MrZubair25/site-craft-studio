import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootEl = document.getElementById('root')!;
const hasPrerenderedContent = Array.from(rootEl.childNodes).some(
  (node) => node.nodeType === Node.ELEMENT_NODE
);

if (hasPrerenderedContent) {
  hydrateRoot(rootEl, <App />);
} else {
  createRoot(rootEl).render(<App />);
}
