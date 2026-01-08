import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';

export const SoundReportLogo = ({width, height, ...props}: SvgIconProps) => 
	<SvgIcon 
		viewBox='0 0 100 100'
		{...props}
		sx={{width, height}}
	>
		{/* <!-- Outer circle --> */}
		<circle
			cx="50"
			cy="50"
			r="48"
			fill="none"
			stroke="currentColor"
			strokeWidth="4"
		/>

		{/* <!-- Waveform --> */}
		<path
			d="
				M 3 50
				L 10 50
				C 22 65, 18 36, 26 34
				C 34 36, 29 73, 37 75
				C 45 73, 42 14, 50 16
				M 97 50
				L 90 50
				C 78 65, 82 36, 74 34
				C 66 36, 71 73, 63 75
				C 55 73, 58 14, 50 16
			"
			fill="none"
			stroke="currentColor"
			strokeWidth="4"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</SvgIcon>
