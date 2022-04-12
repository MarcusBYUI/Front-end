/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
	ExclamationIcon,
	InformationCircleIcon,
} from '@heroicons/react/outline';

const ModelView = ({ openIt, openModel }) => {
	const cancelButtonRef = useRef(null);

	return (
		<Transition.Root show={openIt} as={Fragment}>
			<Dialog
				as='div'
				className='fixed z-10 inset-0 overflow-y-auto'
				initialFocus={cancelButtonRef}
				onClose={openModel}
			>
				<div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className='hidden sm:inline-block sm:align-middle sm:h-screen'
						aria-hidden='true'
					>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
						enterTo='opacity-100 translate-y-0 sm:scale-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100 translate-y-0 sm:scale-100'
						leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
					>
						<div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full'>
							<div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
								<div className='sm:flex sm:items-start sm:flex-col sm:items-center'>
									<div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-[#fff4dd] sm:mx-0 sm:h-32 sm:w-32'>
										<InformationCircleIcon
											className='h-11/12 w-11/12 text-[#FEDB8C]'
											aria-hidden='true'
										/>
									</div>
									<div className='flex justify-center items-center flex-col mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
										<Dialog.Title
											as='h3'
											className='text-lg leading-6 font-medium text-gray-900'
										>
											This Game is under construction
										</Dialog.Title>
										<div className='mt-2'>
											<p className='text-sm text-gray-500 text-center'>
												But don't worry,we will keep you update about it and
												soon you will be able to play.Till then ou can read our
												PDF whitepaper to understand game features and
												scenarios.
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse sm:justify-center'>
								<button
									type='button'
									className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#fff4dd] text-base font-medium text-[#332c1c] hover:bg-[#FEDB8C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FEDB8C] sm:ml-3 sm:w-auto sm:text-sm'
									onClick={openModel}
								>
									Go Back
								</button>
								{/* <button
									type='button'
									className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
									onClick={openModel}
									ref={cancelButtonRef}
								>
									Cancel
								</button> */}
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
};
export default ModelView;
