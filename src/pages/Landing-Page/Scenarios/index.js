import React from 'react';

const Scenarios = () => {
	return (
		<div className='summary flex justify-center items-center flex-col height-4/5 bg-[#1C1C1C] py-20'>
			<h1 className='w-11/12 lg:w-4/5 font-bold text-3xl md:text-5xl lg:text-6xl text-[#FEDB8C] border-b-2 border-b-[#FEDB8C] md:px-40 lg:px-48 py-5'>
				Legend Expeditions & Raid Scenarios
			</h1>
			<p className='w-11/12 md:w-4/5 lg:w-4/5 mt-12 text-xl md:text-2xl lg:text-2xl text-slate-50'>
				Legends will be able to go on expeditions to explore the metaverse and
				receive in exchange $LEGEND. Other players will be able raid the
				expeditions of current legends and have a chance to obtain part of their
				treasure finds. This will be determined by a formula that will take into
				account the Attack, Defense and Utility of their respective kingdoms.
			</p>
		</div>
	);
};

export default Scenarios;
