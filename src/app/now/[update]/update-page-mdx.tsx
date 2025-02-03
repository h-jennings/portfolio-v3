'use client';
import Image from 'next/image';
import { getMDXComponent } from 'next-contentlayer/hooks';
import { ImageContainer } from '@/app/_components/image-container';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { MDX_ELEMENTS } from '@/app/_utils/constants/mdx.constants';

interface UpdatePageMDXProps {
  code: string;
}
// TODO: #144 temporary due to a bug in contentlayer where it doesn't allow for custom components to render in rsc
export const UpdatePageMDX = ({ code }: UpdatePageMDXProps) => {
  const MDXContent = getMDXComponent(code);

  return <MDXContent components={{ ...MDX_ELEMENTS, ...MDX_COMPONENTS }} />;
};

const MDX_COMPONENTS = {
  Image,
  ImageContainer,
  AspectRatio,
} as const;
