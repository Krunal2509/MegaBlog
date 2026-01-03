import React,{useEffect,useState} from "react";
import appwriteService from '../appwrite/config'
import { Container,PostCard } from "../../components/index";
import laptopImg from "../pages/laptop.png"
import Button from "../../components/Button";
import {Swiper,SwiperSlide} from "swiper/react"
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { useNavigate } from "react-router";



function Home() {

    const [posts,setPosts] = useState([])
    const navigate = useNavigate()

    useEffect(() =>{
        appwriteService.getPosts([]).then((post) =>{
            if(post)
                setPosts(post.documents)
        })
    },[])

   if (posts.length === 0) {

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
                    
                  </div>
                </div>


                <div className="m-50">
                  <h2 className="m-5 font-semibold text-3xl font-mono text-black/90">🙋🏽Want To Share Your Knowlege?</h2>
                  <h2 className="m-5 mb-10 font-semibold text-xl font-mono text-black/50">Create Your Blog Easily And Fast</h2>
                  <Button className="bg-lime-900/45 w-sm text-2xl font-bold  " onClick={() => navigate("/login")}>
                      Create Blog
                  </Button>
                </div>

            </Container>
          </div>
      )

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
                <Button className="bg-white " textColor="black" onClick={() => navigate('/all-posts')}>
                    Explore Blogs
                </Button>
              </div>
            </div>

           
          <div className="my-16 ">
              <h2 className="text-3xl font-mono mb-6 ">Featured Blogs</h2>

              <Swiper
                modules={[Pagination, A11y]}
                slidesPerView="auto"
                spaceBetween={24}
                pagination={{ clickable: true }}
              >


              {posts.map((post) => (
                  <SwiperSlide key={post.$id}  className="!w-[260px] flex" >
                      <PostCard {...post} />
                  </SwiperSlide>
              ))}
              </Swiper>
          </div>

          <div className="m-50">
            <h2 className="m-5 font-semibold text-3xl font-mono text-black/90">🙋🏽Want To Share Your Knowlege?</h2>
            <h2 className="m-5 mb-10 font-semibold text-xl font-mono text-black/50">Create Your Blog Easily And Fast</h2>
            <Button className="bg-lime-900/45 w-sm text-2xl font-bold  " onClick={() => navigate("/add-post")}>
                Create Blog
            </Button>
          </div>
            

    </Container>
    </div>
    )    
}

export default Home;