export const ImageBundleImport = (r) => {
	let images = {};
	r.keys().map((item, index) => {
		images[item.replace('./', '')] = r(item);
	});
	return images;
};

export const executeScroll = (myView) => myView.current.scrollIntoView();
