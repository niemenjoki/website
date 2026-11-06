import { renderSiteImage } from '@/lib/metadata/postImage';

// The default share image (1200 x 630 PNG) is drawn once at build time.
export const dynamic = 'force-static';

export async function GET() {
  return renderSiteImage();
}
