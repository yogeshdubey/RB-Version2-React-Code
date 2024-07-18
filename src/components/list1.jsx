import DiamondListHeader1 from "./diamond-list-header1";
import DiamondListHeader from "./diamond-list-header";
import PropTypes from "prop-types";
import "./list1.css";

const List1 = ({ className = "" ,diamond,configAppData}) => {
  return (
    <div className={`list5 ${className}`}>
      <DiamondListHeader1 diamond={diamond} configAppData={configAppData}/>
    </div>
  );
};

List1.propTypes = {
  className: PropTypes.string,
};

export default List1;
