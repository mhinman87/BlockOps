import { useEffect } from 'react';

const CHATBOT_URL = 'https://block-ops-chatbot.vercel.app';

export default function BlockOpsChatWidget() {
  useEffect(() => {
    window.IceCapChatConfig = { apiUrl: CHATBOT_URL };

    const script = document.createElement('script');
    script.src = `${CHATBOT_URL}/widget.js`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
      delete window.IceCapChatConfig;
    };
  }, []);

  return null;
}
