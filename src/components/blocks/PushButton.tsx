import { Box, ButtonBase, type ButtonBaseProps, type SxProps, type Theme } from '@mui/material';
import memoizeOne from 'memoize-one';
import React, { type CSSProperties } from 'react';

interface Props extends Omit<ButtonBaseProps, 'children' | 'ref'> {
	/**
	 * @default 'black'
	 */
	highlightColor?: string;
	backgroundColor?: string;
	children: React.ReactNode;
	buttonContainerSx?: SxProps<Theme>;
	width?: CSSProperties['width'],
	height?: CSSProperties['height']
}

interface State {

}

export class PushButton extends React.Component<Props, State> {

	styles = memoizeOne(createStyles)(this.props);
	
  	render(){
		const {highlightColor, children, buttonContainerSx, width, height, ...buttonProps} = this.props;
		return (
			<ButtonBase disableRipple {...buttonProps}>
				<Box sx={{width: width ?? '200px', height: height ?? '100px'}}>
					<Box sx={{...buttonContainerSx, ...this.styles.propertySquare, filter: this.props.disabled ? 'opacity(50%)' : undefined}}>
						{children}
					</Box>
				</Box>
			</ButtonBase>
		);
	}
}

// Custom styles using makeStyles
const createStyles = (props: Props) => ({
	//3D button effect - https://css-tricks.com/css-hover-effects-background-masks-3d/
	propertySquare: {
		padding: 0,
		boxSizing: 'content-box',
		display: 'flex',
		width: props.width ?? '200px',
		height: props.height ?? '100px',
		color: props.highlightColor ?? 'black',
		borderStyle: 'solid',
		borderColor: '#000',
		borderWidth: '2px 2px 12px 12px',
		background: `conic-gradient(at left 10px  bottom 10px,
			${props.backgroundColor ?? '#0000'} 90deg, rgba(0, 0, 0, 0.3) 0 225deg, rgba(0, 0, 0, 0.4) 0) border-box,
			conic-gradient(at left 12px bottom 12px,
			${props.backgroundColor ?? '#0000'} 90deg,${props.highlightColor ?? 'black'} 0) 0 100%/calc(100% - 2px) calc(100% - 2px)  border-box`,
		transform: 'translate(calc(10px/-1),10px)',
		clipPath: `polygon(
			6px 0%, 
			6px 0%, 
			100% 0%, 
			100% calc(100% - 6px),
			100% calc(100% - 6px),
			6px calc(100% - 6px)
		)`,
		transition: '0.1s ease-in-out',
		'&:hover': {
			borderColor: '#0000',
			transform: `translate(0,0)`,
			clipPath: `polygon(
				0% 10px, 
				10px 0%, 
				100% 0%, 
				100% calc(100% - 10px), 
				calc(100% - 15px) 100%, 
				0% 100%
			)`
		},
		'&:active': {
			borderColor: '#0000',
			transform: `translate(calc(5px/-1),5px)`,
			clipPath: `polygon(
				5px 5px, 
				10px 0%, 
				100% 0%, 
				100% calc(100% - 10px), 
				calc(100% - 10px) calc(100% - 5px), 
				5px calc(100% - 5px)
			)`
		}
	}
} satisfies {[key: string]:SxProps<Theme>});
