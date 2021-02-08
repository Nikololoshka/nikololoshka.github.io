import MainDrawer from "./MainDrawer";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        links: state.nav
    }
};

const MainDrawerContainer = connect(mapStateToProps)(MainDrawer);

export default MainDrawerContainer;