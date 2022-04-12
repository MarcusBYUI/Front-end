import React from 'react';
import './style.css';

const Summary = () => {
	return (
		<div className='summary flex justify-center items-center flex-col height-4/5 bg-[#1C1C1C] py-20'>
			<h1 className='md:w-4/5 font-bold text-3xl md:text-7xl lg:text-7xl text-[#FEDB8C] border-b-2 border-b-[#FEDB8C] p-3'>
				Summary
			</h1>
			<p className='w-11/12 md:w-4/5 lg:w-4/5 mt-12 text-xl md:text-2xl lg:text-2xl text-slate-50 '>
				In a far world in the metaverse, civilizations are starting to take
				shape and we are about to witness the birth of the ultimate $Legend.
				With lands waiting to be conquered and Legends eager to take over the
				world, the game of Brawl of Legends is about to begin, but beware of the
				dangers of other legends that are trying to conquer the world with their
				army. Who will conquer the most lands and have the biggest army to take
				control of this metaverse?
			</p>
			<p className='w-11/12 md:w-4/5 lg:w-4/5 mt-12 text-xl md:text-2xl lg:text-2xl text-slate-50 '>
				Brawl of Legends is a building and battle protocol game with unique
				tokenomics. Players will build their own army by themselves or with
				other players in a race to become the metaverse leading $Legend. What
				path does it take to get there? A lot of building & battles but that’s
				for you to decide.
			</p>
		</div>
	);
};

export default Summary;
