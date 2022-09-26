---
title: 'How to make and publish your own npm package?'
date: 'October 1, 2021'
excerpt: 'If you have done any web development, you have probably used a ton of npm packages. In this tutorial, I will teach how you can create one of your own and publish it for other people to use.'
tags: 'npm,Programming,JavaScript'
keywords: 'development,error,handling,json,import,export'
language: 'en'
---

If you have done any web development, you have probably used a ton of npm packages. In this tutorial, I will teach how you can create one of your own and publish it for other people to use. I will explain everything you need to do to publish your first package.

## Table of Contents

1. [Writing the Code](#writing-the-code)
2. [Handling Errors](#handling-errors)
3. [Local Testing](#local-testing)
4. [Preparing for publishing](#preparing-for-publishing)

## Writing the Code

There's no way for me to know what the package you're going to publish will do, so I won't be talking about what the code inside the package does. I will only be going through the requirements.

There are really two main types of npm packages; Those that allow users to import something they can use in their project and those that are used from the command line (or the script tag in `package.json`)

Make a directory for your project and run `npm init` to set it up for npm. The `main` parameter in `package.json` defines the entry point file in your app (`index.js` by default). This is where you will write your code. You can create other files too, of course, but all the code you plan to ship to the end users needs to be exported or executed in the entry point file. In a complex project, you can write all your code in other files and simply import them into the entry point file.

Let's look at a simplified example of how the entry point file could look like:

```javascript
const { someFunction, otherFunction } = require('./utils');

const defaultFunction = (params) => {
  const value = someFunction(params.someParam);
  return otherFunction(value);
};

const namedFunction1 = (params) => {
  // some code here
};

const namedFunction2 = (params) => {
  // some code here
};

const myModule = (module.exports = defaultFunction);
myModule.namedFunction1 = namedFunction1;
myModule.namedFunction2 = namedFunction2;
```

Now, the end user could import our functions like so:

```javascript
import defaultFunction from 'my-module';
import { namedFunction1, namedFunction2 } from 'my-module';
```

If we're making a package that should be used from the command line, we don't have to export anything:

```javascript
#!/usr/bin/env node

const { handleutilityFunction, someAsyncFunction } = require('./utils');

(async () => {
  const config = handleCMDArguments();
  const someValue = utilityFunction(config);
  const asyncResult = await someAsyncFunction(someValue);
})();
```

The first line in the example is very important. It's called a [shebang line](<https://en.wikipedia.org/wiki/Shebang_(Unix)>) and it tells Unix-like platforms that this file should be executed with node. Windows ignores this line and uses the filename extension instead.

If you find the use of parentheses in the example confusing, look into _immediately invoked functions in JavaScript_. They are not required for many CLI packages to work but it's a handy way to use async/await without having to write a named function only to immediately call it like so:

```javascript
#!/usr/bin/env node

const { handleutilityFunction, someAsyncFunction } = require('./utils');

const mainFunction = async () => {
  const config = handleCMDArguments();
  const someValue = utilityFunction(config);
  const asyncResult = await someAsyncFunction(someValue);
};
mainFunction();
```

Now, for our end user to be able to run our code from the command line, we need to add a "bin" parameter into our `package.json`.

```json
"bin": {
    "my-module": "index.js",
  },
```

This would allow the end user to run our index.js file from the command line like so:

```bash
myModule
```

Or by adding the following script in their `package.json`

```json
"scripts": {
    "some-command": "my-module"
  },
```

## Handling Errors

If you're going to put your code online for other people to use, you should aim to make it unbreakable and add descriptive error messages that help users understand what they are doing wrong. For example, if your function expects a certain parameter to be a `string`, check for it's type and handle situations when the user provides a non-string parameter:

```javascript
const getFirstAndLastCharacters = (str) => {
  if (typeof str !== 'string') {
    console.error(
      `[myModule]: myFunction expected a string but it got "${typeof str}"`
    );
    return;
  }
  const first = str.charAt(0);
  const last = str.charAt(str.length - 1);
  return { first, last };
};
```

It's a lot easier for the end user to understand what they did wrong if they get an error message like this:

```bash
[myModule]: myFunction expected a string but it got "number"
```

Instead of something like this:

```bash
TypeError: str.charAt is not a function
```

## Local Testing

To test how our package behaves as it's installed and used by a user, we can package our code locally using `npm pack` which will create a tarball in the root of your project directory. It should have a filename similar to `my-module-1.0.0.tgz`

Now we need to create a test project. The type of project you need for testing depends highly on the type of package you're creating, so I won't be going into a lot of detail. Whatever your test project may look like, you need to reference the tarball you just created in package.json:

```json
"dependencies": {
    "my-module": "../my-module/my-module-1.0.0.tgz"
  }
```

And then install it like a normal npm package:

```bash
npm install
```

If your package doesn't work as you expect, fix the error in your code, run `npm pack` again, and reinstall the package to your test project. You may need to delete the directory from node_modules:

```bash
rm -rf ./node_modules/my-module
```

Once you've tested your package and found that it works as expected and properly handles all possible user errors, it's time to prepare the package for publishing.

## Preparing for publishing

Every good project needs proper documentation, so be sure to write a good README file. You can take a look at some popular packages for reference. Usually a README file includes at least an introduction, installation and usage instructions, contributing instructions and a license. [Yes, you really should license your code!](https://choosealicense.com/no-permission/)

Next, you need to [create an npm account](https://www.npmjs.com/signup) if you don't have one already and login:

```bash
npm login
```

Follow the prompts and until you get a message similar to this:

```bash
Logged in as yourUsername on https://registry.npmjs.org/.
```

We're almost ready to publish but we still need to modify our `package.json` with some useful information. You can take a look at the [npm documentation](https://docs.npmjs.com/cli/v7/configuring-npm/package-json) for more fields but here are the most important ones I believe every package should have:

```json
{
  "name": "my-awesome-package",
  "version": "0.0.1",
  "description": "Does awesome things",
  "license": "MIT",
  "repository": "username/name-of-repository",
  "main": "index.js",
  "keywords": ["awesomeness", "otherkeyword"]
}
```

- name: The official name of your package.
- version: Version number. I like to keep it as 0.0.1 until I publish the first version.
- description: A short but informative description of your package.
- license: Abbreviation of your license. See npm documentation for more information.
- repository: The URL of your git repository, can also be provided as username/repository for GitHub repositories.
- main: The entry point file to your package
- keywords: A list of keywords that will help your package be discovered in npm search.

When you're ready to publish, run the following command to set the version number to `1.0.0`, the first major release of your package.

```bash
npm version major

Output: v1.0.0
```

You can then publish your package with the following command:

```bash
npm publish

Output: + my-awesome-package@1.0.0
```

That's it! Your package is now on the npm registry and it's available for anyone to use!
