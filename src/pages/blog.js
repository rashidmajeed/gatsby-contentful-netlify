import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"

import Layout from "../components/layout"

const getBlogPosts = graphql`
  {
    allMarkdownRemark {
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
export default () => (
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

      <StaticQuery
        query={getBlogPosts}
        render={data => (
          <>
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
                    <Link to={`/posts/${node.fields.slug}`}>
                      {" "}
                      {node.frontmatter.title}{" "}
                    </Link>
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
          </>
        )}
      />
    </div>
  </Layout>
)
