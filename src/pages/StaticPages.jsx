import { Helmet } from 'react-helmet-async';

const StaticPage = ({ title, content }) => {
  return (
    <>
      <Helmet>
        <title>{title} - Balagam TV</title>
      </Helmet>
      <div className="container mx-auto px-4 pt-10 pb-20 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 border-b-2 border-brand-red inline-block pb-2">{title}</h1>
        <div className="bg-white p-8 rounded shadow-sm prose max-w-none text-gray-700">
          <p>{content}</p>
          <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.</p>
        </div>
      </div>
    </>
  );
};

export const About = () => <StaticPage title="About Us" content="Welcome to Balagam TV. We are dedicated to providing the most accurate and latest news in Telugu." />;
export const Contact = () => <StaticPage title="Contact Us" content="Reach out to us at info@balagamtv.com or visit our office in Hyderabad." />;
export const Privacy = () => <StaticPage title="Privacy Policy" content="Your privacy is important to us. This privacy policy explains how we collect and use your data." />;
