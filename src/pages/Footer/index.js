import React from 'react';

const Footer = () => {
	return (
		<footer className='bg-[#a59191] text-gray-600'>
			<div className='container px-5 py-8 mx-auto flex justify-center items-center flex-row'>
				<a
					className='ml-3 text-[#FEDB8C]'
					href='https://twitter.com/brawloflegends?s=11'
				>
					<svg
						fill='currentColor'
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						className='w-6 h-6'
						viewBox='0 0 24 24'
					>
						<path d='M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z'></path>
					</svg>
				</a>
				<p className='text-base md:text-xl lg:text-xl text-white uppercase mx-4 px-8 border-gray-200'>
					Follow Us
				</p>
				<a
					className='mr-3 text-[#FEDB8C]'
					href='https://discord.gg/brawloflegends'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						aria-hidden='true'
						role='img'
						className='w-6 h-6'
						preserveAspectRatio='xMidYMid meet'
						viewBox='0 0 24 24'
					>
						<path
							d='M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z'
							fill='currentColor'
						/>
					</svg>
				</a>
			</div>
		</footer>
	);
};

export default Footer;
