import React from 'react';
import { gameFeatures } from '../../../Assets/Data';
import './style.css';

const Features = () => {
	return (
		<section className='features text-gray-600 body-font bg-[#1C1C1C]'>
			<h1 className='font-bold text-3xl md:text-7xl lg:text-7xl text-[#FEDB8C] pt-5'>
				Game Features
			</h1>
			<div className='container px-2 md:px-5 lg:px-30 py-7 md:py-20 lg:py-20 mx-auto'>
				<div className='flex justify-center flex-wrap md:-m-4 lg:-m-4'>
					{gameFeatures.map((item, index) => (
						<div
							className='w-11/12 md:w-3/6 md:p-5 lg:p-5 lg:w-1/4 my-5'
							key={index}
						>
							<fieldset className='h-full bg-[#1c1c1c] bg-opacity-0 border-[#758704] border-4 md:px-8 lg:px-8 mt-10 text-center relative flex justify-center items-center'>
								<div className='bg-[#1C1C1C] w-9/12 md:w-8/12 lg:w-8/12 h-12 font-bold text-l md:text-xl lg:text-xl text-[#FEDB8C] absolute -top-7 flex justify-center items-center'>
									<div>{item.title}</div>
								</div>
								{Array.isArray(item.detail) ? (
									<div className='flex flex-col justify-center items-center'>
										<p className='text-white pb-3 text-sm !font-normal'>
											There will be 6 total tiers for upgrading:
										</p>
										<ul className='leading-relaxed text-white text-center'>
											{item.detail.map((task, index1) => (
												<li
													className='md:text-xl lg:text-xl ml-4'
													key={index1 + 25987}
												>
													{task}
												</li>
											))}
										</ul>
									</div>
								) : (
									<p className='my-5 text-white px-3'>{item.detail}</p>
								)}
							</fieldset>
							{/* <h2 className='tracking-widest text-2xl text-[#FEDB8C] title-font font-medium mb-1 w-full bg-orange-700 absolute z-50'>
							CATEGORY
						</h2> */}
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Features;
