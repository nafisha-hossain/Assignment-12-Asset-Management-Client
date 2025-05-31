const Footer = () => {
  return (
    <footer className="bg-gray-700 py-10 text-white">
      <div className="container px-4 lg:px-0">
        <div className="flex flex-wrap justify-between">
          {/* Company Info */}
          <div className="mb-8 w-full sm:w-1/2 md:w-1/4">
            <h2 className="text-lg font-bold">AssetAura</h2>
            <p className="mt-2 max-w-[280px] text-gray-400">
              Efficient and effective asset management.
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick Links" className="mb-8 w-full sm:w-1/2 md:w-1/4">
            <h2 className="text-lg font-bold">Quick Links</h2>
            <ul className="mt-2 space-y-2">
              <li><a href="/" className="hover:underline">Dashboard</a></li>
              <li><a href="/" className="hover:underline">Profile</a></li>
              <li><a href="/" className="hover:underline">Reports</a></li>
              <li><a href="/" className="hover:underline">Settings</a></li>
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-label="Resources" className="mb-8 w-full sm:w-1/2 md:w-1/4">
            <h2 className="text-lg font-bold">Resources</h2>
            <ul className="mt-2 space-y-2">
              <li><a href="/" className="hover:underline">Help Center</a></li>
              <li><a href="/" className="hover:underline">FAQ</a></li>
              <li><a href="/" className="hover:underline">Blog</a></li>
              <li><a href="/" className="hover:underline">Contact Us</a></li>
            </ul>
          </nav>

          {/* Contact Info */}
          <div className="mb-8 w-full sm:w-1/2 md:w-1/4">
            <h2 className="text-lg font-bold">Contact Us</h2>
            <p className="mt-2 text-gray-400">Email: <a href="mailto:support@assetaura.com" className="underline">support@assetaura.com</a></p>
            <p className="mt-1 text-gray-400">Phone: <a href="tel:+1234567890" className="underline">(123) 456-7890</a></p>
            <div className="mt-4 flex space-x-4">
              <a
                href="/"
                aria-label="Facebook"
                className="text-blue-400 hover:text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="/"
                aria-label="Twitter"
                className="text-blue-300 hover:text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="/"
                aria-label="Instagram"
                className="text-pink-600 hover:text-pink-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="/"
                aria-label="LinkedIn"
                className="text-blue-600 hover:text-blue-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
          <p>&copy; 2024 AssetAura. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
