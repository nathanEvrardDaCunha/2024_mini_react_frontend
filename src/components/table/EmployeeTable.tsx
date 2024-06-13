import React from 'react';import TableHeader from "./TableHeader";import TableBody from "./TableBody";import TableCell from "./TableCell";import DeleteButton from "../button/DeleteButton";interface Employee {	id: string;	firstName: string;	lastName: string;	email: string;}interface EmployeeTableProps {	employees: Employee[];	onDelete: (employeeId: string) => void;}const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, onDelete }) => {	if (employees.length === 0) {		return <p className="text-center text-light">No employees found.</p>;	}		return (		<div className="table-responsive">			<table className="table table-dark table-striped">				<thead>				<tr>					<TableHeader text="First Name" />					<TableHeader text="Last Name" />					<TableHeader text="Email" />					<TableHeader text="Actions" />				</tr>				</thead>				<TableBody>					{employees.map((employee) => (						<tr key={employee.id}>							<TableCell>{employee.firstName}</TableCell>							<TableCell>{employee.lastName}</TableCell>							<TableCell>{employee.email}</TableCell>							<TableCell>								<DeleteButton onClick={() => onDelete(employee.id)} />							</TableCell>						</tr>					))}				</TableBody>			</table>		</div>	);};export default EmployeeTable;