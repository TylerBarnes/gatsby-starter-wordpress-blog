import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "src/components/bio"
import Layout from "src/components/layout"
import SEO from "src/components/seo"
import { rhythm } from "src/utils/typography"

const BlogIndex = ({ data, location, pageContext }) => {
  const siteTitle = data.wp.allSettings.generalSettingsTitle
  const posts = data.allWpPost.nodes

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      {posts.map(node => {
        const title = node.title

        return (
          <article key={node.id}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.uri}>
                  {title}
                </Link>
              </h3>
              <small>{node.date}</small>
            </header>
            <section
              dangerouslySetInnerHTML={{
                __html: node.excerpt,
              }}
            />
          </article>
        )
      })}
      {!pageContext.isFirstArchivePage && pageContext.previousArchivePath ? (
        <Link to={pageContext.previousArchivePath}>previous</Link>
      ) : null}
      {` `}
      {!pageContext.isLastArchivePage && pageContext.nextArchivePath ? (
        <Link to={pageContext.nextArchivePath}>next</Link>
      ) : null}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query PostArchive(
    $archiveNodeIds: [String]!
    $sortOrder: [SortOrderEnum]!
    $sortFields: [WpPostFieldsEnum]!
  ) {
    wp {
      allSettings {
        generalSettingsTitle
      }
    }

    allWpPost(
      filter: { id: { in: $archiveNodeIds } }
      sort: { order: $sortOrder, fields: $sortFields }
    ) {
      nodes {
        id
        uri
        excerpt
        title
      }
    }
  }
`
