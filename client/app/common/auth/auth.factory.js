let AuthFactory = function (RootRef, $firebaseAuth, Toast) {
  "ngInject";
  const auth = $firebaseAuth(RootRef);
  let beforeUnAuthCallbacks = [];

  let authObject = () => {
    return auth;
  };

  let signIn = () => {
    _.each(beforeUnAuthCallbacks, _.partial(_.attempt));
    auth.$authWithOAuthPopup('github').then(function (authData) {
      Toast.show('Welcome ' + authData.github.username + '!');
    }).catch(function (error) {
      Toast.show('Login Failed! ' + error);
    });
  };

  let signOut = () => {
    _.each(beforeUnAuthCallbacks, _.partial(_.attempt));
    auth.$unauth();
  };

  let isAuthenticated = () => {
    return !!auth.$getAuth();
  };

  let authAnonymously = () => {
    auth.$authAnonymously().catch(function (error) {
      Toast.show('Login Failed! ' + error);
    });
  };

  let onBeforeUnAuth = (callback) => {
    beforeUnAuthCallbacks.push(callback);
  };

  let service = {
    authObject,
    signIn,
    signOut,
    isAuthenticated,
    authAnonymously,
    onBeforeUnAuth
  };

  auth.$onAuth(function (authData) {
    if (!authData) {
      // Chat can't be used, when completely unauthenticated, so after signout we signin as anonymous
      service.authAnonymously();
      return;
    }
    if (authData.github) {
      service.username = authData.github.username;
      service.isAnonymous = false;
    } else {
      service.username = 'guest' + authData.uid.substr(-3);
      service.isAnonymous = true;
    }
    service.data = authData;
  });

  return service;
};

export default AuthFactory;

