import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = (props) => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth", // Optional if you want to skip the scrolling animation
        });
    }, [pathname]);

    return <>{props.children}</>
};

export default ScrollToTop;