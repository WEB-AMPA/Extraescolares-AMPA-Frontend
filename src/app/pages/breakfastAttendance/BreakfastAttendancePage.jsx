
import AttendanceTable from '../../components/breakfastAttendanceComponents/AttendanceTable';

const breakfast = () => {
    const handleAttendanceAdded = (data) => {
        console.log('Attendance added:', data);
    };

    return (
        <div className="App">
            <AttendanceTable onAttendanceAdded={handleAttendanceAdded} />
        </div>
    );
};

export default breakfast;
