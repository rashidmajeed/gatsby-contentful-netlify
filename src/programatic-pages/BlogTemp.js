import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"

export default ({ data, pageContext }) => {
  const { currentPage, isFirstPage, isLastPage, totalPages } = pageContext
  const nextPage = `/blog/${String(currentPage + 1)}`
  const prevPage =
    currentPage - 1 === 1 ? "/blog" : `/blog/${String(currentPage - 1)}`

  return (
    <Layout>
      <div>
        <h1
          style={{
            display: "inline-block",
            borderBottom: "2px solid orange",
            textAlign: "right",
          }}
        >
          mircshop Blog
        </h1>
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div
            key={node.id}
            style={{
              border: "1px solid",
              color: "a3a1a1",
              marginTop: "0.2rem",
              padding: `padding: 0.2rem`,
              backgroundColor: "#e6edf2",
              boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
              borderRadius: "5px 5px 0 0;",
            }}
          >
            <h3>
              <span
                style={{
                  color: "black",
                }}
              >
                <Link to={`/posts${node.fields.slug}`}>
                  {node.frontmatter.title}
                </Link>{" "}
              </span>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "orange",
                  marginTop: "0.3rem",
                  marginBotom: "0.5rem",
                }}
              >
                {node.frontmatter.date}
              </div>
            </h3>
            <p>{node.excerpt}</p>
          </div>
        ))}
        {/* Pagination Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            maxWidth: 300,
            margin: "0 auto",
          }}
        >
          {!isFirstPage && (
            <Link to={prevPage} rel="prev">
              Prev Page
            </Link>
          )}
          {Array.from({ length: totalPages }, (_, index) => (
            <Link key={index} to={`/blog/${index === 0 ? "" : index + 1}`}>
              {index + 1}
            </Link>
          ))}
          {!isLastPage && (
            <Link to={nextPage} rel="next">
              Next Page
            </Link>
          )}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      skip: $skip
      limit: $limit
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          id
          frontmatter {
            title
            date
          }
          excerpt
        }
      }
    }
  }
`
