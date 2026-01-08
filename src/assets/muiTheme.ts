import { createTheme } from "@mui/material";


export const theme = createTheme({
	typography: {
		fontFamily: 'Helvetica, Arial, Univers, sans-serif',
		h1: {
			fontFamily: 'Helvetica',
			fontSize: '8vh',
			//background: 'linear-gradient(to bottom, #FF0000, #b30000)',
			//border: '4px solid #000000',
			//padding: '10px',
			//textShadow: '-4px 4px 0px #000000',
			color: 'black',
			//fontWeight: 'bolder',
			textTransform: 'uppercase',
			width: 'fit-content'
		},
		h2: {
			fontSize: '1.5rem',
			color: '#000000',
			textTransform: 'uppercase',
		},
		h3: {
			fontSize: '1rem',
			color: '#000000'
		},
	},
	components: {
		MuiTextField: {
			defaultProps: {
				variant: "filled",
				InputProps:{
					sx: {
						borderRadius: 0,
						padding: '0 16px'
					}
				}
			}
		}
	}
})