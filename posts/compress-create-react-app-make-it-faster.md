---
title: 'How to compress your create-react-app and make it load faster?'
date: 'September 16, 2021'
excerpt: 'Decrease page load times and improve SEO in 10 minutes by setting up compression for your app built with create-react-app'
tags: 'React'
keywords: 'page,load,time,user,experience,performance,web,development,search,engine,seo,cra,brotli,gzip'
---

While React apps are nice and snappy, their initial page load time is usually not good. This negatively impacts user experience, especially for users who use a slower internet connection. Slower page loading increases the chance of the user leaving your app. Website performance is also among the top factors search engines use to decide which websites they show in their search results.

In this tutorial, we will be using [compress-create-react-app](https://www.npmjs.com/package/compress-create-react-app) to significantly reduce the size of our website. This tutorial works for apps built with [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html). The examples will use a Node/Express backend.

## Prerequisites

1. This is not a programming tutorial. I will only be focusing on the compression and **you need to know how to make the React app yourself.**
2. To use compression, you need to tell your server to serve the compressed files to the visitors. **If you can't access the server, you can't use compression.**

## What is Compression?

Compression algorithms make the website files a server sends to the client smaller. There are many different compression algorithms but they all work by finding repeating text within a document and replacing them with temporary strings with the same placeholder. The most efficient algorithm at the time of writing this tutorial is called **Brotli**. However, it is not supported by all browsers so we will be using an another algorithm called **gzip** as well as Brotli. We will then set up our server to send files compressed with Brotli when the client's browser supports it and gzip when Brotli is not supported.

## Using post-build compression

Due to the way create-react-apps work, the easiest way to set up compression is by using post-build compression which will automatically compress our build files after we build our app. I created an npm package called compress-create-react-app which makes this easy for you.

Let's first install the package as a developer dependency:

```bash
npm install compress-create-react-app --save-dev
```

All we need to do to use the package is to modify our build script in `package.json`:

```diff
  "scripts": {
    "start": "react-scripts start",
-   "build": "react-scripts build",
+   "build": "react-scripts build && compress-cra",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
```

Now we can build our app just like we normally would:

```bash
npm run build
```

This will compress your build and create .br and .gz files into your build folder.

## Serving compressed files

The exact way our server needs to be set up to serve the compressed files depends on how you've configured your server. For Express servers, there's a nice package called [express-static-gzip](https://www.npmjs.com/package/express-static-gzip) which will do all the difficult parts for us.

Install the package

```bash
npm i express-static-gzip
```

Edit your main server file:

```javascript
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const expressStaticGzip = require('express-static-gzip'); // Require the package

app.use(express.json({ extended: false }));

// Normal API paths
app.use('/api/example1', require('./routes/example1'));
app.use('/api/example2', require('./routes/example2'));

// Serve the build files
const buildPath = path.join(__dirname, '..', 'build');
app.use(
  '/',
  expressStaticGzip(buildPath, {
    enableBrotli: true, // Tell express-static-gzip to use brotli when the client supports it
    orderPreference: ['br', 'gz'],
  })
);

// Fallback to index.html when something that doesn't exist is requested
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
```

That's it. Your app is now serving compressed files. Let me know if you have trouble making compression work for your app or if this tutorial helped you by contacting me through the social links on the bottom of the page.
