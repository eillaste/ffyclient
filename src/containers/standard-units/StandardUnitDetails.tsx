import { useParams } from 'react-router-dom';
import { IRouteId } from '../../types/IRouteId';

const StandardUnitDetails = () => {
	// get the router params from hook
	const { id } = useParams() as IRouteId;
	console.log('Whaat');
	return <div>Standard Unit Details Id: {id}</div>;
};

export default StandardUnitDetails;
