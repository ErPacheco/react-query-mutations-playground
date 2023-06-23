# react-query-mutations-playground

Small playground application to see some behaviours of the mutations functionality from the famous React framework React Query.

# What is React Query?

React Query is a powerfull data-fetching and state management for web applications, in this case for React applications.

It's main purpose is make easy the processes of fetching, caching, synchronising and updating server data, allowing developers to focus more on the UI building of the application.

## And what are mutations?

> A mutation is any function that causes a side effect

In this case, changing the state of some data outside of the function is our side effect. In React Query, mutations focus on updating the server data and synchronising the queries already cached so the cache is up to date.

## Can I see some information about mutations in this playground?

For now this is not a document repository to solve doubts about the library. This application is more for behaviour purposes. If you want to know more about mutations or React Query, the framework has a great documentation page where you can find a lot of information!

- [React Query latest documentation](https://tanstack.com/query/latest/docs/react/overview)
- [React Query Mutations documentation](https://tanstack.com/query/v4/docs/react/guides/mutations)

# Context of the application

This application was first created in [CodeSandbox](https://codesandbox.io/) for learning purposes about how to use mutations in React Query in different ways.

The application shows a list of users, where we can create, delete or update a users. The users has been obtained from the [DummyJSON API](https://dummyjson.com) (API with fake data for testing and placeholder purposes).

> In specific, the users were obtained doing this fetch: https://dummyjson.com/users?limit=10

# Purpose of the application

The main purpose of application is to show the behaviour of:

- Direct caching a query after a mutation
- Invalidating queries after a mutation to synchronise the cached data with the server data
- Applying optimistic update technique in mutations lifecycle methods
- How to rollback a change if the request sent has failed

# How to use this application

You can clone the repository like:

```
git clone https://github.com/ErPacheco/react-query-mutations-playground.git
```

After cloning the repostitory, install the dependencies:

```
npm install
```

Run the application and play with it with:

```
npm run start
```

# Technical aspects

## The fake server data

To make sure we can use an external service to test the synchronising processes, we are using the local storage of the browser as the server data.

The local storage populated with initial data every time the application initiate or reloads. Given that we don't have a fetcher to send a request to a real server, we have the _userDataContext_ where we have all the methods that access and can modify the local storage.

Is good to mention that, given that this actions almost has not any delay because of the direct usage with the local storage, it has been set a timeout of several miliseconds for each action to fake a real request to an external service.

## Hooks

All the actions related with the server data that we can do in the application are grouped in 2 hooks that you can find in _src/hooks_:

- _useUserDetail_: this hook can give us the data of a user by their ID and we can use 2 mutations to update the user (one use the direct cache update technique and the other one the invalidate queries technique)
- _useUsers_: this hook can give us the list of users that are in our local storage. In this hook we can also use 2 mutations, one for creating a new user and the other to delete a user by their ID.

## Functionalities Context

There are also 2 functionalities in the application to show play with:

- Show User Ids: this functionality allows us to show the user ids in the list of the main page (where the user list is displayed). The purpose of showing the ids is to learn how optimistic updates can introduce to the list fake data (in this case a fake id) and when the request is successfully done, this id is updated with the real one in the background.
- Delete Error: with this boolean we can force an error for the _delete user_ action. This is to show how a rollback works in case the request of the mutation fails.

This 2 functionalities states are stored in another context that you can find in _src/contexts/appFunctionalitiesContext.js_. So that is saved and can be accessed for the entire application.

## Pages

There are 3 pages:

- Main page: `/users` where we can find the list of users
- User detail: `/users/:userId` where we can find the details of the user and we can update their data
- Create user: `/users/create` where we can create a new user

More info in the main application js file: _src/App.js_

# Contribute

This is a playground where you can test anything you want about React Query library! For now is more for "mutations" purposes but if you feel like there is something that can be added, feel free to create a Pull Request with some changes and I will be more than happy to grow this playground to make most people understand the advantages of React Query!
