"use client";

import {
	Toast,
	ToastClose,
	ToastProvider,
	ToastTitle,
	ToastViewport
} from "@/ui/toast/Toast";
import { useToast } from "@/ui/toast/use-toast";

export const Toaster = () => {
	const { toasts } = useToast();

	return (
		<ToastProvider swipeDirection='up'>
			{toasts.map(function ({ id, title, description, ...props }) {
				return (
					<Toast key={id} {...props}>
						<div className='grid gap-1'>
							{title && (
								<ToastTitle variant={props.variant ?? "success"}>
									{title}
								</ToastTitle>
							)}
						</div>

						<ToastClose variant={props.variant ?? "success"} />
					</Toast>
				);
			})}
			<ToastViewport />
		</ToastProvider>
	);
};
