import { Html, Head, Main, NextScript } from 'next/document';

export default function Document(){
    return (
        <Html lang="en">
            <Head>

            </Head>
            <body className="bg-gray-250 dark:bg-gray-900 text-black dark:text-white">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}