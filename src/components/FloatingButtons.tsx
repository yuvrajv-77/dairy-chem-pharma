import { useEffect, useState } from "react";
import { ArrowUp, ChevronUp, ChevronUpCircle } from "lucide-react"; // Optional: lucide icon
import  dairychem from '@/data/dairychem.json'


const FloatingButtons = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300); // show after scroll threshold
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (

        <span className='fixed flex flex-col items-center bottom-5 left-5 z-50 bg-transparent gap-4 rounded-full transition-all duration-100'>
            <span onClick={() => window.open(`https://api.whatsapp.com/send?phone=${dairychem[0].phone[1]}&text=Hello%20DairyChem%20Pharma%20Machineries`, "_blank")}
                className=' bg-[#25D366] rounded-full shadow-2xl p-4 cursor-pointer  transition-transform hover:bg-green-300'>
                <img src="https://cdn.brandfetch.io/id6Zq084G_/theme/light/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B" className='size-6 lg:size-7' alt="WhatsApp" />
            </span>
            {
                isVisible && (
                    <button
                        onClick={scrollToTop}
                        className=" p-2 lg:p-3 bg-white border shadow-2xl text-primary rounded-full  hover:bg-violet-200 transition"
                        aria-label="Back to top"
                    >
                        <ChevronUp className="size-6 stroke-3" />
                    </button>
                )}
        </span>
    );
};

export default FloatingButtons;
