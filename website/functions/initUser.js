import { CONSTANTS, PushAPI } from "@pushprotocol/restapi";

export const initUser = async (signer) => {
	console.log("HELLO FROM HERE");
	console.log("signer", signer);  
	const user = await PushAPI.initialize(signer, {
		env: CONSTANTS.ENV.STAGING,
	});
	console.log(user);
	// const response = await user.info();
	// console.log("initUser() ", response);
	return user;
};