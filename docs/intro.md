Built with React 16.8, [Material-UI](https://material-ui.com) 4, and Firebase.

Documentation started with version 3.1 in June 2019.

## Changelog

### 3.1 – June 2019

- Overhauled base app infrastructure for routing; removed `withAuthentication`
  and `withAuthorisation` HOCs for hooks and composed components
  `<ProtectedRoute>` and `<Navigation>`.

  - Solved issue of **all** components re-mounting when the `UserContext`
    updates with a new version of the user document.

- Upgraded to Material-UI v4.

### 3.0 – February 2019

Released during UNSW O Week 2019.

### 2.0 – September 2018

### 1.0 – Early 2018
