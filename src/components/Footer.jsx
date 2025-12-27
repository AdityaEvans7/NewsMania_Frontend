import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToCategories = () => {
    const categoriesSection = document.getElementById("categories");
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-blue-600 text-white py-8 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold">NewsMania</h2>
          <p className="mt-2 text-gray-200">
            Stay updated with the latest news from around the world. Your source for trending topics, breaking news, and in-depth stories.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <button onClick={scrollToTop} className="hover:underline">
                Home
              </button>
            </li>
            <li>
              <button onClick={scrollToCategories} className="hover:underline">
                Categories
              </button>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/aditya.evans.75?mibextid=ZbWKwL" className="hover:text-gray-300">
              <FaFacebookF size={24} />
            </a>
            <a href="https://x.com/TheAditya777?t=yK18sy6Z0JpwAs1pb1jGCg&s=09" className="hover:text-gray-300">
              <FaTwitter size={24} />
            </a>
            <a href="https://www.instagram.com/evansaditya9?igsh=MjV2dTlob29mbHFx" className="hover:text-gray-300">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.linkedin.com/in/aditya-kumar-mandal-72b480289?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="hover:text-gray-300">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-gray-300 text-sm mt-8 border-t border-gray-400 pt-4">
        © {new Date().getFullYear()} Aditya's NewsMania. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
