"use client";
import useEthersSigner from "@/hooks/useEthersSigner";
import { useAccount } from "wagmi";
// import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { setUser } from "@/redux/slice/pushSlice";
import { initUser } from "@/functions/initUser";
import "./styles.css";
import { useListState } from "@mantine/hooks";
import Link from "next/link";
const fetchChats = async (user) => {
	const chats = await user.chat.list("CHATS");
	console.log("Chats", chats);
	return chats;
};

const profileInfo = async (user) => {
	const response = await user.profile.info();
	console.log("profile", response);
	return response;
};

const fetchChatHistory = async (chatId, user) => {
	const history = await user.chat.history(chatId);
	console.log("History", history);
	return history;
};

const sendMessage = async (chatId, content, user) => {
	console.log("Sending text");
	const txt = await user.chat.send(chatId, {
		type: "Text",
		content: content,
	});
	console.log("Sent message:", txt);
	return txt;
};

const joinGroup = async (user, chatId) => {
	const joinGroup = await user.chat.group.join(chatId);
	return joinGroup;
};

const ChatList = () => {
	const account = useAccount();
	// const dispatch = useDispatch();

	const [chat, setChat] = useState(null);
	const [user, setUser] = useState();
	const [chatList, setChatList] = useState();

	const signer = useEthersSigner({ chainId: account.chainId });

	useEffect(() => {
		let isMounted = true;

		const fetchData = async () => {
			try {
				if (!signer || !account) return;

				if (!user) {
					const newUser = await initUser(signer);
					if (newUser && !newUser.readMode) {
						// dispatch(setUser(newUser));
						setUser(newUser);
					}
				}

				// if (!chat) {
				// 	const groupInfo = await user.chat.group.info(chatId);
				// 	if (isMounted) {
				// 		setChat(groupInfo);
				// 	}

				// const fetchChatList = async () => {
				// 	try {
				// 		// const chatHistory = await fetchChatHistory(chatId, user);
				// 		// setHistory(chatHistory);
				// 		const chats = await user.chat.list("CHATS");
				//         console.log(chats)
				// 		setChatList(chats)
				// 	} catch (error) {
				// 		console.error("Error fetching chat history:", error);
				// 	}
				// };

				// fetchChatList();
				// 	}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();

		return () => {
			isMounted = false;
		};
	}, [account, signer, user, chat]);

	const handleFetchChats = async () => {
		if (!user) return;

		const res = await fetchChats(user);
		setChatList(res);
	};

	return (
		<div className="border border-white border-l-4">
			{/* {chat && <ChatHeader chat={chat} />} */}
			<div className="">
				<button className="btn btn-info m-2" onClick={handleFetchChats}>
					Your Chats
				</button>
			</div>
			<div className="p-4">
				{chatList &&
					chatList.map((chat) => (
						<Link href={`/communication/${chat.chatId}`}>
							<div key={chat.id} className="border bg-blue-100 p-2 mb-2">
								<h3 className="text-lg font-semibold">
									Group name : {chat.groupInformation.groupName}
								</h3>
								<p className="text-gray-600">
									Description : {chat.groupInformation.groupDescription}
								</p>
							</div>
						</Link>
					))}
			</div>
		</div>
	);
};

const ChatHeader = ({ chat }) => {
	return (
		<div className="bg-blue-200 p-4 flex justify-between items-center shadow-xl border-blue-500">
			<div className="text-black text-lg font-semibold">{chat.groupName}</div>
		</div>
	);
};

export default ChatList;
