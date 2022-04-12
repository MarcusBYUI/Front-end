import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import requireContext from 'require-context.macro';
import { ImageBundleImport } from '../ImageBundleImport';

import './style.css';
import { lands } from '../../Assets/Data';

const images = ImageBundleImport(
	requireContext('../../Assets/Lands', false, /\.(png|jpe?g|svg)$/)
);
const imgLinks = Object.values(images);

let count = 0;
let slideInterval;

const CarousalTailwind = () => {
	const slideRef = useRef();
	const [currentIndex, setCurrentIndex] = useState(0);

	const LandsName = lands.map((item) => item.name);

	const handleOnNextClick = () => {
		count = (count + 1) % imgLinks.length;
		setCurrentIndex(count);
		slideRef.current.classList.add('fade-anim');
	};

	const handleOnPrevClick = () => {
		const productsLength = imgLinks.length;
		count = (currentIndex + productsLength - 1) % productsLength;
		setCurrentIndex(count);
		slideRef.current.classList.add('fade-anim');
	};
	/////////////////////////////////////// -----on  mouse in and out stop slider ///////////////////////////////
	// const pauseSlider = () => {
	// 	clearInterval(slideInterval);
	// };
	///////////////////////////////////////////////////////// to slide automatically uncomment below code ////////////////////

	// const startSlider = () => {
	// 	setInterval(() => {
	// 		handleOnNextClick();
	// 	}, 3000);
	// };
	// const removeAnimation = () => {
	// 	slideRef.current.classList.remove('fade-anim');
	// };

	// useEffect(() => {
	// 	startSlider();
	// 	slideRef.current.addEventListener('animationend', removeAnimation);
	// 	slideRef.current.addEventListener('mouseenter', pauseSlider);
	// 	slideRef.current.addEventListener('mouseleave', startSlider);

	// 	return () => {
	// 		clearInterval(slideInterval);
	// 	};
	// }, []);

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	return (
		<div className='w-full m-auto flex flex-col justify-center items-center'>
			<div
				ref={slideRef}
				className='w-full relative select-none flex justify-center items-center'
			>
				<img src={imgLinks[currentIndex]} alt='' className=' w-36 h-36' />

				<div className='absolute w-full top-1/2 transform -translate-y-1/2 flex justify-between items-center px-6 sm:px-10 xl:px-16'>
					<button onClick={handleOnPrevClick}>
						<ChevronLeftIcon className='block h-6 w-6' />
					</button>
					<button onClick={handleOnNextClick}>
						<ChevronRightIcon className='block h-6 w-6' />
					</button>
				</div>
			</div>
			<span className=' text-xs leading-none'>{LandsName[currentIndex]}</span>
			<div className='bg-black w-3/5 pt-[0.05rem] mt-4'></div>
		</div>
	);
};

export default CarousalTailwind;
