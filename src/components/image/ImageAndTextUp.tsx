import React from "react";interface ImageAndTextProps {	title: string;	content: string;	imageSrc: string;	imageAlt: string;}const ImageAndTextUp: React.FC<ImageAndTextProps> = ({     title,     content,     imageSrc,     imageAlt, }) => {	return (		<section className="image-and-text m-5">			<div className="container">				<div className="row justify-content-center">					<div className="col-md-6 text-center">						<img src={imageSrc} alt={imageAlt} className="img-fluid rounded-circle my-4"/>						<h2 className="mt-0">{title}</h2>						<p className="mt-3">{content}</p>					</div>				</div>			</div>		</section>	);};export default ImageAndTextUp;