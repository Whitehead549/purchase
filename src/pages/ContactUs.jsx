import React, { useState } from "react";
import Barcode from "react-barcode";

const ContactUs = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    houseAddress: "",
    country: "",
    phoneNumber: "",
    whatsappNumber: "",
    message: "",
  });

  // State to manage barcode data
  const [barcodeData, setBarcodeData] = useState("");

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate a short numeric identifier for the barcode
    const shortNumericId = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit number
    setBarcodeData(shortNumericId.toString());
  };

  return (
    <section className="relative px-6 md:px-12 lg:px-20 py-12">
      {/* Heading */}
      <h1 className="text-2xl md:text-4xl font-semibold text-center mb-8">
        Get in Touch with Nazee Creative Studios!
      </h1>

      {/* Contact Information */}
      <div className="text-center mb-12">
        <p className="text-[#000000] text-base md:text-lg mb-2">
          <strong>Email:</strong> contact@nazeecreativestudios.com
        </p>
        <p className="text-[#000000] text-base md:text-lg">
          <strong>Address:</strong> 1192 Maud Street, Wilmington, DE 19801
        </p>
      </div>

      {/* Contact Form */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl md:text-2xl font-semibold text-center mb-6">
          Use the form below to send us a message:
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-[#000000]">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#000300] focus:border-[#000300]"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email Address */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#000000]">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#000300] focus:border-[#000300]"
              placeholder="Enter your email address"
              required
            />
          </div>

          {/* House Address */}
          <div>
            <label htmlFor="houseAddress" className="block text-sm font-medium text-[#000000]">
              House Address
            </label>
            <input
              type="text"
              id="houseAddress"
              name="houseAddress"
              value={formData.houseAddress}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#000300] focus:border-[#000300]"
              placeholder="Enter your house address"
              required
            />
          </div>

          {/* Country */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-[#000000]">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#000300] focus:border-[#000300]"
              placeholder="Enter your country"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-[#000000]">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#000300] focus:border-[#000300]"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* WhatsApp Number */}
          <div>
            <label htmlFor="whatsappNumber" className="block text-sm font-medium text-[#000000]">
              WhatsApp Number
            </label>
            <input
              type="tel"
              id="whatsappNumber"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#000300] focus:border-[#000300]"
              placeholder="Enter your WhatsApp number"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[#000000]">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#000300] focus:border-[#000300]"
              placeholder="Enter your message"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-8 py-3 bg-[#000300] text-white font-semibold text-lg rounded-full shadow-md hover:bg-gray-800 hover:shadow-lg transition-transform transform hover:scale-105"
            >
              Generate Barcode
            </button>
          </div>
        </form>

        {/* Barcode Display */}
        {barcodeData && (
          <div className="mt-12 text-center">
            <h2 className="text-xl md:text-2xl font-semibold mb-6">
              Generated Barcode
            </h2>
            <div className="flex justify-center">
              <Barcode
                value={barcodeData}
                format="EAN13" // Use EAN13 for a shorter numeric barcode
                width={1.2} // Adjust width for a smaller barcode
                height={50} // Adjust height for a smaller barcode
              />
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Barcode ID: <strong>{barcodeData}</strong>
            </p>
          </div>
        )}
      </div>

      {/* Separator */}
      <div className="w-full h-[2px] bg-gray-200 mt-12"></div>
    </section>
  );
};

export default ContactUs;