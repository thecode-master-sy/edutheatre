import Image from "next/image";

const Text = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-white p-6">
      {/* Centered headline and description */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold leading-tight text-gray-900 mb-6">
            Transforming education with our online tutoring
        </h1>
        <p className="text-lg text-gray-600">
        Our online tutoring platform connects students with experienced vetted tutors across across a wide range of subjects.
         Get personalized guidance, flexible scheduling, and the support you need to excel academically
        </p>
      </div>


     
    </section>
  );
};

export default Text;
 