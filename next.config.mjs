// @ts-check
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js'
import { withSentryConfig } from "@sentry/nextjs";


export default (phase) => {
    const DEV = phase === PHASE_DEVELOPMENT_SERVER;
    /** @type {import('next').NextConfig} */
    const config = {
        experimental: {
          proxyTimeout: 1000 * 60 * 5,
        },
        async rewrites() {
          return [
            {
              source: '/rag/:path*',
              destination: `${process.env.NEXT_PUBLIC_SEMANTIC_SEARCH_API_SERVER}/:path*`, // Proxy to Backend
            }
          ]
        }
    }

    return withSentryConfig(
        {
            reactStrictMode: false,
            trailingSlash: false,
            ...config,
        },
        {
          // For all available options, see:
          // https://github.com/getsentry/sentry-webpack-plugin#options
      
          org: "juan-dharmananda-khusuma",
          project: "lexin-frontend",
      
          // Only print logs for uploading source maps in CI
          silent: !process.env.CI,
      
          // For all available options, see:
          // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
      
          // Upload a larger set of source maps for prettier stack traces (increases build time)
          widenClientFileUpload: true,
      
          // Automatically annotate React components to show their full name in breadcrumbs and session replay
          reactComponentAnnotation: {
            enabled: true,
          },
      
          // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
          // This can increase your server load as well as your hosting bill.
          // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client- 
          // side errors will fail.
          tunnelRoute: "/monitoring",
      
          // Hides source maps from generated client bundles
          // hideSourceMaps: true,
      
          // Automatically tree-shake Sentry logger statements to reduce bundle size
          disableLogger: true,
      
          // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
          // See the following for more information:
          // https://docs.sentry.io/product/crons/
          // https://vercel.com/docs/cron-jobs
          automaticVercelMonitors: true,
        }
      );
}

