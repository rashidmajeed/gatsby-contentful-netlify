const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

const ProgramaticPost = path.resolve("./src/programatic-pages/PostTemp.js")
const ProgramaticBlog = path.resolve("./src/programatic-pages/BlogTemp.js")
const ProgramaticProd = path.resolve("./src/programatic-pages/ProdTemp.js")
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
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }

      allContentfulProduct {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  const posts = result.data.allMarkdownRemark.edges
  posts.forEach(({ node: post }) => {
    createPage({
      path: `posts${post.fields.slug}`,
      component: ProgramaticPost,
      context: {
        slug: post.fields.slug,
      },
    })
  })

  {
    /* Pagination for a blog posts*/
  }

  const postsPerPage = 2
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
  const products = result.data.allContentfulProduct.edges
  products.forEach(({ node: product }) => {
    createPage({
      path: `/products/${product.slug}`,
      component: ProgramaticProd,
      context: {
        slug: product.slug,
      },
    })
  })
}
