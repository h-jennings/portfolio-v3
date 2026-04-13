import { ogTemplate } from '@/app/_utils/og-template';

export const alt = 'Notes - Brief dispatches on craft and code.';

export default function Image() {
  return ogTemplate({
    title: 'Notes',
    sub: 'Brief dispatches on craft and code.',
  });
}
