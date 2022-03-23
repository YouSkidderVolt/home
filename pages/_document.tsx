import dayjs from 'dayjs';

import Document, {
	DocumentContext,
	Head,
	Html,
	Main,
	NextScript,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

import { BIRTHDAY } from 'lib/constants';

export default class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
				});

			const initialProps = await Document.getInitialProps(ctx);
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			};
		} finally {
			sheet.seal();
		}
	}

	render() {
		const description = `🚧 Under development... 🚧`;

		return (
			<Html lang="en">
				<Head>
					<meta charSet="utf-8" />
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link
						href="https://fonts.googleapis.com/css2?family=Krona+One&family=Roboto:wght@400;700&display=swap"
						rel="stylesheet"
					/>

					<meta property="og:title" content="~Volt" />
					<meta property="og:type" content="website" />
					<meta property="og:url" content="https://discord.com/users/388343727745400834" />
					<meta property="twitter:url" content="https://discord.com/users/388343727745400834" />

					<meta name="description" content={description} />
					<meta property="og:description" content={description} />
					<meta property="twitter:description" content={description} />
					<meta
						name="keywords"
						content="Volt, Mayank, mayankkaprofile, mcdev"
					/>
					<meta name="author" content="~Volt" />

					<meta name="theme-color" content="#010409" />

					<link
						rel="icon"
						type="image/png"
						href="https://www.dropbox.com/s/h2kza9bi3yzchfb/static%20%2810%29.png?dl=1"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
