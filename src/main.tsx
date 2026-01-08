import DoDisturbIcon from '@mui/icons-material/DoDisturb'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { theme } from './assets/muiTheme.ts'
import { ErrorHandlingProvider } from './components/contexts/errorHandling.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<SnackbarProvider
			maxSnack={5}
			iconVariant={{error: <DoDisturbIcon style={{marginInlineEnd: '8px'}}/>}}
		>
			<ErrorHandlingProvider>
				<ThemeProvider theme={theme}>
					<CssBaseline/>
					<App />
				</ThemeProvider>
			</ErrorHandlingProvider>
		</SnackbarProvider>
	</StrictMode>,
)
