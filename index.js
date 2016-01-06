'use strict';

class MapCache2 {
	get size() {
		return this._map.size;
	}
	
	constructor(defaultTTL) {
		this._map = new Map();
		this.defaultTTL = this.checkTTL(defaultTTL) || 1000;
	}

	get(key, ttl) {
		ttl = this.checkTTL(ttl);
		let value = this._map.get(key);
		if (!value) {
			return undefined;
		}
		ttl = (ttl || value[2] || this.defaultTTL);
		if (Date.now()-value[1] > ttl) {
			return undefined;
		}
		return value[0];
	}

	set(key, value, ttl) {
		this._map.set(key, [value, Date.now(), this.checkTTL(ttl) || undefined]);
		return this;
	}
	
	clean() {
		let map=this._map,now = Date.now(), def = this.defaultTTL, ttl;
		for (let kv of map) {
			if (now - kv[1][1] > (kv[1][2] || def)) {
				map.delete(kv[0]);
			}
		}
	}
	
	clear() {
		this._map.clear();
		return this;
	}
	
	checkTTL(ttl) {
		if (!ttl) {
			return 0;
		} else if (typeof ttl !== 'number') {
			throw new TypeError('ttl must be a number')
		} else {
			return ttl;
		}
	}
}
module.exports = MapCache2;
