/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { graphql } from "gatsby"

import { rhythm } from "src/utils/typography"

const Bio = ({ author }) => {
  if (!author) {
    return null
  }

  if (author.node) {
    author = author.node
  }

  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      <img
        src={author.avatar.url}
        alt={`${author.name}'s avatar`}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `50%`,
        }}
      />
      <p>
        Written by <strong>{author.name}</strong> {author.description}
        {/* {` `}
        <a href={`https://twitter.com/${social.twitter}`}>
          You should follow him on Twitter
        </a> */}
      </p>
    </div>
  )
}

export default Bio

export const fragment = graphql`
  fragment WpAuthor on WpUser {
    name
    description
    avatar {
      url
    }
  }
`
