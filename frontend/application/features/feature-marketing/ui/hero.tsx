import Image from "next/image";


const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto p-6 flex flex-col items-center justify-between lg:flex-row lg:py-20 lg:px-10 bg-white">
      {/* Left content */}
      <div className="text-center lg:text-left lg:w-1/2">
        <h1 className="text-4xl font-bold leading-tight text-gray-900 mb-6">
          Find the perfect tutor for your learning needs
        </h1>
		<p className="mx-auto">
			Empowering students to take control of
		<br/> their education with our online tutoring platform.
		<br/> Connect with experienced tutors</p>
        
          <a className="inline-block px-8 py-3 text-base font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700">
            Connect to tutor
          </a>
        
      </div>

      {/* Right image */}
      <div className="relative mt-10 w-full lg:w-1/2 lg:mt-0">
        <div className="relative rounded-xl overflow-hidden bg-gray-100">
          <Image
            src="/Photo.png" // Replace with the actual path
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

export default Hero;
