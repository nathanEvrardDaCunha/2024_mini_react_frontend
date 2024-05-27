import React, { useEffect, useState } from 'react';import axios from 'axios';import SessionUserTable from '../table/SessionUserTable';import LoadingSpinner from './LoadingSpinner';import ErrorMessage from '../message/ErrorMessage';interface Session {	id: string;	theme: string;	startDate: string;	endDate: string;	price: number;	minimalClient: number;	employeeId: string;	status: string;}const SessionUserList = () => {	const [sessions, setSessions] = useState<Session[]>([]);	const [loading, setLoading] = useState(true);	const [error, setError] = useState<string | null>(null);		useEffect(() => {		fetchSessions();	}, []);		const fetchSessions = async () => {		try {			const response = await axios.get('http://localhost:3000/session');			const sessionsData = response.data;						const sessionsWithStatus = await Promise.all(				sessionsData.map(async (session: Session) => {					const statusResponse = await axios.get(`http://localhost:3000/session/${session.id}/status`);					return { ...session, status: statusResponse.data.status };				})			);						setSessions(sessionsWithStatus);			setLoading(false);		} catch (error) {			setError('Error fetching sessions');			setLoading(false);		}	};		const joinSession = async (sessionId: string, email: string, numberOfPeople: number) => {		try {			await axios.post(`http://localhost:3000/session/${sessionId}/join`, {				email,				numberOfPeople,			});			await fetchSessionStatus(sessionId);		} catch (error) {			if (axios.isAxiosError(error) && error.response) {				setError(error.response.data.error);			} else {				setError('Error joining session');			}		}	};		const fetchSessionStatus = async (sessionId: string) => {		try {			const response = await axios.get(`http://localhost:3000/session/${sessionId}/status`);			const status = response.data.status;						setSessions((prevSessions) =>				prevSessions.map((session) => (session.id === sessionId ? { ...session, status } : session))			);		} catch (error) {			console.error('Error fetching session status:', error);		}	};		if (loading) {		return <LoadingSpinner />;	}		return (		<div className="container my-5">			<h2 className="text-center mt-5 mb-4">Session List</h2>			{error && <ErrorMessage message={error} />}			<SessionUserTable				sessions={sessions}				onJoin={joinSession}				onStatusChange={fetchSessionStatus}			/>		</div>	);};export default SessionUserList;