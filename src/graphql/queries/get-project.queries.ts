import gql from 'graphql-tag';

export const GetProjectQuery = gql`
  query GetProjectQuery($slug: String!) {
    project(where: { slug: $slug }) {
      seo {
        title
        image {
          url
        }
        description
        hideFromSearch
      }
      slug
      name
      client {
        name
      }
      featured
      media {
        id
        mediaType
        url
        width
        height
      }
      description {
        raw
      }
      descriptionLong {
        raw
      }
      contribution
      date
      link
    }
  }
`;
