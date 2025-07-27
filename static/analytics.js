// Load Vercel Analytics
(function() {
  if (typeof window !== 'undefined') {
    // Dynamic import to avoid module issues
    import('@vercel/analytics').then(({ inject }) => {
      inject();
    }).catch(function(err) {
      console.warn('Analytics failed to load:', err);
    });
  }
})();