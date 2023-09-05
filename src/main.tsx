import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import GlobalStyles from './globalStyles';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<>
		<GlobalStyles />
		<App />
	</>
);
