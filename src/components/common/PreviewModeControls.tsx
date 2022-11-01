import { sprinkles } from '@/styles/sprinkles.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
      <Link href='/api/preview/exit'>Exit Preview</Link>
    </div>
  );
};
