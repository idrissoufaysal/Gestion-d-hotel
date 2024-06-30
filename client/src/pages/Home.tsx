import Feature from "../components/Featured";
import FeaturedProperty from "../components/FeaturedProperty";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MailList from "../components/MailList";
import Navbar from "../components/NavBar";
import PropertyList from "../components/propertyList";

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
