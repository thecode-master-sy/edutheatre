// components/Hero.js
import Image from "next/image";

const Layout = () => {
	return (
		<section className="max-w-7xl mx-auto flex flex-col items-center justify-between lg:flex-row-reverse lg:px-10 bg-white">
			{/* Right content */}
			<div className="text-center lg:text-left lg:w-1/2">
				<h1 className="text-4xl font-bold leading-tight text-gray-900 mb-6">
					Learn at your pace
				</h1>
				<p className="mx-auto text-lg text-gray-600 mb-6">
					Individualized attention for your learning needs
				</p>
				<p className="mx-auto text-lg text-gray-600 mt-6">
					Unlock your potential with tailored tutoring sessions
				</p>
				<p className="mx-auto text-lg text-gray-600 mt-6">
					Revolutionize your learning journey with one-on-one guidance
				</p>
				<p className="mx-auto text-lg text-gray-600 mt-6">
					Elevate your academic performance with personalized tutoring
				</p>
				<a href="/connect-to-tutor">
					<button className="inline-block px-8 py-3 text-base font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700">
						Sign up
					</button>
				</a>
			</div>

			{/* Left image */}
			<div className="relative mt-10 w-full lg:w-1/2 lg:mt-0">
				<div className="relative rounded-xl overflow-hidden bg-gray-100 h-full w-full">
					<Image
						src="/Photo2.png"
						alt="Tutor"
						layout="responsive"
						width={640}
						height={640}
						className="object-cover"
					/>
				</div>
			</div>
		</section>
	);
};

export default Layout;
