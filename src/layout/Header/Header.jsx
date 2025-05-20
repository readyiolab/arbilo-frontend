import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useState, useEffect } from "react";
import { UserPlusIcon, LogInIcon } from "lucide-react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginClick = () => {
    navigate("/login");
    setIsSheetOpen(false);
  };

  const handleSignupClick = () => {
    navigate("/", { state: { scrollTo: "pricing-section" } });
    setIsSheetOpen(false);
  };

  const handleScrollLinkClick = (to) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: to } });
    } else {
      window.scrollTo({
        top: document.getElementById(to)?.offsetTop || 0,
        behavior: "smooth",
      });
    }
    setIsSheetOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Scroll to top on route change (e.g., for Blog page)
    if (!location.state?.scrollTo) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      // Handle scroll to specific section if specified in state
      setTimeout(() => {
        window.scrollTo({
          top: document.getElementById(location.state.scrollTo)?.offsetTop || 0,
          behavior: "smooth",
        });
      }, 100);
    }
  }, [location]);

  const navItems = [
    { to: "Signals-section", label: "Signals", type: "scroll" },
    { to: "how-it-works-section", label: "How it Works", type: "scroll" },
    { to: "pricing-section", label: "Pricing", type: "scroll" },
    { to: "faq-section", label: "FAQs", type: "scroll" },
    { to: "tips", label: "Tips", type: "scroll" },
    { to: "/blog-section", label: "Blog", type: "route" },
    { to: "contact-section", label: "Contact", type: "scroll" },
  ];

  return (
    <nav
      className={`py-3 sm:py-4 transition-all duration-300 z-50 ${
        isSticky
          ? "fixed top-0 left-0 right-0 bg-black shadow-lg text-white"
          : "bg-white text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo and Links */}
        <div className="flex items-center gap-4 sm:gap-6">
          <ScrollLink
            to="home-section"
            smooth={true}
            duration={500}
            onClick={() => handleScrollLinkClick("home-section")}
            className="flex-shrink-0"
            aria-label="Go to home section"
          >
            <img
              src="/assets/images/logo2.webp"
              alt="ArbiPair Company Logo"
              loading="lazy"
              className="w-28 md:w-20 cursor-pointer"
            />
          </ScrollLink>
          <div className="hidden md:flex">
            <ul className="flex gap-4 lg:gap-6">
              {navItems.map((item) => (
                <li key={item.to}>
                  {item.type === "scroll" ? (
                    <ScrollLink
                      to={item.to}
                      smooth={true}
                      duration={500}
                      onClick={() => handleScrollLinkClick(item.to)}
                      className={`${
                        isSticky ? "text-white" : "text-black"
                      } font-medium text-sm lg:text-base cursor-pointer transition-colors duration-200 hover:text-gray-300 hover:scale-105`}
                      aria-label={`Go to ${item.label} section`}
                    >
                      {item.label}
                    </ScrollLink>
                  ) : (
                    <RouterLink
                      to={item.to}
                      className={`${
                        isSticky ? "text-white" : "text-black"
                      } font-medium text-sm lg:text-base cursor-pointer transition-colors duration-200 hover:text-gray-300 hover:scale-105`}
                      aria-label={`Go to ${item.label} page`}
                    >
                      {item.label}
                    </RouterLink>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden md:flex gap-2 lg:gap-3">
            <button
              onClick={handleSignupClick}
              className={`${
                isSticky
                  ? "bg-white text-black border-black"
                  : "bg-white text-black border-black"
              } px-3 sm:px-4 py-1.5 sm:py-2 rounded-md flex items-center gap-2 hover:bg-gray-200 hover:scale-105 transition-all duration-200 text-sm font-semibold border`}
              aria-label="Sign up for ArbiPair"
              rel="nofollow"
            >
              Sign up <UserPlusIcon className="w-4 sm:w-5 h-4 sm:h-5" />
            </button>
            <button
              onClick={handleLoginClick}
              className={`${
                isSticky
                  ? "bg-black text-white border-white"
                  : "bg-black text-white border-white"
              } px-3 sm:px-4 py-1.5 sm:py-2 rounded-md flex items-center gap-2 hover:bg-gray-800 hover:scale-105 transition-all duration-200 text-sm font-semibold border`}
              aria-label="Log in to ArbiPair"
              rel="nofollow"
            >
              Log In <LogInIcon className="w-4 sm:w-5 h-4 sm:h-5" />
            </button>
          </div>

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild className="md:hidden">
              <button
                className="flex items-center justify-center"
                aria-label="Open menu"
              >
                <Bars3Icon
                  className={`w-6 h-6 ${
                    isSticky ? "text-white" : "text-black"
                  }`}
                />
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-full max-w-sm p-0 border-none"
            >
              <div className="flex flex-col h-full">
                <SheetHeader className="p-6 border-b">
                  <SheetTitle className="text-xl font-bold">
                    <img
                      src="/assets/images/logo2.webp"
                      alt="ArbiPair Company Logo"
                      loading="lazy"
                      className="w-28 md:w-20 cursor-pointer"
                    />
                  </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-auto py-6 px-6">
                  <nav className="flex flex-col space-y-6">
                    {navItems.map((item) => (
                      <div
                        key={item.to}
                        className="border-b border-gray-100 pb-6 last:border-0"
                      >
                        {item.type === "scroll" ? (
                          <ScrollLink
                            to={item.to}
                            smooth={true}
                            duration={500}
                            onClick={() => {
                              handleScrollLinkClick(item.to);
                              setIsSheetOpen(false);
                            }}
                            className="text-black hover:text-gray-600 font-medium text-lg block"
                            aria-label={`Go to ${item.label} section`}
                          >
                            {item.label}
                          </ScrollLink>
                        ) : (
                          <RouterLink
                            to={item.to}
                            onClick={() => setIsSheetOpen(false)}
                            className="text-black hover:text-gray-600 font-medium text-lg block"
                            aria-label={`Go to ${item.label} page`}
                          >
                            {item.label}
                          </RouterLink>
                        )}
                      </div>
                    ))}
                  </nav>
                </div>

                <div className="p-6 mt-auto border-t">
                  <div className="flex flex-col gap-4">
                    <button
                      onClick={handleSignupClick}
                      className="bg-white text-black px-4 py-3 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 transition-all duration-200 text-base font-semibold border border-black w-full"
                      aria-label="Sign up for ArbiPair"
                      rel="nofollow"
                    >
                      Sign up <UserPlusIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleLoginClick}
                      className="bg-black text-white px-4 py-3 rounded-md flex items-center justify-center gap-2 hover:bg-gray-800 transition-all duration-200 text-base font-semibold w-full"
                      aria-label="Log in to ArbiPair"
                      rel="nofollow"
                    >
                      Log In <LogInIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Header;
