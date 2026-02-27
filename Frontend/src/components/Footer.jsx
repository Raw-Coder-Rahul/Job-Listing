import React, { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    // Integrate API here for real newsletter subscription
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Top Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">

            {/* Brand */}
            <div className="col-span-1">
                <h2 className="text-2xl font-bold text-white mb-4">JobPortal</h2>
                <p className="text-sm leading-relaxed text-gray-400">
                Connecting talented professionals with top companies worldwide.
                Find your dream job, grow your career, and achieve success with us.
                </p>
            </div>

            {/* Quick Links */}
            <div>
                <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                    <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                    <li><Link to="/jobs" className="hover:text-white transition">Browse Jobs</Link></li>
                    <li><Link to="/post-job" className="hover:text-white transition">Post a Job</Link></li>
                    <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
                    <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
                </ul>
            </div>

            {/* Resources */}
            <div>
                <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
                <ul className="space-y-2 text-sm">
                    <li><Link to="/career-advice" className="hover:text-white transition">Career Advice</Link></li>
                    <li><Link to="/resume-builder" className="hover:text-white transition">Resume Builder</Link></li>
                    <li><Link to="/interview-tips" className="hover:text-white transition">Interview Tips</Link></li>
                    <li><Link to="/help-center" className="hover:text-white transition">Help Center</Link></li>
                    <li><Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link></li>
                    <li><Link to="/terms-services" className="hover:text-white transition">Terms & Services</Link></li>
                </ul>
            </div>

            {/* Contact */}
            <div>
                <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
                <div className="space-y-3 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                        <Mail size={16} />
                        <a href="mailto:support@jobportal.com" className="hover:text-white transition">support@jobportal.com</a>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone size={16} />
                        <a href="tel:+919876543210" className="hover:text-white transition">+91 98765 43210</a>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>Bangalore, India</span>
                    </div>
                </div>
                <div className="flex gap-4 mt-6">
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                        <Linkedin size={20} className="hover:text-white transition" />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noreferrer">
                        <Github size={20} className="hover:text-white transition" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer">
                        <Twitter size={20} className="hover:text-white transition" />
                    </a>
                </div>
            </div>

            {/* Newsletter */}
            <div>
                <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
                <p className="text-sm text-gray-400 mb-4">
                    Subscribe to get the latest job openings and career tips.
                </p>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 items-stretch">
                    <div className="flex-1">
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email"
                            label=""
                            className="h-full"
                        />
                    </div>
                    <div className="sm:flex-shrink-0">
                        <Button type="submit" className="h-full w-full sm:w-auto"> Subscribe</Button>
                    </div>
                </form>
                {submitted && (
                    <p className="mt-2 text-green-400 text-sm">Thank you for subscribing!</p>
                )}
            </div>
            </div>

            {/* Divider & Bottom */}
            <div className="border-t border-gray-700 pt-6 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-2">
                <span>© {new Date().getFullYear()} JobPortal. All rights reserved.</span>
                <span>
                    Developed by <a href="https://github.com" className="hover:text-white transition">YourCompany</a>
                </span>
            </div>
        </div>
    </footer>
  );
};

export default Footer;