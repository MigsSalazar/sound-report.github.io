import { PureComponent } from "react";
import { ThemedModal } from "./ThemedModal";
import { Box, CircularProgress, Typography } from "@mui/material";

interface Props {
	open: boolean;
}

export class LoadingModal extends PureComponent<Props>{
	render(){
		return (
			<ThemedModal 
				open={this.props.open}
				variant="info"
			>
				<Box sx={{display: 'flex', flexDirection: 'column', width: '100%', flexGrow: 1, alignItems: 'center', justifyContent: 'center', rowGap: '16px'}}>
					<Typography variant='h2'>Loading...</Typography>
					<CircularProgress size={100} />
				</Box>
			</ThemedModal>
		);
	}
}