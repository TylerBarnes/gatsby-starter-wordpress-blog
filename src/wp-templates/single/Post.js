import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "src/components/bio"
import Layout from "src/components/layout"
import SEO from "src/components/seo"
import { rhythm, scale } from "src/utils/typography"

const BlogPostTemplate = ({ data, location }) => {
  const { post, nextPost, previousPost } = data

  return (
    <Layout location={location}>
      <SEO title={post.title} description={post.description || post.excerpt} />
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

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previousPost && (
              <Link to={previousPost.uri} rel="prev">
                ← {previousPost.title}
              </Link>
            )}
          </li>
          <li>
            {nextPost && (
              <Link to={nextPost.uri} rel="next">
                {nextPost.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostById(
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
