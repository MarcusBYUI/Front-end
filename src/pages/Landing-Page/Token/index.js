import React from 'react';
import img1 from '../../../Assets/image 1.png';
import './style.css';

const Token = () => {
	return (
		<div className='token flex justify-center items-center bg-[#1C1C1C] py-10 md:py-40 lg:py-40'>
			<div className='w-4/5 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 col-span-2'>
				<div className='flex flex-col justify-center items-center'>
					<h1 className='w-full font-bold text-3xl md:text-7xl lg:text-7xl text-[#FEDB8C] border-b-4 border-b-[#FEDB8C] p-3'>
						Token
					</h1>
					<p className='w-full text-xl md:text-2xl lg:text-2xl mt-10 text-slate-100 font-semibold'>
						The $LEGEND token is the main token of value in Brawl of Legends.
						You’ll use it to purchase the NFTs such as the lands and Kingdom
						structures in the game. The token will also be used for staking
						allowing you to earn additional rewards. LEGEND will serve as the
						governance token, giving holders a say in the growth and progression
						of the project.
					</p>
				</div>
				<span className='flex justify-center items-center md:mt-5'>
					<img src={img1} alt='sheild' />
				</span>
			</div>
		</div>
	);
};

export default Token;
