import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Scrolls to the contact form and centers it in the viewport
 */
export function scrollToContact() {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    const elementHeight = contactSection.offsetHeight;
    const windowHeight = window.innerHeight;
    const elementPosition = contactSection.getBoundingClientRect().top + window.pageYOffset;
    
    // Calculate position to center the element in viewport
    const offsetPosition = elementPosition - (windowHeight / 2) + (elementHeight / 2);
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}
