import {
  getProjectsIndexBreadcrumbItems,
  primaryProjectPages,
  projectsIndexPage,
} from '../site/pageRecords.mjs';
import { createCollectionStructuredData } from './createCollectionStructuredData.mjs';

// The list follows primaryProjectOrder, which is also the order of the groups on the page.
export function createProjectsIndexStructuredData() {
  return createCollectionStructuredData({
    pageUrl: projectsIndexPage.pageUrl,
    pageName: projectsIndexPage.title,
    description: projectsIndexPage.description,
    itemListName: projectsIndexPage.shortLabel,
    itemListElement: primaryProjectPages.map((page, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: page.shortLabel,
      url: page.pageUrl,
    })),
    breadcrumbItems: getProjectsIndexBreadcrumbItems(),
    includeAuthor: true,
  });
}
