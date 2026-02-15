(async function() {
  const mod = await import('https://cdn.jsdelivr.net/npm/@typebot.io/js@0/dist/web.js');
  const Typebot = mod.default || mod;
  Typebot.initBubble({
    typebot: 'faq-8xjnugp',
    previewMessage: {
      message: 'Hi! How can I help you today?',
      autoShowDelay: 5000
    },
    theme: {
      button: {
        backgroundColor: '#C9A86C',
        iconColor: '#FFFFFF'
      },
      previewMessage: {
        backgroundColor: '#1A1A1B',
        textColor: '#FFFFFF'
      },
      chatWindow: {
        backgroundColor: '#1A1A1B'
      }
    }
  });
})();
