import { gql } from 'graphql-tag';

export const ProjectInfoFragment = gql`
  fragment ProjectInfo on Project {
    id
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
    category
    featured
    featureMediaNarrow {
      id
      mediaType
      url
      width
      height
    }
    featureMediaWide {
      id
      mediaType
      url
      width
      height
    }
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
`;
