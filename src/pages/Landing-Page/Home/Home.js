import React from 'react';
import requireContext from 'require-context.macro';
import { ImageBundleImport } from '../../../components/ImageBundleImport';
import './style.css';

const images = ImageBundleImport(
	requireContext('../../../Assets/Homebottom', false, /\.(png|jpe?g|svg)$/)
);
const imgLinks = Object.values(images);

const Home = () => {
	return (
		<div className='home-bottom-box'>
			<h1 className='font-semibold text-white px-2 md:text-white lg:text-white text-2xl md:text-3xl lg:text-5xl pt-40 md:pt-72 lg:pt-60 md:mx-20 lg:mx-[15rem]'>
				An innovative Build, Upgrade & Battle P2E Game on Avalanche.
			</h1>
			<div className='mt-40 pb-5 md:mt-48 lg:mt-52'>
				<h1 className='font-bold text-[#FEDB8C] text-3xl md:text-4xl lg:text-6xl z-10'>
					For Players, by players.
				</h1>
				<div className='grid grid-cols-3 md:grid-cols-9 lg:grid-cols-9  mx-7 mt-7 brightness-50 justify-center items-center'>
					{imgLinks.map((imgSrc, index) => (
						<img src={imgSrc} alt={index} key={index} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Home;
