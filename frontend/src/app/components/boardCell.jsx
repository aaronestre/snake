const BoardCell = ({ position, isSnake, isFood }) => {
	return (
		<div
			className={`w-[50px] h-[50px] border border-white border-solid 
            ${isSnake ? "bg-green-500" : ""}
            ${isFood ? "bg-red-500" : ""}
            `}
            coords={position}
		/>
	);
};

export default BoardCell;
