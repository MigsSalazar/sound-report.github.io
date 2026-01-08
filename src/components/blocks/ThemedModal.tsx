import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { Box, Card, Dialog, Slide, type SlideProps, Typography } from "@mui/material";
import { PureComponent, type ReactNode } from "react";
import type { MessageType } from "../contexts/errorHandling";
import { PushButton } from "./PushButton";
import React from 'react';
import type { TransitionProps } from '@mui/material/transitions';

interface Props {
	variant?: MessageType;
	open: boolean;
	children: ReactNode;
	direction?: SlideProps['direction'];
	onClose?: () => void;
}
const Transition = React.forwardRef((
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
) => {
	return <Slide direction="up" ref={ref} {...props} />;
});

export class ThemedModal extends PureComponent<Props> {
	
	getIcon = (type: MessageType) => {
		switch(type){
			case "info": return <InfoOutlinedIcon sx={{color: this.getStatusFontColor(type)}} />
			case "error": return <BlockOutlinedIcon sx={{color: this.getStatusFontColor(type)}} />
			case "warning": return <WarningAmberOutlinedIcon sx={{color: this.getStatusFontColor(type)}} />
			case "success": return <CheckCircleOutlinedIcon sx={{color: this.getStatusFontColor(type)}} />
			default: return <></>
		}
	}

	getStatusBackgroundColor = (type: MessageType) => {
		switch(type){
			case "info": return 'blue';
			case "error": return 'red';
			case "warning": return 'yellow';
			case "success": return 'green';
			default: return 'purple';
		}
	}

	getStatusFontColor = (type: MessageType) => {
		switch(type){
			case "warning": return 'black';
			case "info":
			case "error":
			case "success":
			default: return 'white';
		}
	}

	render(){
		const modalVariant = this.props.variant || 'info';
		return (
			<Dialog 
				open={this.props.open}
				fullScreen
				fullWidth
				slots={{transition: Transition}}
				slotProps={{
					paper: {
						sx: {
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							width: '60%',
							height: '40%'
						}
					}
				}}
			>
				<Box sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					height: '-webkit-fill-available'
				}}>
					<Card sx={{
						display: 'flex',
						flexDirection: 'column',
						width: '100%',
						height: '100%',
						borderRadius: '0',
						border: '2px solid black',
						backgroundColor: '#B2D0E1'
					}}>
						<Box sx={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							columnGap: '8px',
							backgroundColor: this.getStatusBackgroundColor(modalVariant),
							padding: '24px',
							borderBottom: '2px solid black'
						}}>
							{this.getIcon(modalVariant)}
							<Typography
								variant={'h2'}
								sx={{
									color: this.getStatusFontColor(modalVariant),
									textTransform: 'capitalize'
								}}
							>
								{modalVariant}
							</Typography>
						</Box>
						<Box sx={{
							display: 'flex',
							flexDirection: 'column',
							height: '-webkit-fill-available',
							rowGap: '16px',
							margin: '16px 24px 24px'
						}}>
							<Box sx={{
								display: 'flex',
								flexDirection: 'column',
								width: '100%',
								height: '-webkit-fill-available'
							}}>
								{typeof this.props.children === 'string' ?
									<Typography variant={'h3'}>{this.props.children}</Typography> :
									this.props.children
								}
							</Box>
							{this.props.onClose &&
								<Box sx={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'flex-end'
								}}>
									<PushButton 
										onClick={() => this.props.onClose?.()}
										width={'fit-content'}
										height={'fit-content'}
									>
										<Typography
											variant="h2"
											sx={{padding: '8px'}}
										>
											Close
										</Typography>
									</PushButton>
								</Box>
							}
						</Box>
					</Card>
				</Box>
			</Dialog>
		)
	}
}