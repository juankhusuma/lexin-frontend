// @ts-check
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js'

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    trailingSlash: false,
};

export default (phase) => {
    const DEV = phase === PHASE_DEVELOPMENT_SERVER;
    /** @type {import('next').NextConfig} */
    const config = {
        basePath: DEV ? undefined : '/chat/app',
    }
    const loader = DEV ? {} : {
        images:{
            loader:"custom",
            loaderFile:"./img-loader.js",
        }
    }

    return { ...nextConfig, ...config, ...loader }
}
