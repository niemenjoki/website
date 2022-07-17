---
title: 'How to generate an RSS feed for static Next.js website?'
date: 'October 5, 2021'
excerpt: 'Create an RSS feed for your static Next.js website to allow users to subscribe to your amazing content'
tags: 'NextJS,RSS'
keywords: 'xml,static,website,automatically,database,build,script'
---

If you have a static Next.js website, you might think there's no way for you to create a notification system for new content since you don't have your own backend server. Luckily, this is not true. Creating an RSS feed for your content allows your users to use any of the free RSS subscription services to subscribe to your content and get notifications for each new post by email or even push notifications.

In this tutorial, I'm going to explain how you can set up your static Next.js website to automatically generate an RSS feed after each build.

## What we need to do

Here are the steps we need to take to generate an RSS feed with Next.js:

1. **Get all the data for the content.** Whether you store your content in a database, text files in your git repository or some other place, we need to have access to them with our post build script.
2. **Convert the content into XML.** Your content most likely is not stored as RSS-valid XML, so we need to process it.
3. **Write the RSS feed into an XML file.** After you have processed your content into XML, you need to write it into a file which will ship with your code.
4. **Make the script run after each build.** To do all the above steps automatically, we need to make our code run automatically whenever we build our website.

## Getting the data

Let's create a new file for the script. I decided to put my code to `<root>/utils/generateRss.js` when I added an RSS feed for this website.

The exact way to get your content depends on where you store it. Wherever your content is, the goal here is to get the title, URL, date and description for each item you plan to add into your RSS script. In my case, I write blog posts in markdown files in a `/posts` directory and here's how I get all the necessary data for my posts:

```javascript
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const getAllPosts = () => {
  // Read the posts directory and get blog posts' filenames
  const filenames = fs.readdirSync(path.join('posts'));

  // Go through all filenames
  const posts = filenames.map((filename) => {
    // Full path to the file from project root
    const filepath = path.join('posts', filename);
    // Read the content of the file
    const markdownWithMeta = fs.readFileSync(filepath, 'utf-8');
    // Get all data from the frontmatter
    const { data } = matter(markdownWithMeta);
    // Return everything we need for the RSS feed
    return {
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      link: 'https://joonasjokinen.fi/blog/' + filename.replace('.md', ''),
    };
  });
  // Sort the blogposts by date
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
};
```

Since your code will probably look a lot different, I won't be going through the above code in detail but I commented everything hoping it's easy to understand.

## Converting to XML

Once we've got the data, it's time to start processing it into XML for the RSS feed. I created a function which receives the blog posts as a parameter and maps each of them into an XML item.

```javascript
const getXmlItems = (blogPosts) => {
  return blogPosts
    .map((post) => {
      return `<item>
            <title>${post.title}</title>
            <link>${post.link}</link>
            <guid>${post.link}</guid>
            <pubDate>${new Date(post.date).toUTCString()}</pubDate>
            <description>${post.excerpt}</description>
            <dc:creator>Joonas Jokinen</dc:creator>
        </item>
        `;
    })
    .join(''); // Join the array of items into a single long string
};
```

The above code should be quite straightforward. We take the `blogPosts` array and map each post to a string containing an XML item about the post. If the XML syntax is completely new to you, the w3 schools [documentation](https://www.w3schools.com/xml/xml_rss.asp) is my favorite resource for understanding it. In short, here's a summary about the tags I used:

- **item:** A piece of content like a blog post, podcast episode or a video
- **title:** The title of the item.
- **link:** The URL leading to the item.
- **guid:** A unique identifier for the item. I used the URL for the post here but you can also use some other kind of identifier.
- **pubDate:** The publication date of the item. Should be in RFC 822 compliant format, which can be achieved with the `.toUTCString()` method of JavaScript dates.
- **description:** A phrase or sentence that describes the item.
- **dc:creator:** The author of the item. I hard coded my name here because I'm the only person writing for my blog.

We're now able to get the XML for all the pieces of content but we still need to write some "global" XML which describes the entire feed:

```javascript
const getRssXml = (xmlItems, latestPostDate) => {
  return `<?xml version="1.0" ?>
  <rss
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:atom="http://www.w3.org/2005/Atom"
    version="2.0"
  >
    <channel>
        <title>Joonas Jokinen's blog</title>
        <link>https://joonasjokinen.fi</link>
        <description>The blog of an engineer with a childlike curiosity focusing mostly on web development and occasionally random interesting facts></description>
        <language>en</language>
        <lastBuildDate>${new Date(latestPostDate).toUTCString()}</lastBuildDate>
        ${xmlItems}
    </channel>
  </rss>`;
};
```

Here, I just hard coded most of the XML since I know it's unlikely to change any time soon. I got the `latestPostDate` by grabbing the `date` parameter of first element of `postData` (which is sorted by date).

I also placed the previously processed `xmlItems` after all the other tags.

The names of the XML tags here are also mostly self evident but here's a brief summary of what they mean:

- **title:** The title of the entire RSS feed
- **link:** The URL of the main page of the content
- **description:** A phrase or sentence that describes the feed.
- **language:** The language code, e.g. en, es, or fi
- **lastBuildDate** The last time there changes happened to the feed, e.g. a new blog post was published

## Writing the file

We've now made three functions that 1) Get all the data for each post 2) process the blog post data into XML items and 3) combine the items into a complete XML string. It's now time to call those functions and write the resulting XML into a file:

```javascript
const postData = getAllPosts();
const xmlItems = getXmlItems(postData);
const rssXml = getRssXml(xmlItems, postData[0].date);

fs.writeFile(path.join('public', 'rss.xml'), rssXml, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('RSS feed written successfully');
  }
});
```

Here's I use the `fs` module to write a `rss.xml` file to `<root>/public/` which will then be shipped together with our app. It's time to test it. Let's add a post build script to our website's `package.json`:

```json
...
"postbuild": "node ./utils/generateRss.js",
...
```

Calling a script "postbuild" will make it automatically run after "build" has ran. So let's try it:

```bash
npm run build
```

It seemed to work since we got "RSS feed written succesfully" and a file called `rss.xml` appeared in `/public`. Now, to make sure the file is a valid RSS feed, we can copy and paste its contents to [W3 Schools Feed Validation Service](https://validator.w3.org/feed/#validate_by_input).

If everything worked as expected, the validator should congratulate you for having a valid RSS feed.

There you have it. Next time you publish your code, the RSS feed should now become accessible at `yourdomain.com/rss.xml`.
