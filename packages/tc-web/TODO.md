# Tasks to be done

## Move towards Generalistic approach

Currently one can reproduce the current page, however it requires the user to be aware of the existing structure.
E.g. _"tc-advantage-column"_ only has meaning to a user if he _knows the structure of the page._

One goal is to be able to use web components flexible on several pages.
So one needs to **refactor.**
Find suitable names for the individual components.

## (Maybe) Create individual packages for each component

For a faster loading of web-components, break each component into its own library

**Pro**:

- faster loading time (how much though)
- when testing with Max last week it is pretty fast currently

**Con**:

- More organization required.
- You need one home repo linking to other repos
- If one updates 5 components I will need to publish each indivudally and then update for each one of them on Magnolia
- possible names for the libray could become a mess

I think this is a "**Performance vs Code Quality**" question.
In my opinion I thik performance is ok, so one could stick with this solution. However I do so a situation where this project becomes massive and it then makes sense to break it down into smaller chunks.

## Transfer Repo to DF & and NPM logedin with my private account

- Currently I own the Github repo.
- The npm pckg **tc-web** is linked to my private account.

## Apart from code general doc

## Code

- [ ] For components add documentation
- [ ] Generalize names
- [ ] Functions that are used in several components refactor to utilty func, so it is only used once
- [ ] see how available jobs acts when having no jobs available
- [ ] styling for project parts
- [ ] in general be aware end user can be a non-it proffesional
