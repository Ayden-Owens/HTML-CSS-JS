const url = 'https://random-words5.p.rapidapi.com/getRandom';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8127521cb0mshef4bd42d22b6863p1fcb9cjsn5be91bb67c7a',
		'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
