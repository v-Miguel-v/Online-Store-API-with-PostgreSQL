function logErrors(error, request, response, nextErrorHandler) {
	console.group("Log Errors:");
		console.error(error);
	console.groupEnd("Log Errors:");
	nextErrorHandler(error);
}

function boomErrorHandler(error, request, response, nextErrorHandler) {
	if (error.isBoom) {
		const { output } = error;
		console.log("Boom Error Handler");
		response.status(output.statusCode).json(output.payload);
	} else {
		nextErrorHandler(error);
	}
}

function sequelizeErrorHandler(error, request, response, nextErrorHandler) {
	if (error.name.includes("Sequelize")) {
		console.log("Sequelize Error Handler");
		response.status(404).json({
			status: 404,
			error: "Bad Request",
			message: `${error.errors[0].message}. ${error.parent.detail}`
		});
	} else {
		nextErrorHandler(error);
	}
}

function serverDefaultErrorHandler(error, request, response, nextErrorHandler) {
	console.log("Server Error Handler");
	response.status(error.statusCode || 500).json({
		status: error.statusCode || 500,
		error: error.type || "Internal Server Error",
		message: error.message
	});
}

module.exports = { logErrors, boomErrorHandler, sequelizeErrorHandler, serverDefaultErrorHandler };