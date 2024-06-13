import Image from 'next/image'
import Button from './Button'

const Hero = () => {
  return (
    <section className='max-container padding-container flex flex-col 
    gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row'>
        <div className='hero-map'/>


        <div className='relative z-20 flex flex-1 flex-col xl:w-1/2'>
            <Image 
              src="/camp.svg"
              alt="camp"
              width={50}
              height={50}
              className='absolute left-[-5px] top-[-30p] w-10 lg:w-[50px]'
            />
            <h1 className='old-52 lg:bold-88'>A unique approach to learning online</h1>
            <p className='regular-16 mt-6 text-gray-30 xl:max-w-[520px]'>
            We want to be on each of your journeys seeking the satisfaction of Learning. 
            We can help you on an adventure around the curriculum in just one app
            </p>

            <div className='my-11 flex flex-rap gap-5'>
                <div className='flex items-center gap2'>
                    {Array(5).fill(1).map((_, index) => (
                        <Image
                          src="/star.svg"
                          key={index}
                          alt="star"
                          width={24}
                          height={24}
                        />
                    ))}
                </div>

                <p className='bold-16 lg:bold-20 text-blue-70'>
                    198k
                    <span className='regular-16 lg:reguler-20 ml-1'>Excellent Reviews</span>    
                </p>
            </div>

            <div className='flex flex-col w-full gap-3 sm:flex-row'>
                <Button
                 type='button' 
                 title='Download App' 
                 variant='btn_green'
                />
                 <Button
                 type='button' 
                 title='How we work?'
                 icon="/play.svg" 
                 variant='btn_white_text'
                />
            </div>
        </div>

        <div className='relative flex flex-1 items-start'>
            <div className='relative z-20 w-[268px] flex-col gap-8 rounded-3xl bg-green-90 px-7 py-8'>

            </div>
        </div>
    </section>
  )
}

export default Hero