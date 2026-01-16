import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { ImagesSlider } from '@/components/ui/images-slider'
import { WordRotate } from '@/components/ui/word-rotate'
import { useBlogs } from '@/contexts/BlogsContext'
import { useProducts } from '@/contexts/ProductsContext'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowRight, ArrowUpRight, CalendarRange, Star } from 'lucide-react'
import { motion } from 'motion/react'
import { useMemo } from 'react'


export const Route = createFileRoute('/(client)/_layout/')({
  component: Home,

})

const images = [
  "/ui_images/hero1.jpg",
  "/ui_images/hero2.webp",
  "/ui_images/grid-bg.jpg",
  "/ui_images/grid-chem.jpg",
  "/ui_images/bannermin1.jpg",
 
];

// const herolines = [
//   "HEAVY MACHINERY SOLUTIONS FOR EVERY INDUSTRY",
// ]
const herolines = [
  "HEAVY MACHINERY SOLUTIONS FOR EVERY INDUSTRY",
  "Providing Durable Equipment for All Your Industrial Needs",
  "Precision. Purity. Performance.",
]

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    company: "Sun Pharma",
    review: "Excellent machinery and top-notch service. The granulation line we purchased has significantly improved our production efficiency.",
    rating: 5
  },
  {
    id: 2,
    name: "Anita Desai",
    company: "Cipla Ltd.",
    review: "Dairychem's liquid filling machines are precise and durable. Their support team is always ready to help with any queries.",
    rating: 5
  },
  {
    id: 3,
    name: "Vikram Singh",
    company: "Dr. Reddy's",
    review: "We have been using their ointment manufacturing plant for over a year now. The quality is consistent and maintenance is minimal.",
    rating: 4
  },
  {
    id: 4,
    name: "Suresh Patel",
    company: "Zydus Cadila",
    review: "Great experience working with the team. They understood our custom requirements for the capsule filling line and delivered exactly what we needed.",
    rating: 5
  },
  {
    id: 5,
    name: "Meera Iyer",
    company: "Torrent Pharma",
    review: "Reliable equipment at competitive prices. The installation process was smooth and the training provided to our staff was very helpful.",
    rating: 4
  },
  {
    id: 6,
    name: "Amit Shah",
    company: "Lupin Limited",
    review: "Highly recommend their injectable machinery. It meets all regulatory standards and performs flawlessly under high load.",
    rating: 5
  }
]

function Home() {


  const navigate = Route.useNavigate()
  const { products } = useProducts()
  const { blogs } = useBlogs();
  console.log(blogs);
  

  // const filteredProducts = useMemo(() => {
  //   return filter === 'All'
  //     ? products
  //     : products.filter((product) => product.category === filter)
  // }, [filter, products])

  const featuredPost = blogs[0]
  const smallPosts = blogs.slice(1, 4)

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
              className="text-sm lg:text-xl font-semibold px-10 md:px-0  lg:w-150   text-center text-white"
              words={["Providing Durable Equipment with Unmatched Expert Support for All Your Industrial Needs"]}
            />
            {/* <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text leading-20  text-white py-4">
                            Driving Innovation with Quality Lab Chemicals <br /> Precision. Purity. Performance.<br /> LABPRO
                        </motion.p> */}
            <Button
              type='button'
              size={"xl"} onClick={() => navigate({ to: '/products', search: { filter: 'All' } })}
              className='mt-2 rounded-full border-2  cursor-pointer'>Explore Our Products <span className='rounded-full p-2 bg-white'><ArrowUpRight className='stroke-primary' /></span></Button>

          </motion.div>
        </ImagesSlider>
      </section>

      <section>
        <div className='container mx-auto  px-4 lg:px-50 py-10 lg:py-10'>
          <div className=''>
            <span className='text-center space-y-3'>
              <h1 className='text-2xl lg:text-4xl font-extrabold'>Our Machinery and Services</h1>
              <p className='text-sm text-gray-500'>Innovative and Reliable Equipment</p>
            </span>
          </div>


          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>
            {products.map((product) => (
              <div key={product.id} className='bg-secondary shadow-sm hover:shadow-md transition-shadow rounded-lg overflow-hidden cursor-pointer ' onClick={() => navigate({ to: '/products/$productId', params: { productId: String(product.id) } })}>
                <div className='h-50  rounded-md mb-2 flex items-center justify-center'>
                  <img className='h-full object-cover' src={product.imageUrl} alt="" />
                </div>
                <div className='p-4 space-y-3'>
                  <h2 className='text-xl font-bold'>{product.name}</h2>
                  <p className='text-xs text-gray-500  uppercase tracking-wide'>{product.category}</p>
                  <p className='text-sm text-gray-600 line-clamp-2'>{product.description}</p>
                  <div className='flex justify-between items-center'>
                    <Button className=''>Inquire Now</Button>
                    <Button variant={'secondary'} className=''>View Details</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='flex items-center justify-center mt-5'>
            <Button
              type='button'
              size={"xl"} onClick={() => navigate({ to: '/products', search: { filter: 'All' } })}
              className='mt-2 bg-white rounded-full border-2 border-primary text-primary hover:text-white  cursor-pointer'>Show All Products <span className='rounded-full p-2 bg-primary'><ArrowUpRight className='stroke-white' /></span></Button>
          </div>

        </div>
      </section>

      <section className='bg-primary '>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10  px-4 lg:px-50 py-10 lg:py-20'>
          <div className='grid grid-cols-2 grid-rows-2  gap-4'>
            <img src="/ui_images/about.jpeg" alt="" className='row-span-2 h-60 md:h-90 w-full object-cover rounded-lg' />
            <img src="/ui_images/hero1.jpg" alt="" className='h-full w-full object-cover rounded-lg' />
            <img src="/ui_images/hero2.webp" alt="" className='h-full w-full object-cover rounded-lg' />
          </div>
          <div className='flex flex-col gap-5 justify-between items-center md:items-start text-white'>
            <h1 className='text-2xl  lg:text-3xl font-black'>About Us</h1>
            <p className='text-justify'>At Dairychem Pharma Machineries, we believe that reliable machinery is the backbone of quality pharmaceutical production. Founded with a commitment to precision, performance, and long-term partnerships, we specialize in designing and manufacturing high-quality pharmaceutical and allied process equipment that meets global industry standards. </p>
            <Button type='button' size={"xl"} onClick={() => navigate({ to: '/about' })} className='mt-2 bg-white rounded-full hover:bg-accent border-2 border-primary text-primary  cursor-pointer'>Read More <span className='rounded-full p-2 bg-primary'><ArrowUpRight className='stroke-white' /></span></Button>
          </div>
        </div>
      </section>

      <section className='bg-gray-50'>
        <div className='container mx-auto px-4 lg:px-50 py-10 lg:py-20'>
          <div className='text-center mb-12 space-y-3'>
            <h1 className='text-2xl lg:text-4xl font-extrabold'>What Our Client Says</h1>
            <p className='text-sm text-gray-500'>Trusted by Industry Leaders</p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className='bg-white rounded-xl shadow-sm border flex flex-col justify-between border-gray-100 hover:shadow-md transition-all'>
                <CardHeader>
                  <div className='flex gap-1'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`}
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className='text-gray-600 text-sm leading-relaxed'>"{testimonial.review}"</p>
                </CardContent>
                <CardFooter>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold'>
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className='font-bold text-gray-900 text-sm'>{testimonial.name}</h4>
                      <p className='text-xs text-gray-500'>{testimonial.company}</p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className=''>
        <div className='container mx-auto px-4 lg:px-50 py-10 lg:py-20'>
          <div className='text-center mb-12 space-y-3'>
            <h1 className='text-2xl lg:text-4xl font-extrabold'>Our Latest News & Updates</h1>
            <p className='text-sm text-center text-gray-500'>Stay updated with the latest trends, tips, and expert advice in <br />
              heavy machinery and industrial solutions.</p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            <div className=''>
              {featuredPost ? (
                <article className='flex flex-col gap-3  cursor-pointer group' onClick={() => navigate({ to: '/blogs/$blogId', params: { blogId: String(featuredPost.id) } })}>
                  <img src={featuredPost.imageUrl || 'https://via.placeholder.co/600x400'} alt={featuredPost.title} className='w-full h-60 lg:h-80 object-cover rounded-lg group-hover:scale-101 transition-all' />
                  <h2 className='text-xl md:text-2xl font-extrabold line-clamp-2 group-hover:underline'>{featuredPost.title}</h2>
                  <p className='text-slate-600 text-sm line-clamp-2 '>{featuredPost.description}</p>
                  <p className='flex items-center text-slate-500 text-xs gap-2'><CalendarRange size={15} />{new Date(featuredPost.createdAt).toLocaleDateString()}</p>
                </article>
              ) : (
                <div className="h-60 lg:h-80 flex items-center justify-center bg-gray-50 rounded-lg text-gray-400">No blogs available</div>
              )}
            </div>
            <div className='flex flex-col gap-6  justify-between'>
              {smallPosts.map((post) => (
                <article key={post.id} className='flex gap-4 group cursor-pointer ' onClick={() => navigate({ to: '/blogs/$blogId', params: { blogId: String(post.id) } })}>
                  <img src={post.imageUrl || 'https://via.placeholder.co/150'} alt={post.title} className='w-36 lg:w-46 h-35 object-cover rounded-lg  group-hover:scale-101 transition-all' />
                  <div className='flex flex-col justify-between'>
                    <h2 className='font-bold text-lg line-clamp-2 group-hover:underline'>{post.title}</h2>
                    <p className='text-sm text-gray-600 line-clamp-2'>{post.description}</p>
                    <p className='flex items-center text-slate-500 text-xs gap-2'><CalendarRange size={15} />{new Date(post.createdAt).toLocaleDateString()}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className='flex justify-center mt-5'>
            <Button 
            type='button' 
            size={"xl"}  onClick={()=> navigate({ to: '/blogs' })}
            className='mt-2 bg-white rounded-full border-2 border-primary text-primary hover:text-white cursor-pointer'>Go To Blogs <span className='rounded-full p-2 bg-primary'><ArrowUpRight className='stroke-white' /></span></Button>
          </div>


        </div>
      </section>

      <section>
        <div className='container mx-auto px-4 lg:px-50 py-10 lg:py-20 '>
          <div className='bg-black text-white text-center rounded-2xl gap-6 flex flex-col items-center justify-center px-5 lg:px-50  py-10'>
            <h1 className='font-extrabold text-lg  lg:text-4xl'>
              Unlock Superior Performance
              for Your Machinery Needs
            </h1>
            <p className='text-xs md:text-sm '>Experience unmatched reliability and durability with our top-tier heavy machinery solutions.<br />
              From construction to industrial projects, we ensure optimal performance and longevity.</p>
            <Button type='button' size={"xl"} onClick={() => navigate({ to: '/contact' })} className='mt-2 rounded-full border-2  cursor-pointer'>Contact Us <span className='rounded-full p-2 bg-white'><ArrowUpRight className='stroke-primary' /></span></Button>
          </div>
        </div>
      </section>
    </main>
  )
}