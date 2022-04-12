import React from 'react';
import { roadMap } from '../../../Assets/Data';
import './style.css';

const TimeLine = () => {
	const arrayToMap = Array.from(Array(9).keys());
	return (
		<section className='flex flex-col items-center justify-center text-gray-600 body-font bg-[#1C1C1C]'>
			<h1 className='w-11/12 md:w-4/5 lg:w-4/5 font-bold text-3xl md:text-7xl lg:text-7xl text-[#FEDB8C] mt-8 p-5 border-b-2 border-b-[#FEDB8C]'>
				Roadmap
			</h1>
			<div className='container px-5 py-24 md:py-16 flex flex-wrap'>
				<div className='flex justify-center flex-wrap w-screen'>
					<div className='lg:w-3/4 md:w-11/12 md:pr-10 md:py-6'>
						{roadMap.map((item, index) => (
							<div className='flex flex-col relative pb-12' key={index}>
								{index == 0 ? (
									<div className='w-11/12 md:w-6/12 lg:w-6/12 md:self-start lg:self-start'>
										<div className='flex justify-between items-center'>
											<div className='block md:hidden lg:hidden w-1/4 border-2 border-[#ffff00] bg-[#ffff00]'></div>
											<div className='border-4 border-[#ffff00] md:mr-4 lg:mr-4 p-5 md:w-full lg:w-full relative'>
												<span className='hidden md:block lg:block w-10 h-10 absolute right-5'>
													<svg
														className='checkmark'
														xmlns='http://www.w3.org/2000/svg'
														viewBox='0 0 52 52'
													>
														<circle
															className='checkmark__circle'
															cx='26'
															cy='26'
															r='25'
															fill='none'
														/>
														<path
															className='checkmark__check'
															fill='none'
															d='M14.1 27.2l7.1 7.2 16.7-16.8'
														/>
													</svg>
												</span>
												<span className='block md:hidden lg:hidden w-10 h-10 font-bold absolute top-0 right-0 md:top-5 lg:top-5 md:right-5 lg:right-5 bg-[#24721d] text-white'>
													<span className='text-2xl'>✔</span>
												</span>
												<h2 className='text-[#FEDC8C] font-bold text-3xl title-font mb-1 tracking-wider pt-12'>
													{item.name}
												</h2>
												<ul className='leading-relaxed text-white list-disc list-inside text-center'>
													{item.tasks.map((task, index1) => (
														<li
															className='md:text-xl lg:text-xl ml-4'
															key={index1 + 32156}
														>
															{task}
														</li>
													))}
												</ul>
											</div>
											<div className='md:self-start lg:self-start h-full absolute inset-0 flex items-center md:justify-center lg:justify-center'>
												<div className='h-full w-1 bg-[#ffff00] pointer-events-none'></div>
											</div>
											<div className='hidden md:block lg:block w-1/4 border-2 border-[#ffff00] bg-[#ffff00]'></div>
										</div>
									</div>
								) : index % 2 == 0 ? (
									<div className='w-11/12 md:w-6/12 lg:w-6/12 md:self-start lg:self-start'>
										<div className='flex justify-between items-center'>
											<div className='block md:hidden lg:hidden w-1/4 border-2 border-[#ffff00] bg-[#ffff00]'></div>
											<div className='border-4 border-[#ffff00] md:mr-4 lg:mr-4 p-5 md:w-full lg:w-full relative'>
												{/* <span className='w-20 h-7 font-bold absolute right-0 top-0 md:top-1 lg:top-1 md:right-1 lg:right-1 bg-[#ffff00] '>
													<span>Pending</span>
												</span> */}
												<h2 className='text-[#FEDC8C] font-bold text-3xl title-font mb-1 tracking-wider'>
													{item.name}
												</h2>
												<ul className='leading-relaxed text-white list-disc list-inside text-center'>
													{item.tasks.map((task, index1) => (
														<li
															className='md:text-xl lg:text-xl ml-4'
															key={index1 + 32156}
														>
															{task}
														</li>
													))}
												</ul>
											</div>
											<div className='md:self-start lg:self-start h-full absolute inset-0 flex items-center md:justify-center lg:justify-center'>
												<div className='h-full w-1 bg-[#ffff00] pointer-events-none'></div>
											</div>
											<div className='hidden md:block lg:block w-1/4 border-2 border-[#ffff00] bg-[#ffff00]'></div>
										</div>
									</div>
								) : (
									<div className='w-11/12 md:w-6/12 lg:w-6/12 md:self-end lg:self-end'>
										<div className='flex justify-between items-center'>
											<div className='w-1/4 border-2 border-[#ffff00] bg-[#ffff00]'></div>
											<div className='border-4 border-[#ffff00] md:ml-4 lg:ml-4 p-5 md:w-full lg:w-full relative'>
												{/* <span className='w-20 h-7 font-bold absolute right-0 top-0 md:top-1 lg:top-1 md:right-1 lg:right-1 bg-[#ffff00] '>
													<span>Pending</span>
												</span> */}
												<h2 className='text-[#FEDC8C] font-bold text-3xl title-font mb-1 tracking-wider'>
													{item.name}
												</h2>
												<ul className='leading-relaxed text-white list-disc list-inside text-center'>
													{item.tasks.map((task, index1) => (
														<li
															className='md:text-xl lg:text-xl ml-4'
															key={index1 + 25987}
														>
															{task}
														</li>
													))}
												</ul>
											</div>
											<div className='md:self-start lg:self-start h-full absolute inset-0 flex items-center md:justify-center lg:justify-center'>
												<div className='h-full w-1 bg-[#ffff00] pointer-events-none'></div>
											</div>
										</div>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default TimeLine;
