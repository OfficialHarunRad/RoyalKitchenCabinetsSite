"use client";

import { motion } from "framer-motion";
import {
  FiChevronRight,
  FiPhone,
  FiMail,
  FiMapPin,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useState } from "react";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import PdfViewer from "./PDFViewer";

const carouselPhotos = [
  { src: "/kitchen1.jpg", alt: "Modern Kitchen 1" },
  { src: "/kitchen2.jpg", alt: "Modern Kitchen 2" },
  { src: "/kitchen3.jpg", alt: "Modern Kitchen 3" },
  { src: "/kitchen4.jpg", alt: "Modern Kitchen 4" },
];

function HeroCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
  };

  return (
    <Slider {...settings} className="h-full w-full">
      {carouselPhotos.map((photo, idx) => (
        <div key={idx} className="relative h-[80vh] w-full">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-neutral-950 to-transparent h-1/3 z-10" />
        </div>
      ))}
    </Slider>
  );
}

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState<string | null>(null);
  const [contactError, setContactError] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-[#e0ba6c]/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Side - Logo and Company Name */}
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 md:h-16 md:w-16">
              <Image
                src="/RKC_Icon.svg"
                alt="Royal Kitchen Cabinets"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="border-l border-[#e0ba6c]/20 pl-4">
              <h1 className="text-base md:text-lg font-serif tracking-wider text-white">
                ROYAL KITCHEN CABINETS
              </h1>
              <p className="text-xs text-white font-mono mt-0.5">EST. 2024</p>
            </div>
          </div>

          {/* Right Side - Navigation Links */}
          <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-8">
              <motion.button
                whileHover={{ y: -2 }}
                onClick={() =>
                  document
                    .getElementById("gallery")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-[#e0ba6c] hover:text-[#d1ab5d] font-medium text-sm uppercase tracking-wider transition-colors"
              >
                Gallery
              </motion.button>
              <motion.button
                whileHover={{ y: -2 }}
                onClick={() =>
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-[#e0ba6c] hover:text-[#d1ab5d] font-medium text-sm uppercase tracking-wider transition-colors"
              >
                Materials
              </motion.button>
              <motion.button
                whileHover={{ y: -2 }}
                onClick={() =>
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-[#e0ba6c] hover:text-[#d1ab5d] font-medium text-sm uppercase tracking-wider transition-colors"
              >
                Process
              </motion.button>
            </div>

            <button
              onClick={() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-[#e0ba6c] hover:bg-[#d1ab5d] text-neutral-950 px-6 py-2 rounded-full font-medium flex items-center gap-2 text-sm uppercase tracking-wider"
            >
              Contact
            </button>
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#e0ba6c] ml-4"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-neutral-900/95 backdrop-blur-lg mt-4 rounded-lg p-4">
            <div className="flex flex-col gap-4">
              <button
                onClick={() =>
                  document
                    .getElementById("gallery")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-[#e0ba6c] hover:text-[#d1ab5d] py-2 px-4 rounded hover:bg-neutral-800"
              >
                Gallery
              </button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  document
                    .getElementById("catalog")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="border border-neutral-700 hover:border-[#e0ba6c]/50 hover:text-[#e0ba6c] font-medium px-6 py-3 rounded-lg text-sm"
              >
                View Catalog
              </motion.button>

              <button
                onClick={() =>
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-[#e0ba6c] hover:text-[#d1ab5d] py-2 px-4 rounded hover:bg-neutral-800"
              >
                Materials
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-[#e0ba6c] hover:text-[#d1ab5d] py-2 px-4 rounded hover:bg-neutral-800"
              >
                Process
              </button>
              <button
                onClick={() => {
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full bg-[#e0ba6c] hover:bg-[#d1ab5d] text-neutral-950 py-2 px-4 rounded-lg font-medium mt-2"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-[80vh]">
        <div className="absolute inset-0">
          <HeroCarousel />
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-neutral-950 to-transparent h-1/3 z-10" />
        <div className="absolute bottom-8 left-8 z-20 text-sm text-[#e0ba6c] hidden sm:block">
          ← Drag to rotate | Scroll to zoom →
        </div>

        <div className="relative z-20 h-full flex items-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto sm:mx-0 text-center sm:text-left"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#e0ba6c] to-[#d1ab5d]">
                Custom Crafted
              </span>{" "}
              Excellence
            </h2>
            <p className="text-neutral-400 mb-6 text-base sm:text-lg">
              Where exceptional materials meet timeless design.
            </p>
            <div className="flex gap-3 flex-col sm:flex-row">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-[#e0ba6c] hover:bg-[#d1ab5d] text-neutral-950 font-medium px-6 py-3 rounded-lg flex items-center gap-2 text-sm w-full sm:w-auto"
              >
                Begin Design Consultation <FiChevronRight />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  document
                    .getElementById("gallery")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="border border-neutral-700 hover:border-[#e0ba6c]/50 hover:text-[#e0ba6c] font-medium px-6 py-3 rounded-lg text-sm w-full sm:w-auto"
              >
                View Portfolio
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 bg-neutral-950 border-t border-neutral-800"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-[#e0ba6c] text-sm uppercase tracking-widest mb-3 font-mono">
              Uncompromising Quality
            </h3>
            <h2 className="text-3xl font-bold mb-4">Craftsmanship Redefined</h2>
            <div className="w-16 h-px bg-[#e0ba6c]/50 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Solid Wood Construction",
                desc: "Premium hardwoods selected for durability and beauty",
              },
              {
                title: "Custom Finishes",
                desc: "Hand-applied stains and protective coatings",
              },
              {
                title: "Soft-Close Hardware",
                desc: "Silent, smooth operation for all drawers and doors",
              },
              {
                title: "Adjustable Shelving",
                desc: "Customizable interior configurations",
              },
              {
                title: "Dovetail Joinery",
                desc: "Time-tested construction methods",
              },
              {
                title: "Lifetime Warranty",
                desc: "Guaranteed to last for generations",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -3 }}
                className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg hover:border-[#e0ba6c]/30 transition-all"
              >
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-neutral-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {carouselPhotos.map((photo, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.01 }}
                className="relative aspect-[4/3] rounded-xl overflow-hidden group"
              >
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/10 to-transparent z-10" />

                {/* Text content (you can adjust or remove) */}
                <div className="absolute bottom-0 left-0 p-6 z-20">
                  <h3 className="text-xl font-medium text-white">
                    {photo.alt}
                  </h3>
                  <p className="text-[#e0ba6c] text-sm">View Collection</p>
                </div>

                {/* Image */}
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section
        id="catalog"
        className="py-20 bg-neutral-950 border-t border-neutral-800"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-[#e0ba6c] text-sm uppercase tracking-widest mb-3 font-mono">
              Product Catalog
            </h3>
            <h2 className="text-3xl font-bold mb-4">
              Explore Our Cabinet Collections
            </h2>
            <div className="w-16 h-px bg-[#e0ba6c]/50 mx-auto" />
          </div>

          <PdfViewer file="/Royal_Kitchen_Cabinets_Product_Catalog.pdf" />
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 bg-neutral-950 border-t border-neutral-800"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-[#e0ba6c] text-sm uppercase tracking-widest mb-3 font-mono">
                Get Started
              </h3>
              <h2 className="text-2xl font-bold mb-6">
                Schedule a Consultation
              </h2>
              <p className="text-neutral-400 mb-8">
                Our design specialists will guide you through creating your
                dream kitchen.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="text-[#e0ba6c]">
                    <FiPhone />
                  </div>
                  <div>
                    <p className="text-neutral-400 text-sm">Phone</p>
                    <p>(816) 935-4899</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-[#e0ba6c]">
                    <FiMail />
                  </div>
                  <div>
                    <p className="text-neutral-400 text-sm">Email</p>
                    <p>Bradoncic@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-[#e0ba6c]">
                    <FiMapPin />
                  </div>
                  <div>
                    <p className="text-neutral-400 text-sm">Address</p>
                    <p>3544 NE Antioch RD</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-6">Contact Form</h3>
              <form className="space-y-4" onSubmit={async (e) => {
                e.preventDefault();
                setContactError(null);
                setContactSuccess(null);
                if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
                  setContactError("Please fill out all fields.");
                  return;
                }
                setContactLoading(true);
                try {
                  const res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: contactName, email: contactEmail, message: contactMessage })
                  });
                  const data = await res.json();
                  if (!res.ok) throw new Error(data?.error || data?.message || 'Failed to send');
                  setContactSuccess('Message sent — we will respond shortly.');
                  setContactName('');
                  setContactEmail('');
                  setContactMessage('');
                } catch (err: any) {
                  setContactError(err?.message || 'An error occurred while sending');
                } finally {
                  setContactLoading(false);
                }
              }}>
                <div>
                  <input
                    name="name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    type="text"
                    placeholder="Name"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#e0ba6c]/50"
                  />
                </div>
                <div>
                  <input
                    name="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#e0ba6c]/50"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Project Details"
                    rows={4}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#e0ba6c]/50"
                  />
                </div>
                <div>
                  {contactError && (
                    <p className="text-sm text-red-400 mb-2">{contactError}</p>
                  )}
                  {contactSuccess && (
                    <p className="text-sm text-green-400 mb-2">{contactSuccess}</p>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={contactLoading}
                    className="w-full bg-[#e0ba6c] hover:bg-[#d1ab5d] text-neutral-950 font-medium py-2.5 px-6 rounded-lg text-sm disabled:opacity-60"
                  >
                    {contactLoading ? 'Sending…' : 'Submit Inquiry'}
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-950 border-t border-neutral-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="relative h-16 w-16">
              <Image
                src="/RKC_Icon.svg"
                alt="Royal Kitchen Cabinets"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="border-l border-[#e0ba6c]/20 pl-4">
              <h3 className="font-serif text-white">ROYAL KITCHEN CABINETS</h3>
              <p className="text-white text-sm">EST. 2024</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-sm font-medium text-neutral-300 mb-4">
                Explore
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-neutral-500 hover:text-[#e0ba6c] text-sm transition-colors"
                  >
                    Gallery
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-neutral-500 hover:text-[#e0ba6c] text-sm transition-colors"
                  >
                    Materials
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-neutral-500 hover:text-[#e0ba6c] text-sm transition-colors"
                  >
                    Process
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-neutral-300 mb-4">
                Services
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-neutral-500 hover:text-[#e0ba6c] text-sm transition-colors"
                  >
                    Custom Design
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-neutral-500 hover:text-[#e0ba6c] text-sm transition-colors"
                  >
                    Installation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-neutral-500 hover:text-[#e0ba6c] text-sm transition-colors"
                  >
                    Consultation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-neutral-300 mb-4">
                Connect
              </h4>
              <div className="flex gap-4 mb-4">
                {["Instagram", "Pinterest", "Tiktok"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-neutral-500 hover:text-[#e0ba6c] text-sm transition-colors"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-neutral-800 text-center">
            <p className="text-neutral-600 text-sm">
              © 2024 Royal Kitchen Cabinets. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
