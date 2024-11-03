import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className=" bg-gradient-to-l from-teal-100 to-purple-100 text-gray-700 py-10 lg:px-32 lg:py-16">
      <div className="container mx-auto px-5  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Categories Section */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">Categories</h3>
          <ul className="space-y-2">
            {["Graphics & Design", "Digital Marketing", "Writing & Translation", "Video & Animation", "Music & Audio", "Programming & Tech", "Business", "Lifestyle", "Sitemap"].map((category) => (
              <li key={category}>
                <a href="#" className="hover:underline">{category}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* About Section */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">About</h3>
          <ul className="space-y-2">
            {["Careers", "Press & News", "Partnerships", "Privacy Policy", "Terms of Service", "Intellectual Property Claims", "Investor Relations"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:underline">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">Support</h3>
          <ul className="space-y-2">
            {["Help & Support", "Trust & Safety", "Selling on CampusBid", "Buying on CampusBid"].map((supportItem) => (
              <li key={supportItem}>
                <a href="#" className="hover:underline">{supportItem}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Community Section */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">Community</h3>
          <ul className="space-y-2">
            {["Events", "Blog", "Forum", "Community Standards", "Podcast", "Affiliates", "Invite a Friend", "Become a Seller"].map((communityItem) => (
              <li key={communityItem}>
                <a href="#" className="hover:underline">{communityItem}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* More From CampusBid Section */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">More From CampusBid</h3>
          <ul className="space-y-2">
            {["CampusBid Pro", "CampusBid Studios", "CampusBid Logo Maker", "Get Inspired", "Content Marketing", "Invoice Software", "Online Courses"].map((moreItem) => (
              <li key={moreItem}>
                <a href="#" className="hover:underline">{moreItem}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto px-5 mt-8 text-center border-t border-gray-200 pt-6">
        <div className="flex flex-col items-center lg:flex-row lg:justify-between">
          <div className="flex items-center space-x-2">
            <img src="/assets/icons/favicon.ico" alt="CampusBid Logo" className="w-10 h-10" /> {/* Replace with actual logo path */}
            <span className="text-gray-500">© Copyright 2024 CampusBid. All Rights Reserved</span>
          </div>
          <div className="flex space-x-4 mt-4 lg:mt-0">
            <a href="#" className="hover:text-blue-500"><i className="fab fa-facebook"></i></a>
            <a href="#" className="hover:text-blue-500"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-blue-500"><i className="fab fa-linkedin"></i></a>
            <a href="#" className="hover:text-pink-500"><i className="fab fa-pinterest"></i></a>
            <a href="#" className="hover:text-gray-500"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
