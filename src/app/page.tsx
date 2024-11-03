"use client";
import React from 'react';
import { FaSearch, FaCheckCircle, FaStar } from 'react-icons/fa';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-700 relative">
      {/* Background Net Design */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="h-full w-full bg-gray-200">
          <div className="h-full w-full bg-white opacity-10" style={{
            backgroundImage: 'linear-gradient(to right, transparent 49.5%, rgba(255, 255, 255, 0.2) 49.5%, rgba(255, 255, 255, 0.2) 50.5%, transparent 50.5%), linear-gradient(to bottom, transparent 49.5%, rgba(255, 255, 255, 0.2) 49.5%, rgba(255, 255, 255, 0.2) 50.5%, transparent 50.5%)',
            backgroundSize: '20px 20px',
          }} />
        </div>
      </div>

      <Header />

      <div className='pt-[72px]'>
        <section className="text-center py-20 px-6 bg-gradient-to-l from-teal-200 to-purple-100 lg:px-36 flex flex-col md:justify-between md:items-center md:flex-row">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight animate-fade-in">
              The work you want, <span className='text-teal-500'>The bids you need</span><span className='text-gray-800'>.</span>
            </h1>
            <p className="mt-5 text-gray-500 max-w-3xl mx-auto text-xl animate-fade-in">
              Find Exceptional Freelance Services for Your Projects
            </p>

            <div className="mt-10 flex justify-center items-center flex-col md:flex-row">
              <select className="px-4 py-2 border border-gray-300 rounded-t-full md:rounded-l-full md:rounded-r-none focus:outline-none transition duration-200 bg-white">
                <option>All</option>
                <option>Logo Design</option>
                <option>Articles & Blog Posts</option>
              </select>
              <input
                type="text"
                placeholder="Find Services..."
                className="px-4 py-2 w-72 border-t md:border border-gray-300 focus:outline-none transition duration-200"
              />
              <button className="flex items-center justify-center px-6 py-3 bg-teal-600 text-white rounded-b-full md:rounded-r-full md:rounded-l-none hover:bg-teal-700 transition duration-200 transform hover:scale-105 shadow-lg">
                <FaSearch />
              </button>
            </div>

            {/* Popular Tags */}
            <div className="mt-6 space-x-2 text-teal-600 flex justify-center flex-wrap gap-2">
              {['Popular', 'Logo Design', 'Articles & Blog Posts'].map((tag) => (
                <span key={tag} className="px-4 py-2 bg-gray-200 text-sm rounded-full cursor-pointer hover:bg-teal-200 transition duration-200 shadow-md">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Image Section */}
          <div className="mt-8 md:mt-0 flex justify-center items-center">
            <img
              src="/assets/icons/search.jpg" // Replace with your image URL
              alt="Description of Image"
              className="rounded-lg shadow-lg max-w-full h-auto max-h-96 object-cover"
            />
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose CampusBid?</h2>
            <p className="text-gray-500 mb-10">
              Discover the benefits of working with CampusBid for all your freelancing needs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Verified Freelancers', icon: FaCheckCircle, text: 'Connect with trusted professionals only.' },
                { title: 'Affordable Prices', icon: FaCheckCircle, text: 'Competitive pricing for every budget.' },
                { title: 'Quality Assurance', icon: FaCheckCircle, text: 'Ensuring top-notch results every time.' },
              ].map((feature) => (
                <div key={feature.title} className="p-6 border rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                  <feature.icon className="text-teal-600 text-4xl mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                  <p className="mt-2 text-gray-500">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
            <p className="text-gray-500 mb-10">
              Join thousands of satisfied clients who trust CampusBid for quality services.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { name: 'John Doe', text: 'CampusBid connected me with the right professionals effortlessly!', rating: 5 },
                { name: 'Jane Smith', text: 'Exceptional service and fantastic results every time.', rating: 5 },
                { name: 'Mark Lee', text: 'A seamless experience from start to finish.', rating: 5 },
              ].map((testimonial, index) => (
                <div key={index} className="p-6 max-w-xs bg-white border rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                  <FaStar className="text-teal-600 text-3xl mb-4 mx-auto" />
                  <p className="text-gray-500">"{testimonial.text}"</p>
                  <p className="mt-4 font-semibold text-gray-800">{testimonial.name}</p>
                  <div className="flex justify-center mt-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-500" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="py-16 bg-gradient-to-r from-teal-500 to-teal-400 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="mb-8 text-lg">
            Join CampusBid today and explore endless opportunities to grow your business.
          </p>
          <button className="px-6 py-3 bg-white text-teal-600 font-semibold rounded-full hover:bg-gray-100 transition duration-200 transform hover:scale-105 shadow-lg">
            Get Started Now
          </button>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-500 mb-10">
              Have questions? We’ve got answers!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { question: 'How does CampusBid work?', answer: 'CampusBid connects you with top freelancers for your project needs.' },
                { question: 'What services can I find on CampusBid?', answer: 'You can find a wide range of services, including design, writing, and programming.' },
                { question: 'How do I hire a freelancer?', answer: 'Simply browse through profiles, read reviews, and reach out to hire the best fit.' },
                { question: 'Is there a fee to join?', answer: 'No, joining CampusBid is free for clients.' },
              ].map((faq, index) => (
                <div key={index} className="p-6 border rounded-lg shadow-lg">
                  <h3 className="font-semibold text-gray-800">{faq.question}</h3>
                  <p className="mt-2 text-gray-500">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Highlights Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Latest from Our Blog</h2>
            <p className="text-gray-500 mb-10">Stay updated with our latest articles and insights.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: '5 Tips to Find the Perfect Freelancer', excerpt: 'Discover key strategies for hiring the right talent.', date: 'Oct 10, 2024' },
                { title: 'Maximize Your Project Budget', excerpt: 'Learn how to get the best value from your projects.', date: 'Oct 15, 2024' },
                { title: 'Freelancing Trends to Watch', excerpt: 'Stay ahead with the latest trends in freelancing.', date: 'Oct 20, 2024' },
              ].map((blog, index) => (
                <div key={index} className="p-6 bg-white border rounded-lg shadow-lg">
                  <h3 className="font-semibold text-gray-800">{blog.title}</h3>
                  <p className="mt-2 text-gray-500">{blog.excerpt}</p>
                  <p className="mt-4 text-gray-400 text-sm">{blog.date}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Freelancers Section */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Freelancers</h2>
            <p className="text-gray-500 mb-10">Meet some of the top talents on CampusBid.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Alice Johnson', expertise: 'Graphic Designer', imgSrc: '/assets/freelancers/alice.jpg' },
                { name: 'Bob Smith', expertise: 'Content Writer', imgSrc: '/assets/freelancers/bob.jpg' },
                { name: 'Charlie Brown', expertise: 'Web Developer', imgSrc: '/assets/freelancers/charlie.jpg' },
              ].map((freelancer, index) => (
                <div key={index} className="p-6 bg-gray-100 border rounded-lg shadow-lg">
                  <img src={freelancer.imgSrc} alt={freelancer.name} className="rounded-full w-24 h-24 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-800">{freelancer.name}</h3>
                  <p className="text-gray-500">{freelancer.expertise}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
