export default function myImageLoader({src,width}) {
    return `/chat/app/${src}?width=${width}`;
}