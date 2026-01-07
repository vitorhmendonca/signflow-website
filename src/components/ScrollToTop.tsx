import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Ensure browser doesn't restore scroll position
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Temporarily disable smooth scrolling to make the jump instant
    const htmlElement = document.documentElement;
    const originalScrollBehavior = htmlElement.style.scrollBehavior;
    htmlElement.style.scrollBehavior = 'auto';

    // Immediate scroll to top before paint
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Restore smooth scrolling after the instant jump
    requestAnimationFrame(() => {
      htmlElement.style.scrollBehavior = originalScrollBehavior;
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
