const request = require("request-promise-native");

const fetchMyIP = () => {
	return request("https://api.ipify.org?format=json");
};

const fetchCoordsById = () => {
	return request(
		`https://api.freegeoip.app/json?apikey=26a690c0-2644-11ec-b0e8-178dab230187`
	);
};

const fetchISSFlyOverTimes = (body) => {
	const { latitude, longitude } = JSON.parse(body);
	return request(
		`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`
	);
};

const nextISSTimesForMyLocation = () => {
	return fetchMyIP()
		.then(fetchCoordsById)
		.then(fetchISSFlyOverTimes)
		.then((data) => {
			const { response } = JSON.parse(data);
			return response;
		});
};

module.exports = { nextISSTimesForMyLocation };
