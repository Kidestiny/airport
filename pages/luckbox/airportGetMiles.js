const CZFin = {};
const MUFin = {};
const MFFin = {};
const DLFin = {};

const CZ2CZ = `F!{"data":3,"num":3}@
		J!{"data":2.5,"num":2.5}@
		C!{"data":2,"num":2}@
		D!{"data":1.5,"num":2}@
		I!{"data":1.25,"num":2}@
		W,Y!{"data":1.25,"num":1.5}@
		S!{"data":0.75,"num":1}@
		W!{"data":1.25,"num":1.5}@
		P,B,M,H!{"data":1,"num":1}@
		K,U,A,L,Q!{"data":0.75,"num":0.75}@
		E,V,Z!{"data":0.25,"num":0.25}@
		T,N!{"data":0.25,"num":0}`;

const CZ2DL = `F,J,C,D,I,W,S!{"data":1,"num":0.2}@
		Y!{"data":1,"num":0.15}@
		P, B, M, H, K, U, A, L, Q!{"data":0.5,"num":0.1}@
		E!{"data":0.5,"num":0.05}@
		V, Z, T, N, R!{"data":0.25,"num":0.05}`;

const CZ2MF = `F!{"data":3,"num":1}@
		J!{"data":2,"num":1}@
		C,D!{"data":1.3,"num":1}@
		I!{"data":1,"num":1}@
		W!{"data":1.1,"num":0.5}@
		S!{"data":0.75,"num":0.5}@
		Y,P,B,M,H!{"data":1,"num":0.5}@
		K,U,A,L,Q!{"data":0.4,"num":0.5}@
		E,V,Z,T,N!{"data":0.1,"num":0.5}`;

const MF2MF = `F!{"data":3,"num":2}@
		A,J!{"data":2.5,"num":1.5}@
		C!{"data":2,"num":1.5}@
		D!{"data":1.5,"num":1.5}@
		I!{"data":1.3,"num":1}@
		O（国际）!{"data":0.5,"num":1}@
		Y,H(地区、国内)!{"data":2,"num":1}@
		H,B(国际),M,L!{"data":1,"num":1}@
		B(地区、国内)!{"data":1.25,"num":1}@
		K,N,Q,V,P(地区、国际）!{"data":0.5,"num":1}@
		T(国内)!{"data":0.25,"num":0}@
		R(国内)!{"data":0.1,"num":0}`;

const MF2CZ = `F!{"data":3,"num":2}@
		A!{"data":1.5,"num":2}@
		J!{"data":2,"num":1}@
		C,D!{"data":1.3,"num":1}@
		I!{"data":1,"num":1}@
		Y,H,B,M,L!{"data":1,"num":1}@
		K,N,Q,V!{"data":0.4,"num":0}@
		T,R!{"data":0.1,"num":0}`;

const MF2DL = `F,A,J,C,D,I!{"data":1,"num":0.2}@
		Y,H,B!{"data":1,"num":0.15}@
		M!{"data":1,"num":0.1}@
		L,K!{"data":0.5,"num":0.1}@
		N,Q,R!{"data":0.25,"num":0.05}`;

const MU2DL = `U,F,P(International)!{"data":3,"num":0.6}@
		P(China Domestic),C,D,Q,I!{"data":2,"num":0.3}@
		J!{"data":2,"num":0.4}@
		C,D,Q,I!{"data":2,"num":0.3}@
		W!{"data":1.5,"num":0.25}@
		Y!{"data":1.25,"num":0.2}@
		B!{"data":1,"num":0.2}@
		M,E,H!{"data":1,"num":0.15}@
		K,L!{"data":0.5,"num":0.15}@
		N,R,S,V!{"data":0.5,"num":0.1}@
		T,G,Z!{"data":0.25,"num":0.05}`;

const MU2MF = `F,U!{"data":1.5,"num":1}@
		J,C,D,I,Q!{"data":1.3,"num":1}@
		W!{"data":1.1,"num":1}@
		P!{"data":1,"num":1}@
		Y,B,M,E,H(国际、地区)!{"data":1,"num":0.5}@
		K,L,N,R!{"data":0.5,"num":0.5}`;

const trans = (str) => {
	let arr = str.split('@');
	let allLocation = {};
	arr.forEach((element) => {
		element = element.replace(/ |\n|\t/g, '');
		if (element.length < 13) return;
		let ele = element.split('!');
		let arrTemp = ele[0].split(',');
		let value = JSON.parse(ele[1]);
		arrTemp.forEach((a) => {
			allLocation[a] = value;
		});
	});
	return allLocation;
};


const trans1 = (str) => {
	let arr = str.split('@');
	let allLocation = {};
	arr.forEach((element) => {
		element = element.replace(/ |\n|\t/g, '');
		if (element.length < 13) return;
		let ele = element.split('!');
		let arrTemp = ele[0].split(',');
		let value = JSON.parse(ele[1]);
		arrTemp.forEach((a) => {
			allLocation[a] = value;
		});
	});
	return allLocation;
};



CZFin.CZ = trans(CZ2CZ);
CZFin.MF = trans(CZ2MF);
CZFin.DL = trans(CZ2DL);
MFFin.CZ = trans(MF2CZ);
MFFin.MF = trans(MF2MF);
MFFin.DL = trans(MF2DL);
MUFin.MF = trans(MU2MF);
MUFin.DL = trans(MU2DL);

export default { CZFin, MFFin, MUFin };