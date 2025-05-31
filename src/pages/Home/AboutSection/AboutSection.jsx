const AboutSection = () => {
  return (
    <div>
      <div className="lg:flex lg:items-center">
        <div className="lg:w-1/2 lg:pr-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Who We Are
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
            AssetAura is dedicated to revolutionizing how businesses handle their assets. Our innovative platform provides comprehensive tools to monitor, manage, and maximize asset performance, helping organizations stay ahead in a competitive landscape.
          </p>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
            We believe in simplifying complex asset management processes by delivering intuitive features, real-time data, and actionable insights that enable smarter decision-making and greater operational control.
          </p>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
            Partner with AssetAura to streamline your asset lifecycle, minimize downtime, and unlock the full potential of your resources.
          </p>
        </div>
        <div className="mt-8 lg:mt-0 lg:w-1/2 lg:pl-8">
          <img
            className="w-full rounded-lg"
            src="https://i.ibb.co/JCnSr5y/pexels-fauxels-3184339-1.jpg"
            alt="Team collaboration"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
