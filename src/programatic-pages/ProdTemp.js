import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"

const ProgramaticProd = ({ data: { contentfulProduct } }) => (
  <Layout>
    <div
      style={{
        marginLeft: "0 auto",
        width: "100%",
        textAlign: "center",
      }}
    >
      {/* Product Info */}
      <h2>
        {contentfulProduct.name} -{" "}
        <span style={{ color: "#ccc" }}>
          Added on {contentfulProduct.createdAt}
        </span>
      </h2>
      <h4>${contentfulProduct.price}</h4>
      <p>{contentfulProduct.description}</p>
      <Img
        style={{ margin: "0 auto", maxWidth: 500 }}
        fluid={contentfulProduct.image.fluid}
      />
    </div>
  </Layout>
)
export const query = graphql`
  query($slug: String!) {
    contentfulProduct(slug: { eq: $slug }) {
      slug
      name
      price
      description
      createdAt(formatString: "MMMM Do, YYYY, h:mm:ss a")
      image {
        fluid(maxWidth: 800) {
          ...GatsbyContentfulFluid
        }
        file {
          url
        }
      }
    }
  }
`

export default ProgramaticProd
