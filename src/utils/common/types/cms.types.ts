import { DocumentType } from '@/graphql/generated';
import { GetProjectQueryDocument } from '@/pages/work/[project]';

export type ProjectsMeta = DocumentType<
  typeof GetProjectQueryDocument
>['projectsMeta'];
