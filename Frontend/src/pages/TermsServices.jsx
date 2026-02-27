import React from "react";

const TermsServices = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-10 rounded-lg shadow-md space-y-6">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">
          Terms & Conditions
        </h1>

        <p className="text-gray-600 dark:text-gray-300">
          Welcome to JobPortal! By accessing or using our website and services, you agree to comply with the following terms and conditions. Please read them carefully.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">1. User Responsibilities</h2>
        <p className="text-gray-600 dark:text-gray-300">
          All users are required to provide accurate, up-to-date information when registering or posting content. You are responsible for maintaining the confidentiality of your account credentials. Any activity conducted under your account is your responsibility.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">2. Prohibited Activities</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Users must not:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
          <li>Post false, misleading, or fraudulent job listings.</li>
          <li>Engage in harassment, spam, or abusive behavior.</li>
          <li>Attempt to access unauthorized parts of the website.</li>
          <li>Use JobPortal for illegal activities.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">3. Account Termination</h2>
        <p className="text-gray-600 dark:text-gray-300">
          JobPortal reserves the right to suspend or terminate accounts that violate these terms, without prior notice. Terminated users may lose access to their posted jobs, saved applications, or personal data.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">4. Limitation of Liability</h2>
        <p className="text-gray-600 dark:text-gray-300">
          JobPortal acts as a platform connecting job seekers and recruiters. We are not responsible for employment decisions, interview outcomes, or disputes between users and companies.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">5. Intellectual Property</h2>
        <p className="text-gray-600 dark:text-gray-300">
          All content on JobPortal, including logos, text, images, and software, is protected by intellectual property laws. Users may not reproduce or distribute content without permission.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">6. Modifications</h2>
        <p className="text-gray-600 dark:text-gray-300">
          We may update these terms at any time. Users are encouraged to review them periodically. Continued use of the platform constitutes acceptance of any changes.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">7. Governing Law</h2>
        <p className="text-gray-600 dark:text-gray-300">
          These terms are governed by the laws of India. Any disputes will be resolved in the courts located in Bangalore, India.
        </p>

        <p className="mt-8 text-sm text-gray-500">
          Effective Date: {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default TermsServices;