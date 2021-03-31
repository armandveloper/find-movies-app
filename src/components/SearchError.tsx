import Box from '@material-ui/core/Box';

interface SearchErrorProps {
	type: string;
	title?: string;
	description: string;
}
function SearchError({
	type,
	title = 'Oops...',
	description,
}: SearchErrorProps) {
	const img =
		type === 'BackendError'
			? '/img/surprised.svg'
			: '/img/magnifying-glass.svg';

	return (
		<Box
			height="100%"
			flexGrow={1}
			display="flex"
			alignItems="center"
			justifyContent="center"
		>
			<div className="search-error">
				<img src={img} alt={title} className="search-error__img" />
				<h3 className="search-error__title">{title}</h3>
				<p>{description}</p>
			</div>
		</Box>
	);
}

export default SearchError;
