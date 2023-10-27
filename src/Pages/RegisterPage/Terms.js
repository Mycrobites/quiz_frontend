import { useState } from "react";

import Loader from "../../Components/Loader/LoadingBar";

import "./Register.css";

const Terms = () => {

  const [loading, setLoading] = useState(false);


  return (
    <div className="login-page">
      <div className="login-clip-path">
      <div id="centered-div">
        {/* <h1>Terms and Conditions</h1> */}

  <p>Introduction: By using this platform, you agree to these terms and conditions.</p>
        <p>User Consent: By creating an account, you consent to the collection, storage, and use of your data by Knotters for educational, research, training, and marketing purposes.</p>
        <p>Data Usage: Your data, including test scores, performance metrics, and feedbacks, may be used in various ways, including but not limited to improving our educational services, training modules, conducting research, and enhancing the user experience.</p>
        <p>Data Anonymization: Your data may be anonymized and aggregated to protect your identity and privacy, if required.</p>
        <p>Opt-Out Option: You have the option to opt out of any data usage related to result showcasing at any time by contacting the admin or mailing to contact@knotters.org.</p>
        <p>Data Security: We are committed to ensuring the security and confidentiality of your data and will take all reasonable precautions to protect it.</p>
        <p>Cookies and Tracking: We may use cookies and tracking technologies to improve the platform's functionality, your user experience, and helping in conducting research.</p>
        <p>Use for Marketing: You consent to the use of generalized results for marketing and promotional purposes by Knotters Community and its associated partners, service providers, entities, businesses, etc. to attract potential students, developers, service providers, public & private investors, etc.</p>
        <p>User Responsibilities: You are responsible for maintaining the confidentiality of your account information and ensuring its proper use.</p>
        <p>User Conduct: You agree not to engage in any harmful, disruptive, or illegal activities on the platform through your own account or anyone else’s account.</p>
        <p>Content Ownership: All content provided, developed & shared on the platform is the property of Knotters Community and its associated partners and/or service providers and may not be reproduced without permission.</p>
        <p>Updates and Changes: We may update or change these terms and conditions, and the same shall be communicated to you within 2 days. It is your responsibility to stay informed about any modifications.</p>
        <p>Notification of Changes: You will be notified in advance of any significant changes to the data usage policy, giving you the opportunity to review and make informed decisions.</p>
        <p>Termination: We reserve the right to terminate or suspend your account if you violate these terms and conditions.</p>
        <p>Limitation of Liability: Knotters Community and its associated partners, service providers, entities, businesses, etc. are not liable for any direct or indirect damages resulting from your use of the platform.</p>
        <p>Indemnification: You agree to indemnify and hold Knotters Community and its associated partners, entities, etc. harmless from any claims or damages arising from your use of the platform.</p>
        <p>Governing Law: These terms and conditions are governed by Indian laws, and any disputes will be subject to the jurisdiction of Indian courts.</p>
        <p>Contact Information: If you have any questions or concerns about these terms and conditions, please contact us at contact@knotters.org</p>
        <p>Entire Agreement: These terms and conditions constitute the entire agreement between you and Knotters Community regarding the platform.</p>
        <p>Effective Date: These terms and conditions are effective as of 15th June, 2022.</p>

        </div>


      </div>
      {loading && (
        <div className="login-loader">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Terms;
