import { cn } from "../utils";

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Form: React.FC<FormProps> = ({ className, ...props }) => {
	return <form className={cn("grid gap-4 w-full", className)} {...props} />;
};

export const FormGroup: React.FC<FormGroupProps> = ({
	children,
	className,
}) => {
	return <div className={cn("grid gap-3", className)}>{children}</div>;
};
