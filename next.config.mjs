/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        domains: ["res.cloudinary.com", "images.unsplash.com", "upload.wikimedia.org", "document-export.canva.com", "api.dicebear.com", "plus.unsplash.com"],
    },

};

export default nextConfig;