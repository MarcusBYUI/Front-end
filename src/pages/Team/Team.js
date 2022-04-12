import React, { useState } from 'react';
import './style.css';

const Team = () => {
	const [teamList, setTeamList] = useState([
		{
			name: 'Diana Moon',
			imgLik: '',
			designation: 'Game Director',
			socialLink: [
				{
					socialIcon: (
						<svg
							fill='#fff'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							className='h-6 w-6'
							viewBox='0 0 24 24'
						>
							<path d='M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z'></path>
						</svg>
					),
					socialId: 'https://twitter.com/DianaM0on',
				},
				{
					socialIcon: (
						<svg
							fill='#fff'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 50 50'
							className='h-6 w-6'
						>
							{' '}
							<path d='M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z' />
						</svg>
					),
					socialId: 'https://www.linkedin.com/in/gabrielgomezpadin/',
				},
			],
		},
		{
			name: 'Project Ekko',
			imgLik: '',
			designation: 'Marketing Analyst',
			socialLink: [
				{
					socialIcon: (
						<svg
							fill='#fff'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							className='h-6 w-6'
							viewBox='0 0 24 24'
						>
							<path d='M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z'></path>
						</svg>
					),
					socialId: 'https://twitter.com/Projectekko_',
				},
				{
					socialIcon: (
						<svg
							fill='#fff'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 50 50'
							className='h-6 w-6'
						>
							{' '}
							<path d='M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z' />
						</svg>
					),
					socialId: 'https://www.linkedin.com/in/pekkomarketing/',
				},
			],
		},
	]);
	return (
		<div className='team flex min-h-[175vh] w-full flex-col items-center justify-start py-10 sm:min-h-screen md:min-h-screen lg:min-h-screen'>
			<h1 className='px-2 pt-32 text-3xl font-semibold text-[#FEDC8C] sm:text-4xl md:mx-20 md:pt-40 md:text-7xl lg:mx-[15rem] lg:pt-28'>
				Meet The Team
			</h1>
			<div className='mt-4 flex w-4/5 flex-col items-center justify-around text-[#FEDC8C] sm:mt-16 md:flex-row'>
				{teamList.map((item, index) => (
					<div
						key={index}
						className='flex w-11/12 flex-col items-center justify-center sm:w-2/4 md:w-10/12 lg:w-1/4'
					>
						<span className='my-4 text-3xl font-extrabold md:text-5xl'>
							{item.name}
						</span>
						<div className='relative flex min-h-[20rem] w-[16rem] items-center justify-center bg-[url("/src/Assets/Borders-lg.png")] bg-[length:100%_100%] sm:w-[17rem]'>
							{item.imgLik == '' ? (
								<div className='h-[17.5rem] w-[84%] bg-gray-400/70'></div>
							) : (
								<img src={item.imgLik} alt='' />
							)}
						</div>
						<span className='text-2xl font-bold text-white'>
							{item.designation}
						</span>
						{item.socialLink.map((item1, index1) => (
							<div
								key={index1}
								className='my-2 flex items-center justify-start md:ml-4 xl:self-start'
							>
								<span className='mr-2'>{item1.socialIcon}</span>
								<a
									href={item1.socialId}
									className='under break-all text-white underline underline-offset-4 sm:break-normal lg:ml-2'
								>
									{item1.socialId}
								</a>
							</div>
						))}
					</div>
				))}
			</div>
			<div className='my-16 h-[0.1rem] w-4/5 rounded-full bg-[#FEDC8C]'></div>
			<h1 className='text-2xl text-[#FEDC8C] sm:text-5xl'>
				Join Our Discord Community
			</h1>
			<div className='container mx-auto flex flex-col items-center justify-center px-5 py-2 sm:flex-row'>
				<a className='mr-3 text-white' href='https://discord.gg/brawloflegends'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						aria-hidden='true'
						role='img'
						className='h-10 w-10'
						preserveAspectRatio='xMidYMid meet'
						viewBox='0 0 24 24'
					>
						<path
							d='M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z'
							fill='currentColor'
						/>
					</svg>
				</a>
				<a
					href='https://discord.gg/brawloflegends'
					className='mx-4 my-4 break-all border-gray-200 text-base font-extrabold text-white sm:my-0 sm:break-normal md:text-xl lg:text-3xl'
				>
					https://discord.gg/brawloflegends
				</a>
				<a className='mr-3 text-white' href='https://discord.gg/brawloflegends'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						aria-hidden='true'
						role='img'
						className='h-10 w-10'
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
		</div>
	);
};

export default Team;
