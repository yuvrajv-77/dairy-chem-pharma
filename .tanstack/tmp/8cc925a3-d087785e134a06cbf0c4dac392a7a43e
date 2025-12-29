import { Button } from '@/components/ui/button'
import { ImagesSlider } from '@/components/ui/images-slider'
import { WordRotate } from '@/components/ui/word-rotate'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'

export const Route = createFileRoute('/(client)/')({
  component: Home,
})

const images = [
  "/ui_images/hero-banner1.jpg",
  // "/ui_images/footer.png",
  "/ui_images/grid-chem.jpg",
  "/ui_images/bannermin1.jpg",
  "/ui_images/hero.jpg",
];

const herolines = [
  "HEAVY MACHINERY SOLUTIONS FOR EVERY INDUSTRY",

]
// const herolines = [
//   "HEAVY MACHINERY SOLUTIONS FOR EVERY INDUSTRY",
//   "Precision. Purity. Performance.",
//   "Providing Durable Equipment for All Your Industrial Needs"
// ]

function Home() {
  return (
    <main className=''>
      {/* hero section */}
      <section className={` `}>
        <ImagesSlider className="h-[400px] md:h-[550px] lg:h-[700px]" images={images}>
          <motion.div
            initial={{
              opacity: 0,
              y: -80,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="z-50 flex flex-col justify-center gap-5 items-center"
          >
            <WordRotate
              className="text-2xl lg:text-7xl font-semibold leading-9 font-oswald md:leading-22 px-10 md:px-0  lg:w-240 tracking-wide  text-center text-white"
              words={herolines}
            />
            <WordRotate
              className="text-xl lg:text-xl font-semibold px-10 md:px-0  lg:w-150   text-center text-white"
              words={["Providing Durable Equipment with Unmatched Expert Support for All Your Industrial Needs"]}
            />
            {/* <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text leading-20  text-white py-4">
                            Driving Innovation with Quality Lab Chemicals <br /> Precision. Purity. Performance.<br /> LABPRO
                        </motion.p> */}
            <Button  type='button' size={"xl"} className='mt-2 rounded-full border-2  cursor-pointer'>Explore Our Products <span className='rounded-full p-2 bg-white'><ArrowUpRight className='stroke-primary' /></span></Button>

          </motion.div>
        </ImagesSlider>
      </section>
    </main>
  )
}