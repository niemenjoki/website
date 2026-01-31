import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';

import fs from 'fs';
import path from 'path';
import rehypePrettyCode from 'rehype-pretty-code';

import Advert from '@/components/Advert/Advert';
import InfoBox from '@/components/InfoBox/InfoBox';
import PostRecommendation from '@/components/PostRecommendation/PostRecommendation';
import SafeImage from '@/components/SafeImage/SafeImage';
import SafeLink from '@/components/SafeLink/SafeLink';
import SocialShareButtons from '@/components/SocialShareButtons/SocialShareButtons';
import {
  getAllContentSlugs,
  getContentMetadata,
  getPostRecommendations,
} from '@/lib/content/index.mjs';
import portrait from '@/public/images/portrait2024.avif';

import classes from './PostPage.module.css';

const prettyCodeOptions = {
  theme: {
    dark: 'github-dark',
    light: 'github-light',
  },
  keepBackground: false,
};

export const mdxComponents = {
  SafeLink,
  SafeImage,
  InfoBox,
  Advert
};

export async function generateStaticParams() {
  const slugs = getAllContentSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export { default as generateMetadata } from './generateMetadata';

export default async function PostPage({ params }) {
  const { slug } = await params;
  let data;
  try {
    data = getContentMetadata({ slug });
  } catch {
    notFound();
  }
  const mdxPath = path.join(process.cwd(), 'content', 'posts', slug, 'content.mdx');
  const mdxContent = fs.readFileSync(mdxPath, 'utf-8');

  const recommendedPosts = await getPostRecommendations({
    self: slug,
    keywords: [...data.tags, ...data.keywords],
  });

  const { structuredData } = data;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />

      <article className={classes.PostPage}>
        <h1>{data.title}</h1>
        <div className={classes.Date}>
          Julkaistu: {new Date(data.date).toLocaleDateString('fi-FI')}
          {data.updated
            ? ` (Päivitetty: ${new Date(data.updated).toLocaleDateString('fi-FI')})`
            : undefined}
        </div>

        <div className={classes.Content + ' md'}>
          <MDXRemote
            source={mdxContent}
            components={mdxComponents}
            options={{
              mdxOptions: {
                rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
              },
            }}
          />
        </div>

        <div className={classes.AuthorBox}>
          <SafeImage
            src={portrait}
            alt="Valokuva Joonas Niemenjoesta"
            width={90}
            height={90}
            placeholder="blur"
          />
          <div className={classes.AuthorInfo}>
            <p className={classes.AuthorHeading}>
              <strong>Kirjoittaja:</strong> Joonas Niemenjoki
            </p>
            <p>
              Olen rakennusautomaation ohjelmoija. Työskentelee erityisesti
              lämpöpumppujärjestelmien ja niiden ohjauslogiikan parissa. Työni keskittyy
              järjestelmien toimintaan, energiatehokkuuteen ja käytettävyyteen.
            </p>
            <p>
              Kirjoitan käytännön kokemuksiin perustuvia havaintoja ja vinkkejä
              rakennusautomaatiosta ja sitä sivuavista aiheista.
            </p>
            <p>
              <a
                href="https://www.linkedin.com/in/joonasniemenjoki/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>{' '}
              • <SafeLink href="/tietoa">Lisätietoa</SafeLink>
            </p>
          </div>
        </div>
      </article>

      <SocialShareButtons title={data.title} text={data.description} tags={data.tags} />
      <Advert adClient="ca-pub-5560402633923389" adSlot="1051764153" />
      <PostRecommendation posts={recommendedPosts} />
    </>
  );
}
