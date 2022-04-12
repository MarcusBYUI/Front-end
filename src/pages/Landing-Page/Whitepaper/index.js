import React from 'react';
import { Link } from 'react-router-dom';
import wizard from '../../../Assets/wizard hat2 1.png';
import './style.css';
const Whitepaper = () => {
	return (
		<section className='whitepaper body-font h-screen flex justify-center items-center'>
			<div className='flex flex-col justify-center items-center text-center'>
				<h2 className='title-font px-5 text-2xl md:text-5xl lg:text-5xl leading-tight md:leading-normal lg:leading-normal  font-medium text-white mt-6 mb-3 md:px-10 lg:px-44 py-10'>
					Press the Button to learn in depth, information About Brawl of Legends
				</h2>

				<a
					href='https://brawl-of-legends.gitbook.io/brawl-of-legends-whitepaper/'
					target='_blank'
					className='flex mx-auto mt-6 text-black text-xl md:text-2xl lg:text-2xl font-bold bg-[#FEDB8C] border-0 py-4 px-10 focus:outline-none hover:bg-yellow-600 rounded mb-18'
				>
					Read Whitepaper
				</a>
			</div>
		</section>
	);
};

export default Whitepaper;
