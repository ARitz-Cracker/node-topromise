// Created by Aritz Beobide-Cardinal 2017
exports.ToPromise = function(func, ...args){
	if (typeof func != "function"){
		throw new TypeError("Argument #1 is not a function")
	}
	return new Promise((resolve, reject) => {
		args.push((err,data) => {
			if (err != null){
				reject(err);
			}else{
				resolve(data);
			}
		});
		func(...args);
	});
}

exports.ToPromiseArray = function(func, ...args){
	if (typeof func != "function"){
		throw new TypeError("Argument #1 is not a function")
	}
	return new Promise((resolve, reject) => {
		args.push(() => {
			let err = arguments[0];
			if (err != null){
				reject(err);
			}else{
				resolve(Array.prototype.slice.call(arguments,1));
			}
		});
		func(...args);
	});
}

