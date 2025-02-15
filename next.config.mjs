// @ts-check
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js'

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false
};

export default (phase) => {
    const DEV = phase === PHASE_DEVELOPMENT_SERVER;
    /** @type {import('next').NextConfig} */
    const config = {
        assetPrefix: DEV ? undefined : 'https://lexin.cs.ui.ac.id/chat/',
    }

    return { ...nextConfig, ...config }
}
