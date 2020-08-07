import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Bio from "src/components/bio"
import Layout from "src/components/layout"
import SEO from "src/components/seo"
import { rhythm, scale } from "src/utils/typography"
import NextPrev from "src/components/next-prev"

const ContentNodeTemplate = ({ data, location }) => {
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
          <h4>Using the ContentNode template</h4>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {post.date}
          </p>
          {!!post?.featuredImage?.node?.localFile?.childImageSharp && (
            <Img
              fluid={post.featuredImage.node.localFile.childImageSharp.fluid}
              style={{
                marginBottom: rhythm(1),
              }}
            />
          )}
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

export default ContentNodeTemplate

export const pageQuery = graphql`
  query ContentNodeByIdWithNextPrev(
    $id: String!
    $nextSinglePageId: String
    $previousSinglePageId: String
  ) {
    post: wpContentNode(id: { eq: $id }) {
      uri
      ... on WpNodeWithTitle {
        title
      }
      ... on WpNodeWithContentEditor {
        content
      }
      date(formatString: "MMMM DD, YYYY")
      ... on WpNodeWithAuthor {
        author {
          node {
            ...WpAuthor
          }
        }
      }
      ... on WpNodeWithFeaturedImage {
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
    }

    nextPost: wpContentNode(id: { eq: $nextSinglePageId }) {
      uri
      ... on WpNodeWithTitle {
        title
      }
    }

    previousPost: wpContentNode(id: { eq: $previousSinglePageId }) {
      uri
      ... on WpNodeWithTitle {
        title
      }
    }
  }
`
