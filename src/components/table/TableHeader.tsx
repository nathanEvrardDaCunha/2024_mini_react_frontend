import React from 'react';interface TableHeaderProps {	text: string;}const TableHeader: React.FC<TableHeaderProps> = ({ text }) => {	return <th className="text-white">{text}</th>;};export default TableHeader;