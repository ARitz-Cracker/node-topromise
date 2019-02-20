// Created by Aritz Beobide-Cardinal 2017
exports.ToPromise = function(func, ...args){
	let thisArg;
	try{
		if (typeof func != "function"){
			thisArg = func;
			func = args.shift();
			if (typeof func !== "function"){
				func = thisArg[func];
			}
			if (typeof func !== "function"){
				throw new TypeError("Arguments #1 and 2 are not functions");
			}
		}
	}catch(ex){
		return Promise.reject(ex);
	}
	return new Promise((resolve, reject) => {
		args.push((err, data) => {
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
	try{
		if (typeof func != "function"){
			thisArg = func;
			func = args.shift();
			if (typeof func !== "function"){
				func = thisArg[func];
			}
			if (typeof func !== "function"){
				throw new TypeError("Arguments #1 and 2 are not functions");
			}
		}
	}catch(ex){
		return Promise.reject(ex);
	}
	return new Promise((resolve, reject) => {
		args.push((err, ...data) => {
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

exports.toPromise = exports.ToPromise;
exports.toPromiseArray = exports.ToPromiseArray;