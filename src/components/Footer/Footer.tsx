export const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 text-gray-700 py-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-6">
        <a className="hover:text-gray-900 transition duration-300" href="https://brandclick.com/privacy">
          Privacy
        </a>
        <span className="hidden md:block text-gray-400">|</span>
        <a className="hover:text-gray-900 transition duration-300" href="https://brandclick.com/terms-of-service">
          Terms of Service
        </a>
        <span className="hidden md:block text-gray-400">|</span>
        <a className="hover:text-gray-900 transition duration-300" href="https://brandclick.com/for-advertisers">
          For Advertisers
        </a>
        <span className="hidden md:block text-gray-400">|</span>
        <a className="hover:text-gray-900 transition duration-300" href="https://brandclick.com/contact">
          Contact Us
        </a>
      </div>
    </footer>
  );
};

export default Footer;
