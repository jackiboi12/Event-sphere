import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-primary-500">Event</span>
              <span className="text-secondary-400">Sphere</span>
            </h3>
            <p className="text-neutral-400 mb-6">
              Discover amazing events, connect with like-minded people, and
              create unforgettable memories.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="text-neutral-400 hover:text-primary-400 transition-colors"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                className="text-neutral-400 hover:text-primary-400 transition-colors"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                className="text-neutral-400 hover:text-primary-400 transition-colors"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                className="text-neutral-400 hover:text-primary-400 transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Event Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Event Categories
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/search?type=conference"
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  Conferences
                </Link>
              </li>
              <li>
                <Link
                  to="/search?type=concert"
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  Concerts
                </Link>
              </li>
              <li>
                <Link
                  to="/search?type=workshop"
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  Workshops
                </Link>
              </li>
              <li>
                <Link
                  to="/search?type=sports"
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  Sports Events
                </Link>
              </li>
              <li>
                <Link
                  to="/search?type=exhibition"
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  Exhibitions
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/search?offer=true"
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  Featured Events
                </Link>
              </li>
              <li>
                <Link
                  to="/sign-in"
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  Log In
                </Link>
              </li>
              <li>
                <Link
                  to="/sign-up"
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary-400 mt-1 flex-shrink-0" />
                <span className="text-neutral-400">
                  123 streets 
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-primary-400 flex-shrink-0" />
                <span className="text-neutral-400">(91) 80022XXX</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-primary-400 flex-shrink-0" />
                <span className="text-neutral-400">contact@EventSphere.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 py-6 text-center text-neutral-500">
          <p>&copy; {currentYear} EventSphere Events. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
