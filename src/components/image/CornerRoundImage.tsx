import React from "react";interface CornerRoundImageProps {	src: string;	alt: string;}const CornerRoundImage: React.FC<CornerRoundImageProps> = ({ src, alt }) => (	<img src={src} alt={alt} className="img-fluid rounded my-4"/>);export default CornerRoundImage;