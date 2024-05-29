import React from "react";interface LabelFormProps {	htmlFor: string;	text: string;}const LabelForm: React.FC<LabelFormProps> = ({ htmlFor, text }) => (	<label htmlFor={htmlFor} className="form-label text-light">		{text}	</label>);export default LabelForm;