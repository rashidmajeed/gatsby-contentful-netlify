const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

const ProgramticPost = path.resolve("./src/programatic-pages/PostTemp.js")
const ProgramaticBlog = path.resolve("./src/programatic-pages/BlogTemp.js")
// API on node creation
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    // creating slug on creation of filepath
    const slug = createFilePath({ node, getNode, basePath: "posts" })
    createNodeField({
      node,
      name: "slug",
      value: slug,
    })
  }
}

{
  /* Create page promise graphql query*/
}
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  const posts = result.data.allMarkdownRemark.edges
  posts.forEach(({ node: post }) => {
    createPage({
      path: `posts${post.fields.slug}`,
      component: ProgramticPost,
      context: {
        slug: post.fields.slug,
      },
    })
  })

  {
    /* Pagination for a blog posts*/
  }

  const postsPerPage = 1
  const totalPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: totalPages }).forEach((_, index) => {
    const currentPage = index + 1
    const isFirstPage = index === 0
    const isLastPage = currentPage === totalPages

    createPage({
      path: isFirstPage ? "/blog" : `/blog/${currentPage}`,
      component: ProgramaticBlog,
      context: {
        limit: postsPerPage,
        skip: index * postsPerPage,
        isFirstPage,
        isLastPage,
        currentPage,
        totalPages,
      },
    })
  })
}
