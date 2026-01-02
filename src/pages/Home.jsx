import React,{useEffect,useState} from "react";
import appwriteService from '../appwrite/config'
import { Container,PostCard } from "../../components/index";
import laptopImg from "../pages/laptop.png"
import Button from "../../components/Button";
import {Swiper,SwiperSlide} from "swiper/react"
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';



function Home() {

    const [posts,setPosts] = useState([])

    useEffect(() =>{
        appwriteService.getPosts([]).then((post) =>{
            if(post)
                setPosts(post.documents)
        })
    },[])

   if (posts.length === 0) {
     <div className='w-full py-8'>
    <Container>
        <div
          className="flex flex-wrap rounded-2xl bg-cover bg-center aspect-[21/9] "
          style={{ backgroundImage:`url(${laptopImg})` }}
        >
          <div className="p-2 w-full flex flex-col items-center justify-center bg-black/10 rounded-2xl">
            <h1 className="p-2 text-white text-5xl font-bold">
                Build And Share Blogs
            </h1>
            <h2 className="p-2 text-xl text-white font-semibold">
                A  modern blogging platform for developers & creators
            </h2>
            <Button className="bg-white " textColor="black">
                Without Login
            </Button>
          </div>
        </div>
    </Container>
    </div>
  }



    return (
    <div className='w-full py-8'>
    <Container>
        <div
          className="flex flex-wrap rounded-2xl bg-cover bg-center aspect-[21/9] "
          style={{ backgroundImage:`url(${laptopImg})` }}
        >
          <div className="p-2 w-full flex flex-col items-center justify-center bg-black/10 rounded-2xl">
            <h1 className="p-2 text-white text-5xl font-bold">
                Build And Share Blogs
            </h1>
            <h2 className="p-2 text-xl text-white font-semibold">
                A  modern blogging platform for developers & creators
            </h2>
            <Button className="bg-white " textColor="black">
                Explore Blogs
            </Button>
          </div>
        </div>

           
            <div className="mt-16 ">
                <h2 className="text-3xl font-bold mb-6">Featured Posts</h2>

                <Swiper
                modules={[ Scrollbar,A11y]}
                spaceBetween={24}
                slidesPerView={"auto"}
                grabCursor
                navigation
                scrollbar={{ draggable: true }}
                >
                {posts.map((post) => (
                    <SwiperSlide key={post.$id}  className="!w-[260px] flex" >
                        <PostCard {...post} />
                    </SwiperSlide>
                ))}
                </Swiper>
            </div>
            

    </Container>
    </div>
    )    
}

export default Home;