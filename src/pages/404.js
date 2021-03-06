import React from "react"
import { graphql } from "gatsby"

import Layout from "src/components/layout"
import SEO from "src/components/seo"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.wp.allSettings.generalSettingsTitle

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="404: Not Found" />
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    wp {
      allSettings {
        generalSettingsTitle
      }
    }
  }
`
