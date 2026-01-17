import { createFileRoute } from '@tanstack/react-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const Route = createFileRoute('/(client)/_layout/about')({
  component: About,
})

function About() {
  return (
    <main>
      <section className='relative flex-1 flex justify-center items-center  h-60 lg:h-90'>
        <div className='absolute inset-0 bg-[url(https://www.cpduk.co.uk/sites/default/files/news-imported/cpd-benefits-digital-transformation-machinery-cambashi.jpg)] bg-cover bg-center brightness-35' />
        <div className='relative flex items-center justify-center flex-col text-white'>
          <h1 className='font-extrabold lg:text-5xl text-2xl '>About Us</h1>
          <Breadcrumb className='mt-2 '>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className='text-white'>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbSeparator color='white' />
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbPage className='text-white'>Company Profile</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <section className='container mx-auto px-4 lg:px-50 py-10 lg:py-20'>
        <div className=' space-y-15'>
          <div className='flex flex-col gap-4 items-center'>
            <h1 className='text-2xl lg:text-4xl text-center font-black'>Reliable Heavy Machinery for a Strong Future</h1>
            <p className='text-center text-lg font-medium'>Dairychem Pharma Machineries is a reliable manufacturer and supplier of pharmaceutical and chemical processing machinery, serving clients across India and abroad. We are dedicated to supporting the modern manufacturing requirements of pharmaceutical and chemical industries by delivering efficient, durable, and precision-engineered equipment that meets international quality expectations.</p>
            <p className='text-center text-lg font-medium'>With strong technical expertise and industry experience, we specialize in designing and producing machinery that ensures smooth production processes, consistent performance, and long service life. Every machine is manufactured using premium-grade materials and advanced fabrication techniques, ensuring operational reliability, safety, and compliance with industry standards..</p>
          </div>
          <img className='rounded-3xl' src="/ui_images/hero2.webp" alt="" />
          <p className='text-center text-lg font-medium'>At Dairychem Pharma Machineries, we provide customized and practical machinery solutions for pharmaceutical, chemical, food, and allied industries. Our equipment is designed to support accurate processing, improved productivity, and stable operations, helping manufacturers meet regulatory requirements and achieve efficient production.</p>
          <p className='text-center text-lg font-medium'>We believe in building long-term relationships with our clients through quality products, transparent communication, and dependable after-sales support. From understanding specific process requirements to customization, installation guidance, and technical assistance, our team ensures a smooth and professional experience.</p>
          <p className='text-center text-lg font-medium'>Driven by innovation, integrity, and a commitment to continuous improvement, Dairychem Pharma Machineries aims to be a trusted partner for industries seeking reliable, efficient, and future-ready machinery solutions.</p>

        </div>

        <div className='flex flex-col lg:flex-row gap-10 mt-20'>
          <aside className='w-full lg:w-1/2 grid grid-cols-2 gap-4'>
            <img className='rounded-2xl w-full h-48 object-cover' src="/ui_images/hero2.webp" alt="Machinery 1" />
            <img className='rounded-2xl w-full h-48 object-cover' src="/ui_images/about.jpeg" alt="Machinery 2" />
            <img className='col-span-2 rounded-2xl w-full h-48 object-cover' src="ui_images/grid-bg.jpg" alt="Machinery 3" />
          </aside>
          <aside className='w-full lg:w-1/2 flex flex-col justify-center'>
            <h2 className='text-3xl lg:text-4xl font-bold mb-6'>Our Mission & Vision</h2>
            <div className='mb-6'>
              <h3 className='text-xl font-bold mb-2'>Our Mission</h3>
              <p className='text-gray-600  font-medium'>
                Our mission is to empower industries with robust, high-performance machinery and tailored solutions that drive productivity, efficiency, and growth. We are committed to
                providing reliable equipment that supports our clients in reaching their full operational potential.
              </p>
            </div>
            <div>
              <h3 className='text-xl font-bold mb-2'>Our Vision</h3>
              <p className='text-gray-600 leading-relaxed font-medium'>
                Our vision is to become a global leader in innovative, durable, and sustainable heavy machinery solutions. We aim to set the standard in helping industries worldwide achieve long-term success, fostering resilience and adaptability for a dynamic future.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}