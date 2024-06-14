// components/Hero.js
import Image from "next/image";

const Layout = () => {
  return (
    <section className="max-w-7xl mx-auto p-6 flex flex-col items-center justify-between lg:flex-row-reverse lg:py-20 lg:px-10 bg-white">
      {/* Right content */}
      
      <div className="text-center lg:text-left lg:w-1/2 lg:flex lg:flex-col lg:justify-center">
        <h1 className="text-4xl font-bold leading-tight text-gray-900 mb-6">
          Connect with a tutor to excel in your studies
        </h1>
        
        <a className="px-8 py-3 text-base font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700">
            Sign up
        </a>        
      </div>

      {/* Left image */}
      <div className="relative mt-10 w-full lg:w-1/2 lg:mt-0">
        <div className="relative rounded-xl overflow-hidden bg-gray-100">
          <Image
            src="/path-to-your-image.jpg" // Replace with the actual path to your image
            alt="Student studying"
            layout="responsive"
            width={640}
            height={480}
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Layout;

