import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// main
import Navbar from '../pages/Navbar';
import Footer from '../pages/Footer';

//landing page
import Features from '../pages/Landing-Page/Features/index';
import Home from '../pages/Landing-Page/Home/Home';
import Scenarios from '../pages/Landing-Page/Scenarios';
import Structures from '../pages/Landing-Page/Structures';
import Summary from '../pages/Landing-Page/Summery';
import TimeLine from '../pages/Landing-Page/Timeline';
import Token from '../pages/Landing-Page/Token';
import Whitepaper from '../pages/Landing-Page/Whitepaper';
// import pdfFile from '../Assets/Bol-Whitepaper.pdf';
import WhitepaperPdf from '../pages/Landing-Page/Whitepaper/PDFView';
import './App.css';
import Minting from '../pages/Game/minting/Minting';
import Kingdom from '../pages/Game/kingdom/Kingdom';
import Team from '../pages/Team/Team';

function App() {
	return (
		<Router>
			<div className='App test_word_here'>
				<Navbar />
				<Routes>
					<Route
						path='/'
						element={
							<>
								{' '}
								<Home />
								<Summary />
								<Token />
								<Features />
								<Scenarios />
								<Structures />
								<TimeLine />
								<Whitepaper />
								<Footer />
							</>
						}
					/>
					<Route path='/read-whitepaper' element={<WhitepaperPdf />} />
					<Route path='/minting' element={<Minting />} />
					<Route path='/my_kingdom' element={<Kingdom />} />
					<Route path='/team' element={<Team />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
