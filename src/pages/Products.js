import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"

const Products = ({ data: { allContentfulProduct } }) => (
  <Layout>
    <div>
      <center>
        <h2>mircshop products</h2>
      </center>
      {/* Product List} */}
      <div className="wrapper">
        <ul className="product-list">
          {allContentfulProduct.edges.map(({ node: product }) => (
            <div key={product.id}>
              <Link
                to={`/products/${product.slug}`}
                style={{
                  textDecoration: "none",
                  color: "#551a8b",
                  textAlign: "center",
                }}
              >
                <Img style={{ maxWidth: 400 }} fluid={product.image.fluid} />
                <h3>
                  {product.name}{" "}
                  <button class="view-detail-button">
                    <span>View</span>
                  </button>
                </h3>
              </Link>
            </div>
          ))}
        </ul>
      </div>
    </div>
  </Layout>
)

export const query = graphql`
  {
    allContentfulProduct {
      edges {
        node {
          id
          slug
          name
          price
          private
          image {
            fluid(maxWidth: 400) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`

export default Products
