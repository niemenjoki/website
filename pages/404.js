import Link from 'next/link';

import Layout from '@/components/Layout';
import classNames from '@/styles/NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <Layout>
      <div className={classNames.Oops}>Oops</div>
      <h1 className={classNames.NotFoundPage}>
        Looks like the page you&apos;re looking for doesn&apos;t exist.
      </h1>
      <div className={classNames.Suggestion}>Maybe you can find it here:</div>
      <div className={classNames.LinkWrapper}>
        <Link href="/blog">
          <a className="hover">Recent Blogposts</a>
        </Link>
      </div>
      <div className={classNames.LinkWrapper}>
        <Link href="/projects">
          <a className="hover">My Projects</a>
        </Link>
      </div>
    </Layout>
  );
};
export default NotFoundPage;
