import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/responsive.css';
import { createApp } from './components/App.js';

const root = document.querySelector('#app');

if (!root) {
  throw new Error('MakerScript root element was not found.');
}

createApp(root);
