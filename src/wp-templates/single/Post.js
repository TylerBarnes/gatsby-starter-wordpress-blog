import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Bio from "src/components/bio"
import Layout from "src/components/layout"
import SEO from "src/components/seo"
import { rhythm, scale } from "src/utils/typography"
import NextPrev from "src/components/next-prev"

const BlogPostTemplate = ({ data, location }) => {
  const { post, nextPost, previousPost } = data

  return (
    <Layout location={location}>
      <SEO title={post.title} description={post.excerpt} />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {post.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {post.date}
          </p>
          <Img
            fluid={post.featuredImage.node.localFile.childImageSharp.fluid}
            style={{
              marginBottom: rhythm(1),
            }}
          />
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.content }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio author={post.author} />
        </footer>
      </article>

      <NextPrev
        prevLink={previousPost?.uri}
        prevText={previousPost?.title}
        nextLink={nextPost?.uri}
        nextText={nextPost?.title}
      />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostByIdWithNextPrev(
    $id: String!
    $nextSinglePageId: String
    $previousSinglePageId: String
  ) {
    post: wpPost(id: { eq: $id }) {
      uri
      excerpt
      title
      content
      date(formatString: "MMMM DD, YYYY")
      author {
        node {
          ...WpAuthor
        }
      }
      featuredImage {
        node {
          localFile {
            childImageSharp {
              fluid(maxWidth: 600, quality: 90) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }

    nextPost: wpPost(id: { eq: $nextSinglePageId }) {
      uri
      title
    }

    previousPost: wpPost(id: { eq: $previousSinglePageId }) {
      uri
      title
    }
  }
`
