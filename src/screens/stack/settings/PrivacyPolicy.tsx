import React from "react";
import { StyleSheet } from "react-native";
import TextSecondary from "../../../components/shered/TextSecondary";
import SafeAreaProvider from "../../../providers/SafeAreaProvider";

const PrivacyPolicy = () => {
  return (
    <SafeAreaProvider backButtonText="Privacy Policy">
      <TextSecondary
        text="Privacy Policy – SalonPro
Your privacy is extremely important to us. This Privacy Policy explains how SalonPro collects, uses, and protects your personal information when you use our website and associated services.

1. Information We Collect
When you interact with SalonPro, we may collect the following types of information:

Profile Details: Full name, profile photo, phone number, email, and account credentials.
Salon Owner Information: Identification documents, business details, tax-related information, and salon service certifications (if required).
Task Data: Task history, offers made or received, task descriptions, categories, service prices, locations, and timelines.
Usage Data: Platform interactions such as task postings, bookings, chat messages, ratings, and feedback.
Device Information: Browser type, device model, operating system, IP address, and diagnostic logs for service improvement.

2. How We Use Your Information
We use your information to:

Operate and maintain platform functionality including user matching, communication, payments, and notifications.
Verify identities and prevent fraudulent activity.
Ensure regulatory and legal compliance.
Notify users about status updates, changes in policy, or promotions.
Optimize platform reliability, performance, and user experience.

3. Location Data
To facilitate location-based services:
Task Posters may share location data to define task locations.
Salon owners may share location details for service availability and nearby salon discovery.
Location data is never shared for marketing and is used solely for enabling services within the platform.

4. Messaging & Communication
Chats and messages exchanged on SalonPro are encrypted and stored securely. These are only accessible to the involved parties and are used solely to provide support and enhance service functionality.

5. Third-Party Services
SalonPro may utilize trusted third-party services for:
Payments (e.g., Stripe)
Analytics (e.g., Google Analytics)
Maps & Location (e.g., Google Maps)
Each service provider follows strict privacy standards and has independent policies.

6. Data Sharing & Disclosure
We do not sell or rent your personal information. Data may only be shared:
To comply with legal or regulatory requirements.
To enforce our [Terms & Conditions].
To protect the rights, safety, or property of SalonPro and its users.

7. Data Security
We implement industry-standard security practices including:
End-to-end encryption
Secure cloud storage
Access control and multi-layer authentication
Your data is safeguarded from unauthorized access and misuse.

8. Your Privacy Rights
As a user of SalonPro, you have the right to:
View and update your profile information.
Delete your account by contacting customer support.
Manage your notification and visibility settings.

9. Children’s Privacy
SalonPro is intended for users aged 18 and above. We do not knowingly collect information from minors. If such data is discovered, we will delete the account and associated information immediately.

10. Policy Updates
This Privacy Policy may be updated occasionally. You will be notified of any significant changes through the platform or email. Continued use of SalonPro confirms your acceptance of the latest version."
      />
    </SafeAreaProvider>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({});
