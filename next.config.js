module.exports = {
  // define the dynamic route for the collection page
  exportPathMap: function () {
    return {
      '/collections/[collectionName]': {
        page: '/collections/[collectionName]',
      },
    };
  },
};
