import { Box, type SxProps, type Theme, Typography } from "@mui/material";
import React from "react";
import {SoundReportLogo} from "../../assets/SoundReportLogo"
import { PushButton } from "../blocks/PushButton";
import { ThemedModal } from "../blocks/ThemedModal";

interface Props {

}

interface State {
	openPage: boolean;
	openComingSoonModal: boolean
}

const TransitionTime = 300;

class _HomePage extends React.Component<Props, State> {

	constructor(props: Props){
		super(props);

		this.state = {
			openPage: true,
			openComingSoonModal: false
		};
	}

	onSlideEnd = () => {
		if(!this.state.openPage){
			setTimeout(() => this.setState({
				openPage: true,
			}), TransitionTime);
		}
	}

	render(){
		return(
			<Box sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				height: '100%',
				width: '100%',
				overflow: 'auto',
				rowGap: '2vh',
				padding: '40px 20%',
			}}>
				<ThemedModal
					open={this.state.openComingSoonModal}
					onClose={() => this.setState({openComingSoonModal: false})}
				>
					Feature coming soon!
				</ThemedModal>
				<Typography variant="h1" textAlign={'center'}>
					Sound<br/>Report
				</Typography>
				<SoundReportLogo height={"15vh"} width={'unset'}/>
				<Box sx={{
					display: 'flex',
					flexDirection: 'column',
					flexGrow: 1,
					rowGap: '2vh'
				}}>
					<PushButton 
						onClick={() => this.setState({openComingSoonModal: true})}
						highlightColor="black"
						width={'fit-content'}
						height={'fit-content'}
						backgroundColor={'#252525ff'}
					>
						<Typography variant="h1" sx={sxStyles.buttonText}>
							New Game
						</Typography>
					</PushButton>
					<PushButton 
						onClick={() => this.setState({openComingSoonModal: true})}
						highlightColor="black"
						width={'fit-content'}
						height={'fit-content'}
						backgroundColor={'#252525ff'}
					>
						<Typography variant="h1" sx={sxStyles.buttonText}>
							Options
						</Typography>
					</PushButton>
					<PushButton 
						onClick={() => this.setState({openComingSoonModal: true})}
						highlightColor="black"
						width={'fit-content'}
						height={'fit-content'}
						backgroundColor={'#252525ff'}
					>
						<Typography variant="h1" sx={sxStyles.buttonText}>
							How to play
						</Typography>
					</PushButton>
				</Box>
				<Box sx={{
					display: 'flex',
					flexDirection: 'row',
					width: '100%',
					justifyContent: 'end'
				}}>
					<PushButton 
						onClick={() => this.setState({openComingSoonModal: true})}
						highlightColor="black"
						width={'fit-content'}
						height={'fit-content'}
						backgroundColor={'#252525ff'}
					>
						<Typography variant="h3" sx={{padding: '1vh', fontSize: '2vh', color: 'white'}}>
							Credits
						</Typography>
					</PushButton>
				</Box>
			</Box>
		)
	}
}

const sxStyles = {
	buttonText: {
		padding: '2vh',
		fontSize: '5vh',
		color: 'white'
	}
} satisfies {[key: string]:SxProps<Theme>};

export const HomePage = _HomePage;