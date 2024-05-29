

import Navbar from '../../components/navbar/Navbar';
import Description from '../../components/all-activities/description';
import Classification from '../../components/all-activities/classification';
//import Images from '../../components/all-activities/activities';
import Footer from '../../components/footer/Footer';
import Specificactivities from '../../components/all-activities/specificactivities';

function Allactivities() {
    return (
        <div>
            <Navbar />
            <Description />
            <Classification />
            <Specificactivities />
            <Footer />
        </div>
    )
}
export default Allactivities;