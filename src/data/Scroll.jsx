import { useState } from "react";
import PropTypes from "prop-types";

const Scroll = ({ children, height }) => {
  // eslint-disable-next-line no-unused-vars
  const [scrollPos, setScrollPos] = useState(0);

  const handleScroll = (e) => {
    const { scrollTop } = e.target.scrollingElement ||
      e.target.documentElement || { scrollTop: 0 };
    setScrollPos(scrollTop);
  };

  return (
    <div
      style={{ overflowY: "scroll", maxHeight: height || "400px" }}
      onScroll={handleScroll}
    >
      {children}
      <div style={{ position: "absolute", right: "10px", top: "10px" }}></div>
    </div>
  );
};

Scroll.propTypes = {
  children: PropTypes.node.isRequired,
  height: PropTypes.string,
};

export default Scroll;
