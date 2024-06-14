import Image from "next/image";


const Guide = () => {
  return (
    <section className="max-w-7xl mx-auto p-6 flex flex-col items-center justify-between lg:flex-row lg:py-20 lg:px-10 bg-white">
      {/* Left content */}
      <div className="text-center lg:text-left lg:w-1/2">
        <h1 className="text-4xl font-bold leading-tight text-gray-900 mb-6">
          Empowering
          <br/> students to reach 
          <br/>new heights
        </h1>
		<p className="mx-auto text-lg text-gray-600 mt-6">
           Personalized tutoring for your academic journey</p>

          <p className="mx-auto text-lg text-gray-600 mt-6">
            Discover how our online tutoring tutoring platform can ignite your learning potential</p>
        
      </div>

      {/* Right image */}
      <div className="relative mt-10 w-full lg:w-1/2 lg:mt-0">
        <div className="relative rounded-xl overflow-hidden bg-gray-100">
          <Image
            src="/Photo3.png" // Replace with the actual path
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

export default Guide;
