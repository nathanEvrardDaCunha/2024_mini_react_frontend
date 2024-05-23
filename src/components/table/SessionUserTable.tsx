import React, { useState } from 'react';import JoinSessionModal from '../JoinSessionModal';interface Session {	id: string;	theme: string;	startDate: string;	endDate: string;	price: number;	minimalClient: number;	employeeId: string;}interface SessionUserTableProps {	sessions: Session[];	onJoin: (sessionId: string, email: string, numberOfPeople: number) => Promise<void>;}const SessionUserTable: React.FC<SessionUserTableProps> = ({ sessions, onJoin }) => {	const [showModal, setShowModal] = useState(false);	const [selectedSessionId, setSelectedSessionId] = useState('');		const handleJoinClick = (sessionId: string) => {		setSelectedSessionId(sessionId);		setShowModal(true);	};		const handleJoinSession = async (email: string, numberOfPeople: number) => {		await onJoin(selectedSessionId, email, numberOfPeople);		setShowModal(false);	};		if (sessions.length === 0) {		return <p className="text-center">No sessions found.</p>;	}		const formatTime = (dateString: string) => {		const date = new Date(dateString);		return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });	};		const selectedSession = sessions.find((session) => session.id === selectedSessionId);		return (		<div className="table-responsive">			<table className="table table-striped">				<thead>				<tr>					<th>Theme</th>					<th>Start Time</th>					<th>End Time</th>					<th>Price</th>					<th>Minimal Clients</th>					<th>Actions</th>				</tr>				</thead>				<tbody>				{sessions.map((session) => (					<tr key={session.id}>						<td>{session.theme}</td>						<td>{formatTime(session.startDate)}</td>						<td>{formatTime(session.endDate)}</td>						<td>{session.price}</td>						<td>{session.minimalClient}</td>						<td>							<button								className="btn btn-primary btn-sm"								onClick={() => handleJoinClick(session.id)}							>								Join							</button>						</td>					</tr>				))}				</tbody>			</table>			{selectedSession && (				<JoinSessionModal					show={showModal}					onClose={() => setShowModal(false)}					onJoin={handleJoinSession}					minimalClient={selectedSession.minimalClient}				/>			)}		</div>	);};export default SessionUserTable;