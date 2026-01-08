import { Box } from '@mui/material'
import { HomePage } from './components/structures/HomePage'

function App() {
	return (
		<Box sx={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			height: '100%',
			width: '100%',	
			overflow: 'hidden',
			backgroundColor: '#B2D0E1',
			rowGap: '16px'
		}}>
			<HomePage/>
		</Box>
	)
}

export default App
