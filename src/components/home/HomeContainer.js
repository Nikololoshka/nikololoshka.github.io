import Home from "./Home";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        links: state.nav
    }
};

const HomeContainer = connect(mapStateToProps)(Home);

export default HomeContainer;