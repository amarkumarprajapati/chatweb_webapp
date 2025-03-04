// Home.js
// ... (previous imports remain the same)

const Home = ({ navigate }) => {  // Changed from implicit prop to explicit prop
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const handleGetStarted = () => {
      navigate("/login");
    };
  
    // Rest of the component remains the same until the buttons
    // Update all Get Started buttons to use the passed navigate
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
          {/* ... existing header code ... */}
          <Button
            type="primary"
            className="!rounded-button bg-blue-600 text-white px-6 hover:bg-blue-700"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
          {/* ... rest of header ... */}
        </header>
  
        {/* Hero Section */}
        <section className="pt-20 bg-gradient-to-r from-blue-50 to-indigo-50">
          {/* ... existing code ... */}
          <Button
            type="primary"
            size="large"
            className="!rounded-button bg-blue-600 hover:bg-blue-700"
            onClick={handleGetStarted}
          >
            Get Started Now
          </Button>
          {/* ... rest of hero ... */}
        </section>
  
        {/* CTA Section */}
        <section className="py-20 bg-blue-600 text-white">
          {/* ... existing code ... */}
          <Button
            size="large"
            className="!rounded-button bg-white text-blue-600 hover:bg-gray-100"
            onClick={handleGetStarted}
          >
            Get Started Now
          </Button>
          {/* ... rest of CTA ... */}
        </section>
  
        {/* ... rest of the component ... */}
      </div>
    );
  };
  
  export default Home;