import Image, { type ImageProps } from "next/image";
import { shouldBypassListingImageOptimization } from "@/utils/propertyImage";

type PropertyImageProps = ImageProps;

/** next/image wrapper for API listing photos (S3, etc.). */
export default function PropertyImage({ src, unoptimized, ...props }: PropertyImageProps) {
  const bypass = unoptimized ?? shouldBypassListingImageOptimization(src);
  return <Image src={src} unoptimized={bypass} {...props} />;
}
