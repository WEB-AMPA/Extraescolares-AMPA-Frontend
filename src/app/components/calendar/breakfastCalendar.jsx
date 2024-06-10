import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarCustom.css'; // Importa el archivo CSS personalizado

const BreakfastCalendar = () => {
    const { studentId } = useParams();
    const [attendanceHistory, setAttendanceHistory] = useState([]);
    const [studentName, setStudentName] = useState('');
    const [error, setError] = useState('');

    // Función para obtener el rango de fechas del mes actual
    const getCurrentMonthRange = () => {
        const currentDate = new Date();
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        return [startOfMonth, endOfMonth];
    };

    const [dateRange, setDateRange] = useState(getCurrentMonthRange);

    useEffect(() => {
        const fetchAttendanceHistory = async () => {
            try {
                const timezoneOffset = new Date().getTimezoneOffset() * 60000; // Desplazamiento de la zona horaria en milisegundos
                const start_date = new Date(dateRange[0].getTime() - timezoneOffset).toISOString().split('T')[0];
                const end_date = new Date(dateRange[1].getTime() - timezoneOffset).toISOString().split('T')[0];

                const response = await axios.get(`http://localhost:3000/breakfast-attendance/student/${studentId}`, {
                    params: { start_date, end_date }
                });
                if (response.data.length > 0) {
                    setAttendanceHistory(response.data);
                    // Suponiendo que todos los registros son del mismo estudiante, tomamos el nombre del primer registro
                    setStudentName(`${response.data[0].student_id.name} ${response.data[0].student_id.lastname}`);
                } else {
                    setStudentName(''); // En caso de que no haya registros
                }
            } catch (error) {
                setError('Error fetching attendance history');
                console.error('Error fetching attendance history:', error.response || error.message || error);
            }
        };

        fetchAttendanceHistory();
    }, [studentId, dateRange]);

    const handleDateChange = (range) => {
        setDateRange(range);
    };

    const handleActiveStartDateChange = ({ activeStartDate }) => {
        const startOfMonth = new Date(activeStartDate.getFullYear(), activeStartDate.getMonth(), 1);
        const endOfMonth = new Date(activeStartDate.getFullYear(), activeStartDate.getMonth() + 1, 0);
        setDateRange([startOfMonth, endOfMonth]);
    };

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const timezoneOffset = date.getTimezoneOffset() * 60000;
            const formattedDate = new Date(date.getTime() - timezoneOffset).toISOString().split('T')[0];
            const attendance = attendanceHistory.find(record => {
                const recordDate = new Date(record.date);
                const recordDateFormatted = new Date(recordDate.getTime() - recordDate.getTimezoneOffset() * 60000).toISOString().split('T')[0];
                return recordDateFormatted === formattedDate;
            });

            if (attendance) {
                if (attendance.attendance === 1) {
                    // Estilo para los días que el estudiante vino
                    return <div className="flex items-center justify-center h-full w-full"><div className="bg-green-400 rounded-full h-6 w-6"></div></div>;
                } else {
                    // Estilo para los días que el estudiante no vino
                    return <div className="flex items-center justify-center h-full w-full"><div className="bg-red-400 rounded-full h-6 w-6"></div></div>;
                }
            }
        }
        return null;
    };

    return (
        <div className="flex flex-col items-center mt-10">
            <h2 className="text-2xl font-bold mb-4">Historial de Asistencias</h2>
            {error && <p className="text-red-500">{error}</p>}
            <p className="text-lg font-semibold mb-4">Alumno/a: {studentName}</p>
            <div>
                <Calendar
                className="custom-calendar"
                    selectRange={true}
                    onChange={handleDateChange}
                    value={dateRange}
                    tileContent={tileContent}
                    onActiveStartDateChange={handleActiveStartDateChange}
                />
        </div>
            <Link to={`/intranet/breakfast/`} className="mt-4 underline">Volver a la lista de asistencia</Link>
        </div>
    );
};

export default BreakfastCalendar;
