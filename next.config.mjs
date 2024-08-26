import dotenv from 'dotenv'
/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DB_PASSWORD: process.env.DB_PASSWORD,
    },
};

export default nextConfig;
