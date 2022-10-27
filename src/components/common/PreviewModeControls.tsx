import { sprinkles } from '@/styles/sprinkles.css';
import { useRouter } from 'next/router';
import { CustomLink } from './CustomLink';

export const PreviewModeControls = () => {
  const { isPreview } = useRouter();

  if (!isPreview) return null;

  return (
    <div
      className={sprinkles({
        position: 'fixed',
        bottom: 'm',
        left: 'm',
        zIndex: 'nuclear',
      })}
    >
      <CustomLink href='/api/preview/exit'>Exit Preview</CustomLink>
    </div>
  );
};
