import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import shopLogo from "../images/logo.png"

const Header = ({ siteTitle }) => (
  <div
    style={{
      background: `#6e6e6e`,
      padding: `0.2rem`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 1200,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      {/* / Logo */}
      <span style={{ display: "flex", alignItems: "center" }}>
        <img
          src={shopLogo}
          alt="mircshop Logo"
          style={{
            borderRadius: "50%",
            border: "3px solid orange",
            margin: "0 5px",
            width: "50px",
          }}
        />
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `orange`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
      </span>
    </div>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
