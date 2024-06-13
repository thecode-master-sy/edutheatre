"use client";
import { easeIn, motion } from "framer-motion";
import { Button } from "@/lib/ui/button";
import { useState } from "react";
import { Mail } from "lucide-react";

const EmailFormVariant = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
	},
};

const EmailFormContainer = ({ children }: { children: React.ReactNode }) => {
	const [showForm, setShowForm] = useState(false);

	const openForm = () => {
		setShowForm(true);
	};

	return (
		<>
			{showForm && (
				<motion.div
					variants={EmailFormVariant}
					initial="initial"
					animate="animate"
				>
					{children}
				</motion.div>
			)}
			{!showForm && <OpenEmailForm openForm={openForm} />}
		</>
	);
};

const OpenEmailForm = ({ openForm }: { openForm: () => void }) => {
	return (
		<Button variant="secondary" className="gap-4" onClick={openForm}>
			<span>
				<Mail size={16} />
			</span>
			<span>Continue with email</span>
		</Button>
	);
};

const RemoveFormElement = ({
	showForm,
	children,
}: {
	showForm: boolean;
	children: React.ReactNode;
}) => {
	return !showForm && <>{children}</>;
};

export { EmailFormContainer };
