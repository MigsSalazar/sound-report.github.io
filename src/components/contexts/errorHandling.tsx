import { CloseRounded } from '@mui/icons-material';
import { IconButton } from "@mui/material";
import { type SnackbarKey, type VariantType, useSnackbar } from "notistack";
import { type ComponentType, type ReactNode, createContext, useContext, useMemo, useState } from "react";
import { ThemedModal } from '../blocks/ThemedModal';

export type MessageType = Exclude<VariantType, 'default'>;

export interface InternalMessageOptions {
	showSuccess?: boolean;
	useModal?: boolean;
}

export interface ModalMessageOptions extends InternalMessageOptions {
	useModal: true;
	blockDismissal?: boolean;
	modalBody?: ReactNode;
}

export interface ToastMessageOptions extends InternalMessageOptions {
	useModal?: false;
	disableAutomaticDismissal?: boolean;
	dismissalTime?: number;
}

export type MessageOptions = ModalMessageOptions | ToastMessageOptions;

interface Message {
	variant: MessageType;
	message: string;
	options?: MessageOptions;
}

interface ModalMessage extends Message{
	options?: ModalMessageOptions;
}

export type CloseCallback = () => void;

interface ErrorHandlingProps {
	showMessage: (type: MessageType, message: string, options?: MessageOptions) => CloseCallback;
	handleError: <T>(func: () => Promise<T>, options?: MessageOptions) => Promise<T>;
	closeModal: () => void;
}

const ErrorHandlingContext = createContext<ErrorHandlingProps | null>(null);

interface ProviderProps {
	children?: ReactNode;
}

export const ErrorHandlingProvider = (props: ProviderProps) => {

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const [modalInfo, setModalInfo] = useState<ModalMessage | null>(null);

	const toastAction = (snackbarId: SnackbarKey) => {
		return <IconButton onClick={() => closeSnackbar(snackbarId)}>
			<CloseRounded/>
		</IconButton>
	}

	const showMessage = (variant: MessageType, message: string, options?: MessageOptions) => {
		if(options?.useModal){
			setModalInfo({
				variant,
				message,
				options
			});
			return () => setModalInfo(null);
		}else{
			const snackbarKey = enqueueSnackbar(message, {
				variant, 
				disableWindowBlurListener: true,
				autoHideDuration: options?.disableAutomaticDismissal ? null : options?.dismissalTime,
				action: toastAction
			})
			
			return () => closeSnackbar(snackbarKey);
		}
	}

	const handleError = async <T,>(func: () => Promise<T>, options?: MessageOptions) => {
		try{
			const result = await func();
			if(options?.showSuccess){
				showMessage('success', "Success!", options);
			}
			return result;
		}catch(ex: unknown){
			const err = ex as Error;
			showMessage('error', err.message, options?.useModal ? options : {...options, disableAutomaticDismissal: true});
			throw err;
		}
	}

	const closeModal = () => {
		setModalInfo(null);
	}

	const value = useMemo(() => {
		return {
			showMessage,
			handleError,
			closeModal
		};
	}, []);

	return (
		<ErrorHandlingContext.Provider value={value}>
			<>
				<ThemedModal
					open={modalInfo !== null}
					variant={modalInfo?.variant}
					onClose={modalInfo?.options?.blockDismissal ? undefined : () => closeModal()}
				>
					{modalInfo?.message || modalInfo?.options?.modalBody}
				</ThemedModal>
				{props.children}
			</>
		</ErrorHandlingContext.Provider>
	)
}

export const useErrorHandling = () => {
	const context = useContext(ErrorHandlingContext);
	if(!context){
		throw new Error('useErrorHandling must be used inside the ErrorHandlingProvider')
	}
	return context;
}

export interface ErrorHandlingContextProps {
	errorHandlingContext: ErrorHandlingProps;
}

export const withErrorHandlingContext = <P extends ErrorHandlingContextProps>(Component: ComponentType<P>) => {
	return (compProps: Omit<P, 'errorHandlingContext'>) => {
		const context = useErrorHandling();
		if(!context){
			throw new Error('withErrorHandlingContext must be used inside the ErrorHandlingProvider')
		}
		//@ts-ignore
		return <Component errorHandlingContext={context} {...compProps} />
	}
}