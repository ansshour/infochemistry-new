import { useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';

export const RouterWrapper = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
        document.documentElement.scrollTo({
            top: 0,
        })
    }, [location.pathname]);
    return children
} 