import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const ProgramaticPost = ({ data: post }) => (
  <Layout>
    <div>
      <div dangerouslySetInnerHTML={{ __html: post.markdownRemark.html }} />
    </div>
  </Layout>
)

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      frontmatter {
        title
      }
    }
  }
`

export default ProgramaticPost
