const request = require("request");

const fetchMyIP = (callback) => {
	request("https://api.ipify.org?format=json", (err, response, body) => {
		if (err) return callback(err, null);

		if (response.statusCode !== 200) {
			callback(
				Error(`Status Code ${response.statusCode} when fetching IP: ${body}`),
				null
			);
		}
		const ip = JSON.parse(body).ip;

		callback(null, ip);
	});
};

const fetchCoordsById = (callback) => {
	request(
		`https://api.freegeoip.app/json?apikey=26a690c0-2644-11ec-b0e8-178dab230187`,
		(err, response, body) => {
			if (err) {
				callback(err, null);
				return;
			}
			if (response.statusCode !== 200) {
				const msg = `Status Code ${response.statusCode} when looking up geolocation for IP: ${body}`;
				callback(Error(msg), null);
				return;
			}
			const { latitude, longitude } = JSON.parse(body);
			callback(null, { latitude, longitude });
		}
	);
};

const fetchISSFlyOverTimes = (coords, callback) => {
	request(
		`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`,
		(error, response, body) => {
			if (error) {
				callback(error, null);
			}
			if (response.statusCode !== 200) {
				const msg = `Status Code ${response.statusCode} when looking up ISS pass times ${body}`;
				callback(Error(msg), null);
				return;
			}
			const passes = JSON.parse(body).response;
			callback(null, passes);
		}
	);
};

const nextISSTimesForMyLocation = (callback) => {
	fetchMyIP((error, ip) => {
		if (error) {
			return callback(error, null);
		}
		fetchCoordsById((error, loc) => {
			if (error) {
				return callback(error, null);
			}
			fetchISSFlyOverTimes(loc, (error, passTimes) => {
				if (error) {
					return callback(error, null);
				}
				callback(null, passTimes);
			});
		});
	});
};

module.exports = {
	fetchMyIP,
	fetchCoordsById,
	fetchISSFlyOverTimes,
	nextISSTimesForMyLocation
};
