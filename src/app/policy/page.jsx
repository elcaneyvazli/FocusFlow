import React from "react";

export default function page() {
  return (
    <div className="p-32 bg-background text-text">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-6">
        <strong>Effective Date:</strong> [Effective Date]
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
        <p>
          FocusFlow is committed to protecting your privacy. This Privacy Policy
          explains how we collect, use, and share your information across our
          application, which includes task management features, Google Calendar
          integration, and any other functionalities provided by our project.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          2. Information We Collect
        </h2>
        <p className="mb-2">
          We may collect the following categories of information to improve user
          experience, deliver our services, and comply with legal obligations:
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            <strong>Personal Information:</strong> When you register or create a
            profile, we may collect details such as your name, email address,
            phone number, and other contact information. Additional information
            you provide when contacting support or through other communications.
          </li>
          <li>
            <strong>Usage Data:</strong> Technical data such as your device
            information, IP address, browser type, session duration, and other
            metrics when you interact with our application. Information
            regarding your navigation and interaction with our app’s features.
          </li>
          <li>
            <strong>Third-Party Integrations:</strong>{" "}
            <em>Google Calendar Integration:</em> If you choose to connect your
            Google account, we will access your calendar data (such as events,
            reminders, etc.) via Google OAuth. This may include your name and
            email address. Data from other third-party services integrated into
            our application will be collected and processed according to their
            respective privacy policies.
          </li>
          <li>
            <strong>Cookies and Tracking Technologies:</strong> We may use
            cookies or similar tracking technologies on our website and mobile
            app to enhance your experience and collect analytical data.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          3. How We Use Your Information
        </h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            <strong>Service Provision:</strong> Creating, managing, and
            verifying user accounts; delivering task management functionalities,
            notifications, and reminders; enabling integration with Google
            Calendar and other third-party services.
          </li>
          <li>
            <strong>Personalization and Improvement:</strong> Customizing your
            user experience and enhancing overall app performance; conducting
            analytics to understand user behavior and improve our services.
          </li>
          <li>
            <strong>Communication and Support:</strong> Sending updates,
            announcements, and support-related communications; responding to
            inquiries, feedback, or issues raised by users.
          </li>
          <li>
            <strong>Legal and Security Purposes:</strong> Complying with legal
            obligations and addressing security risks or fraudulent activities.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          4. Sharing and Protecting Your Information
        </h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            <strong>Third-Party Service Providers:</strong> We may share your
            data with trusted third-party service providers (such as Google,
            payment processors, and analytics providers) who assist in
            delivering our services. These providers are bound by their own
            privacy policies and contractual obligations to protect your
            information.
          </li>
          <li>
            <strong>Legal Requirements:</strong> We may disclose your
            information if required by law, for example, in response to legal
            processes, subpoenas, or governmental requests.
          </li>
          <li>
            <strong>Security Measures:</strong> We implement a variety of
            technical and administrative safeguards to protect your personal
            data from unauthorized access, alteration, disclosure, or
            destruction.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          5. Third-Party Integrations
        </h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            <strong>Google Calendar:</strong> By connecting your Google account,
            our application can access your calendar data to create, update, or
            delete events as necessary. Access is provided through Google OAuth,
            and we adhere strictly to Google’s API Services User Data Policy
            when handling your information.
          </li>
          <li>
            <strong>Other Integrations:</strong> Any additional third-party
            services integrated into our application will process data in
            accordance with their own privacy policies.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">6. Your Rights</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            <strong>Access and Correction:</strong> You may request access to
            the personal data we hold about you and ask for corrections if any
            information is inaccurate.
          </li>
          <li>
            <strong>Deletion:</strong> You have the right to request the
            deletion of your personal data, subject to any legal obligations
            requiring data retention.
          </li>
          <li>
            <strong>Objection:</strong> You may object to certain processing
            activities or request that we restrict how your data is processed.
          </li>
          <li>
            <strong>Data Portability:</strong> You can request your personal
            data in a commonly used, machine-readable format or request its
            transfer to another service where applicable.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">7. Children's Privacy</h2>
        <p>
          Our application is not intended for children under 13 years of age. We
          do not knowingly collect personal data from children under 13. Should
          we discover that personal data from a child under 13 has been
          inadvertently collected, we will take prompt steps to delete the data.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          8. Changes to This Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or applicable laws. When changes are made, the
          updated policy will be posted on our website and/or communicated via
          the application. We encourage you to review this policy periodically
          for any updates.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">9. Contact Us</h2>
        <p className="mb-2">
          If you have any questions, concerns, or requests regarding this
          Privacy Policy, please contact us at:
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            <strong>Email:</strong> elcaneyvazli77@gmail.com
          </li>
          <li>
            <strong>Website:</strong> www.focusflow.com
          </li>
        </ul>
      </section>
    </div>
  );
}
