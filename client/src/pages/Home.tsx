import Feature from "../components2/Featured";
import FeaturedProperty from "../components2/FeaturedProperty";
import Footer from "../components2/Footer";
import Header from "../components2/Header";
import MailList from "../components2/MailList";
import Navbar from "../components2/NavBar";
import PropertyList from "../components2/propertyList";

const Home = () => {

  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Feature />
        <h1 className="title">Browse by property type</h1>
        <PropertyList />
        <h1 className="title">Home guest Love</h1>
        <div className="items">
          <FeaturedProperty />

        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
