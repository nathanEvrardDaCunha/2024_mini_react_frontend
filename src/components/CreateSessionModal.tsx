import { useState } from "react";import { Button, Form, Modal } from "react-bootstrap";interface Session {	id: string;	theme: string;	duration: number;	startDate: string;	endDate: string;	price: number;	minimalClient: number;	employeeId: string;	status: string;}interface CreateSessionModalProps {	show: boolean;	onClose: () => void;	onCreate: (newSession: Omit<Session, 'id'>) => Promise<void>;}const CreateSessionModal: React.FC<CreateSessionModalProps> = ({ show, onClose, onCreate }) => {	const [theme, setTheme] = useState('');	const [startDate, setStartDate] = useState('');	const [startHour, setStartHour] = useState('');	const [price, setPrice] = useState(0);	const [minimalClient, setMinimalClient] = useState(0);		const handleSubmit = async (e: React.FormEvent) => {		e.preventDefault();		const startDateTime = new Date(`${startDate}T${startHour}:00`);		const duration = 60;		const endDateTime = new Date(startDateTime.getTime() + duration * 60 * 1000);		const status = "available";		const newSession: Omit<Session, 'id'> = {			theme,			duration,			startDate: startDateTime.toISOString(),			endDate: endDateTime.toISOString(),			price,			minimalClient,			employeeId: '',			status,		};		await onCreate(newSession);	};		return (		<Modal show={show} onHide={onClose}>			<Modal.Header closeButton>				<Modal.Title>Create Session</Modal.Title>			</Modal.Header>			<Modal.Body>				<Form onSubmit={handleSubmit}>					<Form.Group controlId="theme">						<Form.Label>Theme</Form.Label>						<Form.Control							type="text"							value={theme}							onChange={(e) => setTheme(e.target.value)}						/>					</Form.Group>					<Form.Group controlId="startDate">						<Form.Label>Start Date</Form.Label>						<Form.Control							type="date"							value={startDate}							onChange={(e) => setStartDate(e.target.value)}						/>					</Form.Group>					<Form.Group controlId="startHour">						<Form.Label>Start Hour</Form.Label>						<Form.Control							type="time"							value={startHour}							onChange={(e) => setStartHour(e.target.value)}						/>					</Form.Group>					<Form.Group controlId="price">						<Form.Label>Price</Form.Label>						<Form.Control							type="number"							value={price}							onChange={(e) => setPrice(parseInt(e.target.value))}						/>					</Form.Group>					<Form.Group controlId="minimalClient">						<Form.Label>Minimal Client</Form.Label>						<Form.Control							type="number"							value={minimalClient}							onChange={(e) => setMinimalClient(parseInt(e.target.value))}						/>					</Form.Group>					<Button variant="primary" type="submit">						Create					</Button>				</Form>			</Modal.Body>		</Modal>	);};export default CreateSessionModal;