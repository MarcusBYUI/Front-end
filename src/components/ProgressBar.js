import React from 'react';

const ProgressBar = ({ progressPercentage }) => {
	return (
		<div className='relative h-6 w-40 bg-gray-300 text-center'>
			<div
				style={{ width: `${progressPercentage}%` }}
				className={`absolute h-full bg-[#FEDC8C]`}
			></div>
			{progressPercentage}/20
		</div>
	);
};

export default ProgressBar;
