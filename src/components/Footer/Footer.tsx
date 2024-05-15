export const Footer = () => {
  return (
    <footer className="absolute bottom-0 w-full flex flex-row justify-center py-3 bg-gray-100">
      <div className="min-w-[300px] flex flex-row text-gray-700">
        <a className="hover:underline" href="#">
          Privacy
        </a>
        <a className="hover:underline ml-4 mr-4" href="#">
          Terms of Service
        </a>
        <a className="hover:underline" href="#">
          Contact Us
        </a>
      </div>
    </footer>
  );
};
