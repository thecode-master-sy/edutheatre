import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS } from "@/constants";
import { Button } from "@/lib/ui/button";

const Navbar = () => {
	return (
		<nav className=" flexBetween max-container padding-container relative z-30 py-5">
			<Link href="/">
				<h1 className="text-xl font-bold text-gray-900 mb-4">
					Edutheatre
				</h1>
			</Link>

			<ul className="hidden h-full gap-12 lg:flex">
				{NAV_LINKS.map((link) => (
					<Link
						href={link.href}
						key={link.key}
						className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
					>
						{link.label}
					</Link>
				))}
			</ul>

			<div className="lg:flexCenter hidden">
				<Button className="inline-block px-6 py-2 text-base font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700">Login</Button>
			</div>

			<Image
				src="menu.svg"
				alt="menu"
				width={32}
				height={32}
				className="inline-block cursor-pointer lg:hidden"
			/>
		</nav>
	);
};

export default Navbar;
