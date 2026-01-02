import react from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router";
import { useSelector } from "react-redux";  
import { useNavigate } from "react-router"; 


function Header() {

    const authStatus = useSelector((state) => state.auth.status)
    // alert(authStatus)

    const navigate = useNavigate()

    const navItems = [
        {
            name:'Home',
            slug:"/",
            active:true
        },
        {
            name:'Login',
            slug:'/login',
            active:!authStatus,
        },
        {
            name:'Signup',
            slug:"/signup",
            active:!authStatus,
        },
        {
            name:'All Posts',
            slug:"/all-posts",
            active:authStatus,
        },
        {
            name:'Add post',
            slug:"/add-post",
            active:authStatus,
        }
    ]

    return ( 
        <header className="py-3 shadow bg-lime-900/25 ">
            <Container>
                <nav className="flex">

                    <div className="mr-4 ">
                        <Link to='/'>
                            <Logo width="70px"/>
                        </Link>
                    </div>

                    <ul className="flex ml-auto">
                        {
                            navItems.map((item) => item.active ? (
                                // key is where the loop is there and it is may be unique
                                <li key={item.name}>
                                    <button onClick={() => navigate(item.slug)}
                                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null)
                        }

                        {
                            authStatus && (
                                <li>
                                    <LogoutBtn/>
                                </li>
                            )
                        }
                    </ul>


                </nav>
            </Container>
        </header>
    );

}

export default Header;
