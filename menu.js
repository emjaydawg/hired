module.exports = {
  fetchMenus: function(aparam, callback) {
    callback([
      {title: 'Jobs', url: '/jobs/' + aparam},
      {title: 'Favorites', url: '/jobs/' + aparam},
      {title: 'Help Center', url: '/jobs/' + aparam},
      {title: 'Resume Builder', url: '/jobs/' + aparam},
      {title: 'User Info', url: '/jobs/' + aparam},
      {title: "Application Status's", url: '/jobs/status' + aparam},
      {title: "Call/ Text Options", url: '/jobs/' + aparam}
    ]);
  }
}
