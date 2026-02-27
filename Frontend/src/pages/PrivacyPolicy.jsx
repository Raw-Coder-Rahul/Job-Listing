import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-10 rounded-lg shadow-md space-y-6">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">
          Privacy Policy
        </h1>

        <p className="text-gray-600 dark:text-gray-300">
          At JobPortal, protecting your personal information is our priority. This Privacy Policy explains what data we collect, how we use it, and your rights.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
        <p className="text-gray-600 dark:text-gray-300">
          We collect:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
          <li>Personal details: name, email, phone number.</li>
          <li>Professional data: resume, skills, experience.</li>
          <li>Usage data: pages visited, job searches, clicks.</li>
          <li>Device & browser information for analytics.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">2. How We Use Information</h2>
        <p className="text-gray-600 dark:text-gray-300">
          We use your information to:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
          <li>Connect you with recruiters and job opportunities.</li>
          <li>Improve platform functionality and services.</li>
          <li>Send important updates and notifications.</li>
          <li>Prevent fraud and ensure secure usage.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">3. Cookies & Tracking</h2>
        <p className="text-gray-600 dark:text-gray-300">
          We use cookies and analytics tools to enhance your experience. You can manage cookies through your browser settings.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">4. Data Security</h2>
        <p className="text-gray-600 dark:text-gray-300">
          We implement industry-standard security measures to protect your personal data from unauthorized access, alteration, or disclosure.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">5. Sharing & Third Parties</h2>
        <p className="text-gray-600 dark:text-gray-300">
          We do not sell your data. Personal information may be shared only with trusted recruiters and service providers for legitimate business purposes.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">6. User Rights</h2>
        <p className="text-gray-600 dark:text-gray-300">
          You can request access, correction, or deletion of your personal information by contacting support@jobportal.com.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">7. Changes to Privacy Policy</h2>
        <p className="text-gray-600 dark:text-gray-300">
          We may update this policy periodically. Changes will be posted on this page with the last updated date.
        </p>

        <p className="mt-8 text-sm text-gray-500">
          Last updated: {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;