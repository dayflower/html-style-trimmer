import './app.postcss';
import App from './App.svelte';

const target = document.getElementById('app');
if (target == null) {
  throw new Error('cannot find #app');
}

const app = new App({
  target,
});

export default app;
