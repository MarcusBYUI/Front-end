import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';

const WhitepaperPdf = (props) => {
	const [numPages, setNumPages] = useState(null);
	const [errMessage, setErrMessage] = useState(null);
	const navigate = useNavigate();

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}
	const onErrorLoad = (err) => {
		setErrMessage(err.message);
	};

	const { pdf } = props;
	useEffect(() => {
		pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
		if (errMessage !== null) {
			navigate('/');
		}
	}, [errMessage]);

	return (
		<Document
			file={pdf}
			options={{ workerSrc: 'pdf.worker.js' }}
			onLoadSuccess={onDocumentLoadSuccess}
			onLoadError={(err) => onErrorLoad(err)}
		>
			{Array.from(new Array(numPages), (el, index) => (
				<Page key={`page_${index + 1}`} pageNumber={index + 1} />
			))}
		</Document>
	);
};

export default WhitepaperPdf;
