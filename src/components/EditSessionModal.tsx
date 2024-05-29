import { useState } from "react";import { Button, Col, Form, Modal, Row } from "react-bootstrap";import axios from "axios";import InputField from "./form/InputField";import EditButton from "./button/EditButton";import ErrorMessage from "./message/ErrorMessage";import SubmitButton from "./button/SubmitButton";interface Session {	id: string;	theme: string;	duration: number;	startDate: string;	endDate: string;	price: number;	minimalClient: number;	employeeId: string;	status: string;}interface EditSessionModalProps {	show: boolean;	onClose: () => void;	onEdit: (updatedSession: Session) => Promise<void>;	session: Session;}const EditSessionModal: React.FC<EditSessionModalProps> = ({ show, onClose, onEdit, session }) => {	const [theme, setTheme] = useState(session.theme);	const [startDate, setStartDate] = useState(session.startDate);	const [startHour, setStartHour] = useState('');	const [price, setPrice] = useState(session.price);	const [minimalClient, setMinimalClient] = useState(session.minimalClient);	const [error, setError] = useState('');		const handleSubmit = async (e: React.FormEvent) => {		e.preventDefault();		const [selectedStartHour, startMinute] = startHour.split(':');		const startDateTime = new Date(startDate);		startDateTime.setHours(parseInt(selectedStartHour), parseInt(startMinute));				const localStartDateTime = new Date(startDateTime.getTime() - 60 * 1000);				const duration = 60;		const endDateTime = new Date(localStartDateTime.getTime() + duration * 60 * 1000);		const status = "available";				const updatedSession: Session = {			...session,			theme,			duration,			startDate: localStartDateTime.toISOString(),			endDate: endDateTime.toISOString(),			price,			minimalClient,			status,		};				try {			await onEdit(updatedSession);			setError('');			onClose();		} catch (error) {			if (axios.isAxiosError(error) && error.response) {				setError(error.response.data.error);			} else {				setError('Error updating session');			}		}	};		return (		<Modal show={show} onHide={onClose} size="lg" centered >			<Modal.Header closeButton className="bg-dark text-white">				<Modal.Title>Edit Session</Modal.Title>			</Modal.Header>			<Modal.Body className="bg-dark text-white">				{error && <ErrorMessage message={error} />}				<form onSubmit={handleSubmit}>					<div className="row">						<div className="col-md-6">							<InputField								label="Theme"								type="text"								name="theme"								value={theme}								onChange={(e) => setTheme(e.target.value)}								required							/>						</div>						<div className="col-md-6">							<InputField								label="Price"								type="number"								name="price"								min={10}								value={price}								onChange={(e) => setPrice(parseInt(e.target.value))}								required							/>						</div>					</div>					<div className="row">						<div className="col-md-6">							<InputField								label="Start Date"								type="date"								name="startDate"								value={startDate}								onChange={(e) => setStartDate(e.target.value)}								required							/>						</div>						<div className="col-md-6">							<InputField								label="Start Hour"								type="time"								name="startHour"								value={startHour}								onChange={(e) => setStartHour(e.target.value)}								required							/>						</div>					</div>					<InputField						label="Minimal Clients"						type="number"						name="minimalClient"						min={2}						value={minimalClient}						onChange={(e) => setMinimalClient(parseInt(e.target.value))}						required					/>					<div className="d-grid">						<SubmitButton text="Edit" />					</div>				</form>			</Modal.Body>		</Modal>	);};export default EditSessionModal;