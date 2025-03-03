export const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 py-4">
      <div className="container mx-auto flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-2 sm:gap-4 text-gray-700 text-sm text-center">
        <a className="hover:underline" href="https://brandclick.com/privacy">
          Privacy
        </a>
        <a className="hover:underline" href="https://brandclick.com/terms-of-service">
          Terms of Service
        </a>
        <a className="hover:underline" href="https://brandclick.com/for-advertisers">
          For Advertisers
        </a>
        <a className="hover:underline" href="https://brandclick.com/contact">
          Contact Us
        </a>
      </div>
    </footer>
  );
};
