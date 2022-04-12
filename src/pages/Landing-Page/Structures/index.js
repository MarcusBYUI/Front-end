import React from 'react';
import requireContext from 'require-context.macro';
import { lands } from '../../../Assets/Data';
import { ImageBundleImport } from '../../../components/ImageBundleImport';
import './style.css';

const images = ImageBundleImport(
	requireContext('../../../Assets/Lands', false, /\.(png|jpe?g|svg)$/)
);
const imgLinks = Object.values(images);
const Structures = () => {
	const arrayToMap = Array.from(Array(9).keys());

	return (
		<section className='structures flex flex-col items-center justify-center text-gray-600 body-font bg-[#1C1C1C]'>
			<h1 className='w-11/12 md:w-4/5 lg:w-4/5 font-bold text-3xl md:text-5xl lg:text-7xl text-[#FEDB8C] mt-8 p-5 border-b-2 border-b-[#FEDB8C]'>
				Land & Structures
			</h1>
			<div className='container px-2 md:px-5 lg:px-30 py-5 md:py-20 lg:py-20 mx-auto'>
				<div className='flex justify-center flex-wrap md:-m-4 lg:-m-4'>
					{lands.map((item, index) => (
						<div
							className='w-11/12 py-5 md:p-5 lg:p-5 md:w-3/6 lg:w-1/4'
							key={index}
						>
							<fieldset className='h-full bg-zinc-900 bg-opacity-0 border-[#758704] border-4 px-3 py-5 overflow-hidden text-center relative'>
								<legend className='tracking-widest  text-lg text-[#FEDB8C] title-font font-medium  mb-1 px-2'>
									{item.name}
								</legend>
								<img
									className='inline'
									src={imgLinks[index]}
									alt='Land Image'
								/>
								<p className='text-white'>{item.description}</p>
							</fieldset>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Structures;
