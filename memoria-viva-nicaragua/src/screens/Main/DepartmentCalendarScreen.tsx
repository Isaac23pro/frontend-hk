import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getEventsForDepartment, getDepartments } from '../../services/api';
import { CulturalEvent, Department } from '../../types';
import EventDetailModal from '../../components/common/EventDetailModal';

const CalendarWrapper = styled.div`
  .react-calendar {
    width: 100%;
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius};
    box-shadow: ${({ theme }) => theme.shadows.medium};
    padding: ${({ theme }) => theme.spacing.sm};
  }
  .react-calendar__tile--active {
    background-color: ${({ theme }) => theme.colors.secondary} !important;
    color: white;
  }
  .react-calendar__tile--now {
    background-color: ${({ theme }) => theme.colors.tertiary}33;
  }
  .react-calendar__navigation button {
    color: ${({ theme }) => theme.colors.secondary};
    font-size: 1rem;
    font-weight: bold;
  }
  .react-calendar__month-view__days__day--weekend {
    color: ${({ theme }) => theme.colors.secondary};
  }
  .event-dot {
    height: 8px;
    width: 8px;
    background-color: ${({ theme }) => theme.colors.accent};
    border-radius: 50%;
    margin: 0 auto;
    margin-top: 4px;
  }
`;

const ScreenContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h1`
  text-transform: capitalize;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const EventsList = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const EventItem = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const DepartmentCalendarScreen = () => {
  const { departmentId } = useParams<{ departmentId: string }>();
  const [department, setDepartment] = useState<Department | null>(null);
  const [events, setEvents] = useState<CulturalEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CulturalEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!departmentId) return;
      setLoading(true);
      try {
        const [allDepartments, departmentEvents] = await Promise.all([
          getDepartments(),
          getEventsForDepartment(departmentId),
        ]);
        const currentDept = allDepartments.find(d => d.id === departmentId);
        setDepartment(currentDept || null);
        setEvents(departmentEvents);
      } catch (error) {
        console.error("Failed to fetch calendar data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [departmentId]);

  const getEventsForDay = (date: Date) => {
    return events.filter(event => new Date(event.date).toDateString() === date.toDateString());
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month' && getEventsForDay(date).length > 0) {
      return <div className="event-dot"></div>;
    }
    return null;
  };

  if (loading) return <p>Cargando calendario...</p>;
  if (!department) return <p>Departamento no encontrado.</p>;

  const selectedDayEvents = getEventsForDay(selectedDate);

  return (
    <ScreenContainer>
      <Title>{department.name}</Title>
      <CalendarWrapper>
        <Calendar
          onChange={(value) => setSelectedDate(value as Date)}
          value={selectedDate}
          tileContent={tileContent}
        />
      </CalendarWrapper>
      <EventsList>
        <h3>Eventos para {selectedDate.toLocaleDateString('es-NI')}</h3>
        {selectedDayEvents.length > 0 ? (
          selectedDayEvents.map(event => (
            <EventItem key={event.id} onClick={() => setSelectedEvent(event)}>
              <h4>{event.name}</h4>
              <p>{event.municipality}</p>
            </EventItem>
          ))
        ) : (
          <p>No hay eventos para este día.</p>
        )}
      </EventsList>
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </ScreenContainer>
  );
};

export default DepartmentCalendarScreen;