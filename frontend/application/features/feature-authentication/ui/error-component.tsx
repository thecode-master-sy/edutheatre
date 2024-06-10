import { cn } from "@/lib/utils";

interface ErrorComponentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ErrorComponent: React.FC<ErrorComponentProps> = ({
	children,
	className,
}) => {
	return (
		<div className={cn("text-red-500 text-sm", className)}>{children}</div>
	);
};
