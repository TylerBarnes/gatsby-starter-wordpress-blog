import React from "react"
import { Link } from "gatsby"

const NextPrev = ({ nextLink, prevLink, nextText, prevText }) => {
  return (
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
          {!!prevLink && !!prevText && (
            <Link to={prevLink} rel="prev">
              ← {prevText}
            </Link>
          )}
        </li>
        <li>
          {!!nextLink && !!nextText && (
            <Link to={nextLink} rel="next">
              {nextText} →
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default NextPrev
