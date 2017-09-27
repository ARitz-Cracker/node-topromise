// Created by Aritz Beobide-Cardinal 2017
exports.ToPromise = function(func, ...args){
	let thisArg;
	if (typeof func != "function"){
		thisArg = func;
		func = args.shift();
		if (typeof func != "function"){
			throw new TypeError("Arguments #1 and 2 are not functions");
		}
	}
	return new Promise((resolve, reject) => {
		args.push((err,data) => {
			if (err != null){
				reject(err);
			}else{
				resolve(data);
			}
		});
		if (thisArg){
			func.call(thisArg, ...args);
		}else{
			func(...args);
		}
	});
}

exports.ToPromiseArray = function(func, ...args){
	let thisArg;
	if (typeof func != "function"){
		thisArg = func;
		func = args.shift();
		if (typeof func != "function"){
			throw new TypeError("Arguments #1 and 2 are not functions");
		}
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
		if (thisArg){
			func.call(thisArg, ...args);
		}else{
			func(...args);
		}
	});
}

