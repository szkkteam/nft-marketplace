import createEmotionServer from '@emotion/server/create-instance';
import Document, {
  DocumentProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

import { AppConfig } from '@/utils/AppConfig';
import createEmotionCache from '@/utils/createEmotionCache';

interface ExtenedDocumentProps extends DocumentProps {
  emotionStyleTags?: typeof createEmotionCache;
}

// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document<ExtenedDocumentProps> {
  static async getInitialProps(ctx: any) {
    const originalRenderPage = ctx.renderPage;
    // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
    // However, be aware that it can have global side effects.
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) =>
          function EnchanceApp(props: any) {
            // @ts-ignore - `enhanceApp` is not defined in `Next.js v9.0.0-canary.1`
            return <App emotionCache={cache} {...props} />;
          },
      });

    const initialProps = await Document.getInitialProps(ctx);
    // This is important. It prevents emotion to render invalid HTML.
    // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ));

    return { ...initialProps, emotionStyleTags };
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Html lang={AppConfig.locale}>
        <Head>{this.props.emotionStyleTags}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
