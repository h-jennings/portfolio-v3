import gql from 'graphql-tag';
import { ProjectInfoFragment } from '../fragments/project.fragments';

export const GetProject = gql`
  query GetProject($slug: String!) {
    project(where: { slug: $slug }) {
      ...ProjectInfo
    }
  }
  ${ProjectInfoFragment}
`;

export const GetProjects = gql`
  query GetProjects($count: Int = 25) {
    projects(first: $count, orderBy: date_DESC) {
      ...ProjectInfo
    }
  }
  ${ProjectInfoFragment}
`;
