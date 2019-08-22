# How To Use

Hi Susan :smiley:. Here's a quick and dirty instructions for running my rework. Check it out,
ignore it, eat it - I'll simply leave it here for reference.

## Initial Installations

I swapped out the bundling/package management setup with Yarn and ParcelJS, so you'll need to install/re-install some initial setup:

Briefly:

- [Yarn](https://yarnpkg.com/en/) is essentially a better version of `npm` - I find it much
  more intutive to use.
- [Parcel](https://parceljs.org/) does the same thing as Webpack, except much more easily (zero
  configuration!). It's development server also includes built in hot-module-replacement.

0. It would probably be easiest to clone a fresh copy of the repo so you don't have `node_modules` conflicts with your current version.
1. If you don't already have it, install [Yarn](https://yarnpkg.com/en/).
1. Run `yarn install --dev`.

Now you're good to go :thumbsup:.

## Development

I've organized the front-end into a three-page application:

- A static login page (`./src/apps/index`).
- A static error page (`./src/apps/error`).
- The user application, which in-and-of-itself is a single-page application with embedded routes to `/add`, `/applied`, etc. (`./src/apps/user`).

Each can be run on their own development servers like so:

- `yarn start:index` - Start the login page dev server.
  - Accessible at http://localhost:1234
- `yarn start:error` - Start the error page dev server.
  - Accessible at http://localhost:1234
- `yarn start:user` - Start the user SPA dev server.
  - Accessible at http://localhost:1234/user

## Last Thoughts

On top of the site organization, I began to fill out upgrades to the home page grid and applied jobs form. You'll find everything else un-implemented.

This was written off the top of my head, so if you encounter any problems, LMK. Of course, feel free to reach out with any questions in general.
