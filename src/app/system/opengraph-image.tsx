import { ogTemplate } from '../_utils/og-template';

export const runtime = 'edge';
export const alt =
  'Hunter Jennings - Frontend ui engineer interested in design systems, component architectures, and React.';

export default async function Image() {
  return await ogTemplate({ title: 'System', sub: 'Opengraph Image Test' });
}
